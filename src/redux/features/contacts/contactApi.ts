
import { apiSlice } from '../../api/apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (params: { page?: number; limit?: number } | void) => {
         const { page = 1, limit = 10 } = params || {};
         return `/contacts?page=${page}&limit=${limit}`;
      },
      providesTags: ['Contact'],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: '/contacts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactApi;
