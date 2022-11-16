import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const SolutionsTabsApi = createApi({
  reducerPath: 'SolutionsTabs Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/solution/tabs` }),
  endpoints: (builder) => ({
    getAllSolutionsTabs: builder.query({
      query: () => '/',
    }),
    updateSolutionTab: builder.mutation({
      query: ({ tab_id, ...data }) => ({
        url: `/${tab_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createSolutionTab: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    deleteSolutionTab: builder.mutation({
      query: ({ card_id, tab_id }) => ({
        url: `/${card_id}/${tab_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllSolutionsTabsQuery,
  useUpdateSolutionTabMutation,
  useCreateSolutionTabMutation,
  useDeleteSolutionTabMutation,
} = SolutionsTabsApi;

export default SolutionsTabsApi;
