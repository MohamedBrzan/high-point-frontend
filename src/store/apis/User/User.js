import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const UserApi = createApi({
  reducerPath: 'User Api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${APPURL}/authentication`,
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ ...data }) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: ({ ...data }) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    googleLoginUser: builder.mutation({
      query: (email) => ({
        url: '/google/login',
        method: 'POST',
        body: email,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: '/forgot_password',
        method: 'POST',
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ ...data }) => ({
        url: '/reset_password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGoogleLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = UserApi;

export default UserApi;
