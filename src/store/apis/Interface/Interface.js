import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const InterfaceApi = createApi({
  reducerPath: 'Interface Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}` }),
  endpoints: (builder) => ({
    getAllInterfaces: builder.query({
      query: () => '',
    }),
    getInterfaceById: builder.query({
      query: (interface_id) => `/${interface_id}`,
    }),
    createInterface: builder.mutation({
      query: ({ ...data }) => ({
        url: '/fgf',
        method: 'POST',
        body: data,
      }),
    }),
    updateInterface: builder.mutation({
      query: ({ interface_id, ...data }) => ({
        url: `/${interface_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    createDevelopment: builder.mutation({
      query: ({ interface_id, ...data }) => ({
        url: `/${interface_id}/development`,
        method: 'POST',
        body: data,
      }),
    }),
    updateDevelopment: builder.mutation({
      query: ({ interface_id, development_id, ...data }) => ({
        url: `/${interface_id}/development/${development_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteDevelopment: builder.mutation({
      query: ({ interface_id, development_id }) => ({
        url: `/${interface_id}/development/${development_id}`,
        method: 'DELETE',
      }),
    }),
    createProof: builder.mutation({
      query: ({ interface_id, ...data }) => ({
        url: `/${interface_id}/proof`,
        method: 'POST',
        body: data,
      }),
    }),
    updateProof: builder.mutation({
      query: ({ interface_id, proof_id, ...data }) => ({
        url: `/${interface_id}/proof/${proof_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProof: builder.mutation({
      query: ({ interface_id, proof_id }) => ({
        url: `/${interface_id}/proof/${proof_id}`,
        method: 'DELETE',
      }),
    }),
    createLink: builder.mutation({
      query: ({ interface_id, ...data }) => ({
        url: `/${interface_id}/link`,
        method: 'POST',
        body: data,
      }),
    }),
    updateLink: builder.mutation({
      query: ({ interface_id, link_id, ...data }) => ({
        url: `/${interface_id}/link/${link_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteLink: builder.mutation({
      query: ({ interface_id, link_id }) => ({
        url: `/${interface_id}/link/${link_id}`,
        method: 'DELETE',
      }),
    }),
    createSolution: builder.mutation({
      query: ({ interface_id, ...data }) => ({
        url: `/${interface_id}/Solution`,
        method: 'POST',
        body: data,
      }),
    }),
    updateSolution: builder.mutation({
      query: ({ interface_id, solution_id, ...data }) => ({
        url: `/${interface_id}/solution/${solution_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteSolution: builder.mutation({
      query: ({ interface_id, solution_id }) => ({
        url: `/${interface_id}/solution/${solution_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllInterfacesQuery,
  useGetInterfaceByIdQuery,
  useCreateInterfaceMutation,
  useUpdateInterfaceMutation,
  useCreateDevelopmentMutation,
  useUpdateDevelopmentMutation,
  useDeleteDevelopmentMutation,
  useCreateProofMutation,
  useUpdateProofMutation,
  useDeleteProofMutation,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
  useCreateSolutionMutation,
  useUpdateSolutionMutation,
  useDeleteSolutionMutation,
} = InterfaceApi;

export default InterfaceApi;
