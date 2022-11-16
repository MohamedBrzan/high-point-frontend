import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APPURL } from '../../constants/constants';


const BlogApi = createApi({
  reducerPath: 'Blog Api',
  baseQuery: fetchBaseQuery({ baseUrl: `${APPURL}/blog`}),
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: () => '/',
    }),
    getBlogById: builder.query({
      query: (blog_id) => `/${blog_id}`,
    }),
    createBlog: builder.mutation({
      query: ({ ...data }) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blog_id, ...data }) => ({
        url: `/${blog_id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blog_id) => ({
        url: `/${blog_id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = BlogApi;

export default BlogApi;
