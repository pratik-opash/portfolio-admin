
import { apiSlice } from '../../api/apiSlice';

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params: { page?: number; limit?: number } | void) => {
        const { page = 1, limit = 10 } = params || {};
        return `/blogs?page=${page}&limit=${limit}`;
      },
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Blog', id }],
    }),
    createBlog: builder.mutation({
      query: (formData) => ({
        url: '/blogs',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Blog', id }, 'Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
