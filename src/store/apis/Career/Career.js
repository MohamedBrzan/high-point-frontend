import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const CareerApi = createApi({
  reducerPath: 'Career Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/career` }),
  endpoints: (builder) => ({
    getAllCareers: builder.query({
      query: () => '/',
    }),
    getCareerById: builder.query({
      query: (career_id) => `/${career_id}`,
    }),
    createCareer: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateCareer: builder.mutation({
      query: ({ career_id, ...data }) => ({
        url: `/${career_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCareer: builder.mutation({
      query: (career_id) => ({
        url: `/${career_id}`,
        method: 'DELETE',
        body: career_id,
      }),
    }),
    createBrief: builder.mutation({
      query: ({ career_id, ...data }) => ({
        url: `/${career_id}/brief`,
        method: 'POST',
        body: data,
      }),
    }),
    updateBrief: builder.mutation({
      query: ({ career_id, brief_id, ...data }) => ({
        url: `/${career_id}/brief/${brief_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBrief: builder.mutation({
      query: ({ career_id, brief_id }) => ({
        url: `/${career_id}/brief/${brief_id}`,
        method: 'DELETE',
      }),
    }),
    createPosition: builder.mutation({
      query: ({ career_id, ...data }) => ({
        url: `/${career_id}/position`,
        method: 'POST',
        body: data,
      }),
    }),
    updatePosition: builder.mutation({
      query: ({ career_id, position_id, ...data }) => ({
        url: `/${career_id}/position/${position_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePosition: builder.mutation({
      query: ({ career_id, position_id }) => ({
        url: `/${career_id}/position/${position_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllCareersQuery,
  useGetCareerByIdQuery,
  useCreateCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useCreateBriefMutation,
  useUpdateBriefMutation,
  useDeleteBriefMutation,
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = CareerApi;

export default CareerApi;
