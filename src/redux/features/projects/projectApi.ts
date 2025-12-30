
import { apiSlice } from '../../api/apiSlice';

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (params: { page?: number; limit?: number } | void) => {
         const { page = 1, limit = 10 } = params || {};
         return `/projects?page=${page}&limit=${limit}`;
      },
      providesTags: ['Project'],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation({
      query: (formData) => ({
        url: '/projects',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }, 'Project'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
