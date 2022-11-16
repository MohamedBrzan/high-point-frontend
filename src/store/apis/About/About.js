import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { APPURL } from '../../constants/constants';

const AboutApi = createApi({
  reducerPath: 'About Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/about` }),
  endpoints: (builder) => ({
    getAllAbout: builder.query({
      query: () => '/',
    }),
    getAboutById: builder.query({
      query: (about_id) => `/${about_id}`,
    }),
    createAbout: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateAbout: builder.mutation({
      query: ({ about_id, ...data }) => ({
        url: `/${about_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteAbout: builder.mutation({
      query: (about_id) => ({
        url: `/${about_id}`,
        method: 'DELETE',
        body: about_id,
      }),
    }),
    createMission: builder.mutation({
      query: ({ about_id, ...data }) => ({
        url: `/${about_id}/mission`,
        method: 'POST',
        body: data,
      }),
    }),
    updateMission: builder.mutation({
      query: ({ about_id, mission_id, ...data }) => ({
        url: `/${about_id}/mission/${mission_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteMission: builder.mutation({
      query: ({ about_id, mission_id }) => ({
        url: `/${about_id}/mission/${mission_id}`,
        method: 'DELETE',
      }),
    }),
    createAnswer: builder.mutation({
      query: ({ about_id, ...data }) => ({
        url: `/${about_id}/answer`,
        method: 'POST',
        body: data,
      }),
    }),
    updateAnswer: builder.mutation({
      query: ({ about_id, answer_id, ...data }) => ({
        url: `/${about_id}/answer/${answer_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteAnswer: builder.mutation({
      query: ({ about_id, answer_id }) => ({
        url: `/${about_id}/answer/${answer_id}`,
        method: 'DELETE',
      }),
    }),
    createCrew: builder.mutation({
      query: ({ about_id, ...data }) => ({
        url: `/${about_id}/crew`,
        method: 'POST',
        body: data,
      }),
    }),
    updateCrew: builder.mutation({
      query: ({ about_id, crew_id, ...data }) => ({
        url: `/${about_id}/crew/${crew_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCrew: builder.mutation({
      query: ({ about_id, crew_id }) => ({
        url: `/${about_id}/crew/${crew_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllAboutQuery,
  useGetAboutByIdQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
  useCreateMissionMutation,
  useUpdateMissionMutation,
  useDeleteMissionMutation,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useDeleteAnswerMutation,
  useCreateCrewMutation,
  useUpdateCrewMutation,
  useDeleteCrewMutation,
} = AboutApi;

export default AboutApi;
