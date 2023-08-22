/* eslint-disable @typescript-eslint/no-unused-vars */
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

// const key = process.env.BASE_KEY

const baseUrl = process.env.BASE_URL;

export const mutationApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token =
        (getState() as RootState)?.auth?.token ||
        (getState() as RootState)?.profile?.token;
      // headers.set('x-api-key', `${process.env.BASE_KEY}`);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: builder => ({
    emailSignup: builder.mutation({
      query: (body: any) => {
        return {
          url: 'authentication/user/signup/email',
          method: 'POST',
          body,
        };
      },
    }),

    phoneSignup: builder.mutation({
      query: (body: any) => {
        return {
          url: 'authentication/user/signup/phone-number',
          method: 'POST',
          body,
        };
      },
    }),

    oauth: builder.mutation({
      query: (body: any) => {
        return {
          url: 'authentication/user/google/oauth',
          method: 'POST',
          body,
        };
      },
    }),

    login: builder.mutation({
      query: body => {
        return {
          url: '/authentication/user/login',
          method: 'POST',
          body,
        };
      },
    }),

    logout: builder.mutation<any, void>({
      query: (id: any) => {
        return {
          url: '/authentication/logout',
          method: 'POST',
        };
      },
    }),

    singleUpload: builder.mutation({
      query: body => {
        return {
          url: '/file-upload/upload/single',
          method: 'POST',
          body,
        };
      },
    }),

    photoUpload: builder.mutation({
      query: body => {
        return {
          url: '/user/upload-photo',
          method: 'POST',
          body,
        };
      },
    }),

    setPersonalPin: builder.mutation({
      query: (body: any) => {
        return {
          url: '/authentication/set-personal-pin',
          method: 'POST',
          body,
        };
      },
    }),

    bio: builder.mutation({
      query: (body: any) => {
        return {
          url: '/authentication/user/signup/setup-profile',
          method: 'POST',
          body,
        };
      },
    }),

    resendOtpEmail: builder.mutation({
      query: (body: any) => {
        return {
          url: '/authentication/user/signup/verify-email/resend-otp',
          method: 'POST',
          body,
        };
      },
    }),

    resendOtpPhone: builder.mutation({
      query: (body: any) => {
        return {
          url: '/authentication/user/signup/verify-phone-number/resend-otp',
          method: 'POST',
          body,
        };
      },
    }),

    verifyOtpEmail: builder.mutation({
      query: (body: any) => {
        return {
          url: '/authentication/user/signup/verify-email',
          method: 'POST',
          body,
        };
      },
    }),

    verifyOtpPhone: builder.mutation({
      query: (body: any) => ({
        url: '/authentication/user/signup/verify-phone-number',
        method: 'POST',
        body,
      }),
    }),

    virtualCardReq: builder.mutation({
      query: (body: any) => ({
        url: '/card/request/virtual-card',
        method: 'POST',
        body,
      }),
    }),

    physicalCardReq: builder.mutation({
      query: (body: any) => ({
        url: '/card/request/physical-card',
        method: 'POST',
        body,
      }),
    }),

    verifyId: builder.mutation({
      query: (body: any) => ({
        url: '/kyc/verify-id',
        method: 'POST',
        body,
      }),
    }),

    verifyAddy: builder.mutation({
      query: (body: any) => ({
        url: '/kyc/verify-address',
        method: 'POST',
        body,
      }),
    }),

    verifyBvn: builder.mutation({
      query: (body: any) => ({
        url: '/kyc/verify-bvn',
        method: 'POST',
        body,
      }),
    }),

    bvnAuth: builder.mutation({
      query: (body: any) => ({
        url: '/authentication/register/bvn',
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body: any) => ({
        url: '/authentication/forget-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body: any) => ({
        url: '/users/update-password',
        method: 'POST',
        body,
      }),
    }),

    getAccountName: builder.mutation({
      query: (body: any) => ({
        url: '/thebank/name-enquiry',
        method: 'POST',
        body,
      }),
    }),

    transferOut: builder.mutation({
      query: (body: any) => ({
        url: '/transfer/interbank',
        method: 'POST',
        body,
      }),
    }),

    transferIn: builder.mutation({
      query: (body: any) => ({
        url: '/transfer/intrabank',
        method: 'POST',
        body,
      }),
    }),
    getStatement: builder.mutation({
      query: (body: any) => ({
        url: '/thebank/export-transactions',
        method: 'POST',
        body,
      }),
    }),

    changePassword: builder.mutation({
      query: (body: any) => ({
        url: '/user/change-password',
        method: 'POST',
        body,
      }),
    }),

    changePin: builder.mutation({
      query: (body: any) => ({
        url: '/authentication/change-personal-pin',
        method: 'PUT',
        body,
      }),
    }),

    updateProfile: builder.mutation({
      query: (body: any) => ({
        url: '/user/profile',
        method: 'PUT',
        body,
      }),
    }),

    // ***************************//

    addAddress: builder.mutation({
      query: (body: any) => ({
        url: '/delivery-addresses',
        method: 'POST',
        body,
      }),
    }),
    addFav: builder.mutation({
      query: (body: any) => ({
        url: '/favourites/add-kitchen',
        method: 'POST',
        body,
      }),
    }),
    delFav: builder.mutation({
      query: (body: any) => ({
        url: '/favourites/remove-kitchen',
        method: 'DELETE',
        body,
      }),
    }),
    validateOrder: builder.mutation({
      query: (body: any) => ({
        url: '/orders/validate-order',
        method: 'POST',
        body,
      }),
    }),
    createOrder: builder.mutation({
      query: (body: any) => ({
        url: '/orders/create-order',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useEmailSignupMutation,
  usePhoneSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useResendOtpEmailMutation,
  useSetPersonalPinMutation,
  useVerifyOtpEmailMutation,
  useVerifyOtpPhoneMutation,
  useResendOtpPhoneMutation,
  useBioMutation,
  useSingleUploadMutation,
  usePhotoUploadMutation,
  useVirtualCardReqMutation,
  usePhysicalCardReqMutation,
  useVerifyIdMutation,
  useVerifyAddyMutation,
  useVerifyBvnMutation,
  useGetAccountNameMutation,
  useTransferOutMutation,
  useTransferInMutation,
  useBvnAuthMutation,
  useChangePasswordMutation,
  useChangePinMutation,
  useUpdateProfileMutation,
  useForgotPasswordMutation,
  useOauthMutation,
  // ***************************//

  useAddAddressMutation,
  useAddFavMutation,
  useDelFavMutation,
  useValidateOrderMutation,
  useCreateOrderMutation,
  useResetPasswordMutation,
} = mutationApi;
