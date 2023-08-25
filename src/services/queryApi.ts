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

export const queryApi = createApi({
  reducerPath: 'queryApi',
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
    getUser: builder.query({
      query: () => ({
        url: 'sessions',
      }),
    }),
    getPlans: builder.query({
      query: () => ({
        url: 'plans',
      }),
    }),
    getQuote: builder.query({
      query: () => ({
        url: 'quotes',
      }),
    }),
    getProjection: builder.query({
      query: ({pay, target, date}) => ({
        url: `plans/projection?monthly_investment=${pay}&target_amount=${target}&maturity_date=${date}`,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetPlansQuery,
  useGetQuoteQuery,
  useGetProjectionQuery,
} = queryApi;
