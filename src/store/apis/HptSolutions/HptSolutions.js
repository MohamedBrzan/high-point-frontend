import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const HptSolutionsApi = createApi({
  reducerPath: 'HptSolutions Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/solutions` }),

  endpoints: (builder) => ({
    getAllSolutions: builder.query({
      query: () => '/',
    }),

    getSolutionById: builder.query({
      query: (solution_schema_id) => `/${solution_schema_id}`,
    }),

    createSolutionSchema: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),

    updateSolution: builder.mutation({
      query: ({ solution_schema_id, ...data }) => ({
        url: `/${solution_schema_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllSolutionsQuery,
  useCreateSolutionSchemaMutation,
  useGetSolutionByIdQuery,
  useUpdateSolutionMutation,
} = HptSolutionsApi;

export default HptSolutionsApi;
