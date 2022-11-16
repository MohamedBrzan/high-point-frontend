import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const ServicesCardApi = createApi({
  reducerPath: 'ServicesCard Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/service/cards` }),
  endpoints: (builder) => ({
    getAllServicesCard: builder.query({
      query: (length) => (length ? `?${length}` : '/'),
    }),
    getServiceCardById: builder.query({
      query: (card_id) => `/${card_id}`,
    }),

    updateServiceCard: builder.mutation({
      query: ({ card_id, ...data }) => ({
        url: `/${card_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createServiceCard: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    deleteServiceCard: builder.mutation({
      query: (card_id) => ({
        url: `/${card_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllServicesCardQuery,
  useGetServiceCardByIdQuery,
  useUpdateServiceCardMutation,
  useCreateServiceCardMutation,
  useDeleteServiceCardMutation,
} = ServicesCardApi;

export default ServicesCardApi;
