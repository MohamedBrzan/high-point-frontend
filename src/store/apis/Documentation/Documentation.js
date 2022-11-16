import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const DocumentationApi = createApi({
  reducerPath: 'Documentation Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/documentation` }),
  endpoints: (builder) => ({
    getAllDocumentation: builder.query({
      query: () => '/',
    }),
    getDocumentationById: builder.query({
      query: (documentation_id) => `/${documentation_id}`,
    }),
    createDocumentation: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateDocumentation: builder.mutation({
      query: ({ documentation_id, ...data }) => ({
        url: `/${documentation_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteDocumentation: builder.mutation({
      query: (documentation_id) => ({
        url: `/${documentation_id}`,
        method: 'DELETE',
        body: documentation_id,
      }),
    }),
    createDocument: builder.mutation({
      query: ({ documentation_id, ...data }) => ({
        url: `/${documentation_id}/document`,
        method: 'POST',
        body: data,
      }),
    }),
    updateDocument: builder.mutation({
      query: ({ documentation_id, document_id, ...data }) => ({
        url: `/${documentation_id}/document/${document_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteDocument: builder.mutation({
      query: ({ documentation_id, document_id }) => ({
        url: `/${documentation_id}/document/${document_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllDocumentationQuery,
  useGetDocumentationByIdQuery,
  useCreateDocumentationMutation,
  useUpdateDocumentationMutation,
  useDeleteDocumentationMutation,
  useCreateDocumentMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
} = DocumentationApi;

export default DocumentationApi;
