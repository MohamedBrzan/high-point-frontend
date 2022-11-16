import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const PartnerApi = createApi({
  reducerPath: 'Partner Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/partner` }),
  endpoints: (builder) => ({
    getAllPartners: builder.query({
      query: (query) => `?${query}`,
    }),
    getPartnerById: builder.query({
      query: (partner_id) => `/${partner_id}`,
    }),
    createPartner: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updatePartner: builder.mutation({
      query: ({ partner_id, ...data }) => ({
        url: `/${partner_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePartner: builder.mutation({
      query: (partner_id) => ({
        url: `/${partner_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllPartnersQuery,
  useGetPartnerByIdQuery,
  useCreatePartnerMutation,
  useUpdatePartnerMutation,
  useDeletePartnerMutation,
} = PartnerApi;

export default PartnerApi;
