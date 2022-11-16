import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const ServicesTabsApi = createApi({
  reducerPath: 'ServicesTabs Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/service/tabs` }),
  endpoints: (builder) => ({
    getAllServicesTabs: builder.query({
      query: () => '/',
    }),
    getServiceTabById: builder.query({
      query: (tab_id) => `/${tab_id}`,
    }),
    updateServiceTab: builder.mutation({
      query: ({ tab_id, ...data }) => ({
        url: `/${tab_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createServiceTab: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    deleteServiceTab: builder.mutation({
      query: ({ card_id, tab_id }) => ({
        url: `/${card_id}/${tab_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllServicesTabsQuery,
  useGetServiceTabByIdQuery,
  useUpdateServiceTabMutation,
  useCreateServiceTabMutation,
  useDeleteServiceTabMutation,
} = ServicesTabsApi;

export default ServicesTabsApi;
