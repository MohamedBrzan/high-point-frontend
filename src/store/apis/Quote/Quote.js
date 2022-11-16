import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const QuoteApi = createApi({
  reducerPath: 'Quote Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/quote` }),
  endpoints: (builder) => ({
    getAllQuotes: builder.query({
      query: () => '/',
    }),
    getQuoteById: builder.query({
      query: (quote_id) => `/${quote_id}`,
    }),
    createQuote: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateQuote: builder.mutation({
      query: ({ quote_id, ...data }) => ({
        url: `/${quote_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteQuote: builder.mutation({
      query: (quote_id) => ({
        url: `/${quote_id}`,
        method: 'DELETE',
      }),
    }),
    createDecision: builder.mutation({
      query: ({ quote_id, ...data }) => ({
        url: `/${quote_id}/decision`,
        method: 'POST',
        body: data,
      }),
    }),
    updateDecision: builder.mutation({
      query: ({ quote_id, decision_id, ...data }) => ({
        url: `/${quote_id}/decision/${decision_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteDecision: builder.mutation({
      query: ({ quote_id, decision_id }) => ({
        url: `/${quote_id}/decision/${decision_id}`,
        method: 'DELETE',
      }),
    }),
    createQA: builder.mutation({
      query: ({ quote_id, ...data }) => ({
        url: `/${quote_id}/q_a/`,
        method: 'POST',
        body: data,
      }),
    }),
    updateQA: builder.mutation({
      query: ({ quote_id, q_a_id, ...data }) => ({
        url: `/${quote_id}/q_a/${q_a_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteQA: builder.mutation({
      query: ({ quote_id, q_a_id, ...data }) => ({
        url: `/${quote_id}/q_a/${q_a_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllQuotesQuery,
  useGetQuoteByIdQuery,
  useCreateQuoteMutation,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
  useCreateDecisionMutation,
  useUpdateDecisionMutation,
  useDeleteDecisionMutation,
  useCreateQAMutation,
  useUpdateQAMutation,
  useDeleteQAMutation,
} = QuoteApi;

export default QuoteApi;
