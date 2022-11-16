import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const ContactUsApi = createApi({
  reducerPath: 'ContactUs Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/contact_us` }),
  endpoints: (builder) => ({
    getAllContactUs: builder.query({
      query: () => '/',
    }),
    getContactUsById: builder.query({
      query: (contact_us_id) => `/${contact_us_id}`,
    }),
    createContactUs: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateContactUs: builder.mutation({
      query: ({ contact_us_id, ...data }) => ({
        url: `/${contact_us_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteContactUs: builder.mutation({
      query: (contact_us_id) => ({
        url: `/${contact_us_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllContactUsQuery,
  useGetContactUsByIdQuery,
  useCreateContactUsMutation,
  useUpdateContactUsMutation,
  useDeleteContactUsMutation,
} = ContactUsApi;

export default ContactUsApi;
