import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const ClientMessageApi = createApi({
  reducerPath: 'ClientMessage Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/client_message` }),
  endpoints: (builder) => ({
    getAllClientMessages: builder.query({
      query: () => '/',
    }),
    getClientMessageById: builder.query({
      query: (client_message_id) => `/${client_message_id}`,
    }),
    createClientMessage: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateClientMessage: builder.mutation({
      query: ({ client_message_id, ...data }) => ({
        url: `/${client_message_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteClientMessage: builder.mutation({
      query: (client_message_id) => ({
        url: `/${client_message_id}`,
        method: 'DELETE',
        body: client_message_id,
      }),
    }),
  }),
});

export const {
  useGetAllClientMessagesQuery,
  useGetClientMessageByIdQuery,
  useCreateClientMessageMutation,
  useUpdateClientMessageMutation,
  useDeleteClientMessageMutation,
} = ClientMessageApi;

export default ClientMessageApi;
