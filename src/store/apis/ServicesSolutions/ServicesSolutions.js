import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const ServicesSolutionsApi = createApi({
  reducerPath: 'ServicesSolutions Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/service/solutions` }),
  endpoints: (builder) => ({
    getAllServicesSolutions: builder.query({
      query: () => '/',
    }),
    getServiceSolutionById: builder.query({
      query: (solution_id) => `/${solution_id}`,
    }),

    updateServiceSolution: builder.mutation({
      query: ({ solution_id, ...data }) => ({
        url: `/${solution_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createServiceSolution: builder.mutation({
      query: ({ tab_id, ...data }) => ({
        url: `/${tab_id}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteServiceSolution: builder.mutation({
      query: ({ tab_id, solution_id }) => ({
        url: `/${tab_id}/${solution_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllServicesSolutionsQuery,
  useGetServiceSolutionByIdQuery,
  useUpdateServiceSolutionMutation,
  useCreateServiceSolutionMutation,
  useDeleteServiceSolutionMutation,
} = ServicesSolutionsApi;

export default ServicesSolutionsApi;
