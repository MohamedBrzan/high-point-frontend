import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const RequestApi = createApi({
  reducerPath: 'Request Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/request` }),
  endpoints: (builder) => ({
    getAllRequests: builder.query({
      query: () => '/',
    }),
    getRequestById: builder.query({
      query: (request_id) => `/${request_id}`,
    }),
    createRequest: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateRequest: builder.mutation({
      query: ({ request_id, ...data }) => ({
        url: `/${request_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteRequest: builder.mutation({
      query: (request_id) => ({
        url: `/${request_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllRequestsQuery,
  useGetRequestByIdQuery,
  useCreateRequestMutation,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = RequestApi;

export default RequestApi;
