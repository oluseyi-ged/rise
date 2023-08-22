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

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, {getState}) => {
      const token =
        (getState() as RootState)?.auth?.token ||
        (getState() as RootState)?.profile?.token;
      headers.set('x-api-key', `${process.env.BASE_KEY}`);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomErr, {}>,
  endpoints: builder => ({
    physicalCardGet: builder.query({
      query: (body: any) => ({
        url: '/card/get/physical-card',
        body,
      }),
    }),
    virtualCardGet: builder.query({
      query: () => ({
        url: '/card/get/virtual-card',
      }),
    }),
    getBanks: builder.query({
      query: () => ({
        url: '/thebank/list-banks',
      }),
    }),
    getUserAcct: builder.query({
      query: () => ({
        url: '/thebank/bank-details',
      }),
    }),
    getUserBal: builder.query({
      query: () => ({
        url: '/thebank/balance',
      }),
    }),
    getUserByTag: builder.query({
      query: tag => ({
        url: `/thebank/user-by-tag/${tag}`,
      }),
    }),
    getUserByPhone: builder.query({
      query: phone => ({
        url: `/thebank/user-by-phone/${phone}`,
      }),
    }),
    getUserByAcct: builder.query({
      query: acct => ({
        url: `/thebank/user-by-account-no/${acct}`,
      }),
    }),
    getTransHistory: builder.query({
      query: () => ({
        url: '/thebank/get-transactions-history',
      }),
    }),
    getStatement: builder.query({
      query: data => ({
        url: `/thebank/export-transactions?startDate=${data.startDate}&endDate=${data.endDate}`,
      }),
    }),
    getStates: builder.query({
      query: () => ({
        url: '/kyc/get-states',
      }),
    }),
    getLga: builder.query({
      query: stateCode => ({
        url: `/kyc/get-lgas/${stateCode}`,
      }),
    }),
    initiateBvnAuth: builder.query<any, void>({
      query: () => ({
        url: '/auth/nibss-igree-idp',
      }),
    }),
    getLimits: builder.query<any, void>({
      query: () => ({
        url: '/user/limits',
      }),
    }),

    // **************************************************************** //

    getCuisines: builder.query({
      query: () => ({
        url: '/cuisines',
      }),
    }),
    getKitchenByCuisine: builder.query({
      query: id => ({
        url: `/kitchens/get-by-cuisine/${id}`,
      }),
    }),
    getNewKitchens: builder.query({
      query: () => ({
        url: '/kitchens/new-kitchens',
      }),
    }),
    getKitchenByID: builder.query({
      query: id => ({
        url: `/kitchens/details/${id}`,
      }),
    }),
    getKitchenMeals: builder.query({
      query: id => ({
        url: `/kitchens/meals/${id}`,
      }),
    }),
    getKitchenMeal: builder.query({
      query: id => ({
        url: `/kitchens/meals/single/${id}`,
      }),
    }),
    getTimeSlots: builder.query({
      query: () => ({
        url: '/timeslots',
      }),
    }),
    getAddresses: builder.query({
      query: () => ({
        url: '/delivery-addresses',
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: '/users',
      }),
    }),
    getFavs: builder.query({
      query: () => ({
        url: '/favourites',
      }),
    }),
  }),
});

export const {
  usePhysicalCardGetQuery,
  useVirtualCardGetQuery,
  useGetBanksQuery,
  useGetUserAcctQuery,
  useGetUserBalQuery,
  useLazyGetUserByAcctQuery,
  useLazyGetUserByPhoneQuery,
  useLazyGetUserByTagQuery,
  useGetTransHistoryQuery,
  useLazyInitiateBvnAuthQuery,
  useGetStatementQuery,
  useLazyGetStatementQuery,
  useGetStatesQuery,
  useLazyGetLgaQuery,
  useGetLimitsQuery,
  // **************************************************************** //
  useGetCuisinesQuery,
  useGetKitchenByCuisineQuery,
  useGetNewKitchensQuery,
  useGetKitchenByIDQuery,
  useGetKitchenMealQuery,
  useGetKitchenMealsQuery,
  useLazyGetKitchenByIDQuery,
  useGetTimeSlotsQuery,
  useGetProfileQuery,
  useGetAddressesQuery,
  useGetFavsQuery,
} = queryApi;
