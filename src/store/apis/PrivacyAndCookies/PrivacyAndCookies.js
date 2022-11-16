import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const PrivacyAndCookiesApi = createApi({
  reducerPath: 'PrivacyAndCookies Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/privacy_cookies` }),
  endpoints: (builder) => ({
    getAllPrivacyAndCookies: builder.query({
      query: () => '/',
    }),
    getPrivacyAndCookiesById: builder.query({
      query: (privacyAndCookies_id) => `/${privacyAndCookies_id}`,
    }),
    createPrivacyAndCookies: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updatePrivacyAndCookies: builder.mutation({
      query: ({ privacyAndCookies_id, ...data }) => ({
        url: `/${privacyAndCookies_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePrivacyAndCookies: builder.mutation({
      query: (privacyAndCookies_id) => ({
        url: `/${privacyAndCookies_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPrivacyAndCookiesQuery,
  useGetPrivacyAndCookiesByIdQuery,
  useCreatePrivacyAndCookiesMutation,
  useUpdatePrivacyAndCookiesMutation,
  useDeletePrivacyAndCookiesMutation,
} = PrivacyAndCookiesApi;

export default PrivacyAndCookiesApi;
