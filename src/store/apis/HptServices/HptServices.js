import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const HptServicesApi = createApi({
  reducerPath: 'HptServices Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/services` }),

  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: () => '/',
    }),

    getServiceById: builder.query({
      query: (service_schema_id) => `/${service_schema_id}`,
    }),

    createServiceSchema: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),

    updateService: builder.mutation({
      query: ({ service_schema_id, ...data }) => ({
        url: `/${service_schema_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceSchemaMutation,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} = HptServicesApi;

export default HptServicesApi;
