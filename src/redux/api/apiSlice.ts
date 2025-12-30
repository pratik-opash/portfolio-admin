
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_SERVER}/api`,
    prepareHeaders: (headers, { getState }) => {
      // Type assertion for RootState to access auth slice
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Blog', 'Project', 'Contact', 'Dashboard'],
  endpoints: (builder) => ({}),
});
