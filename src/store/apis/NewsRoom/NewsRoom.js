import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const NewsRoomApi = createApi({
  reducerPath: 'NewsRoom Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/news_room` }),
  endpoints: (builder) => ({
    getAllNewsRooms: builder.query({
      query: () => '/',
    }),
    getNewsRoomById: builder.query({
      query: (news_room_id) => `/${news_room_id}`,
    }),
    createNewsRoom: builder.mutation({
      query: ({ news_room_id, ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateNewsRoom: builder.mutation({
      query: ({ news_room_id, ...data }) => ({
        url: `/${news_room_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteNewsRoom: builder.mutation({
      query: (news_room_id) => ({
        url: `/${news_room_id}`,
        method: 'DELETE',
        body: news_room_id,
      }),
    }),
  }),
});

export const {
  useGetAllNewsRoomsQuery,
  useGetNewsRoomByIdQuery,
  useCreateNewsRoomMutation,
  useUpdateNewsRoomMutation,
  useDeleteNewsRoomMutation,
} = NewsRoomApi;

export default NewsRoomApi;
