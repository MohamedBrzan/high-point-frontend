import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const SolutionsCardApi = createApi({
  reducerPath: 'SolutionsCard Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/solution/cards` }),
  endpoints: (builder) => ({
    getAllSolutionsCard: builder.query({
      query: () => '/',
    }),
    getSolutionById: builder.query({
      query: (card_id) => `/${card_id}`,
    }),
    updateSolutionCard: builder.mutation({
      query: ({ card_id, ...data }) => ({
        url: `/${card_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createSolutionCard: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    deleteSolutionCard: builder.mutation({
      query: (card_id) => ({
        url: `/${card_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllSolutionsCardQuery,
  useGetSolutionByIdQuery,
  useUpdateSolutionCardMutation,
  useCreateSolutionCardMutation,
  useDeleteSolutionCardMutation,
} = SolutionsCardApi;

export default SolutionsCardApi;
