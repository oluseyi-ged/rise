import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query/react';
import {RootState} from 'store';

interface CustomErr {
  data: {
    error: string;
    message: any;
    statusCode: number;
  };
  status: number;
}

const baseUrl = 'https://rise-rn-test-api-gb2v6.ondigitalocean.app/api/v1/';

export const mutationApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token =
        (getState() as RootState)?.auth?.token ||
        (getState() as RootState)?.profile?.token;
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (body: any) => {
        return {
          url: 'users',
          method: 'POST',
          body,
        };
      },
    }),

    login: builder.mutation({
      query: body => {
        return {
          url: 'sessions',
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {useSignUpMutation, useLoginMutation} = mutationApi;
