import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const SolutionsSolutionsApi = createApi({
  reducerPath: 'SolutionsSolutions Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/solution/solutions` }),
  endpoints: (builder) => ({
    getAllSolutionsSolutions: builder.query({
      query: () => '/',
    }),
    getSolutionsSolutionsById: builder.query({
      query: (solution_id) => `/${solution_id}`,
    }),
    updateSolutionSolution: builder.mutation({
      query: ({ solution_id, ...data }) => ({
        url: `/${solution_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createSolutionSolution: builder.mutation({
      query: ({ tab_id, ...data }) => ({
        url: `/${tab_id}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteSolutionSolution: builder.mutation({
      query: ({ tab_id, solution_id }) => ({
        url: `/${tab_id}/${solution_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllSolutionsSolutionsQuery,
  useGetSolutionsSolutionsByIdQuery,
  useUpdateSolutionSolutionMutation,
  useCreateSolutionSolutionMutation,
  useDeleteSolutionSolutionMutation,
} = SolutionsSolutionsApi;

export default SolutionsSolutionsApi;
