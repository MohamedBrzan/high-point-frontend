import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';

const ApplyJobApi = createApi({
  reducerPath: 'ApplyJob Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/apply_job` }),
  endpoints: (builder) => ({
    getAllApplyJob: builder.query({
      query: () => '/',
    }),
    getApplyJobById: builder.query({
      query: (apply_job_id) => `/${apply_job_id}`,
    }),
    createApplyJob: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateApplyJob: builder.mutation({
      query: ({ apply_job_id, ...data }) => ({
        url: `/${apply_job_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteApplyJob: builder.mutation({
      query: (apply_job_id) => ({
        url: `/${apply_job_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllApplyJobQuery,
  useGetApplyJobByIdQuery,
  useCreateApplyJobMutation,
  useUpdateApplyJobMutation,
  useDeleteApplyJobMutation,
} = ApplyJobApi;

export default ApplyJobApi;
