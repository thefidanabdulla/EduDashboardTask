import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';


interface HighSchool {
  name: string;
  address: string;
  principal: string;
  students: number;
  graduationRate: number;
}


export const highschoolsApi = createApi({
  reducerPath: 'highschoolsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    createHighSchool: builder.mutation<HighSchool, HighSchool>({
      query: (credentials) => ({
        url: 'highschools',
        method: 'POST',
        body: credentials,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    getHighSchools: builder.query<[], HighSchool>({
      query: (credentials) => ({
        url: 'highschools',
        method: 'Get',
        body: credentials,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    updateHighSchool: builder.mutation({
      query: (updatedHighSchool) => ({
        url: `/highschools/${updatedHighSchool._id}`,
        method: 'PUT',
        body: updatedHighSchool,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    deleteHighSchool: builder.mutation({
      query: (id: string) => ({
        url: `/highschools/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
  }),
});

export const { useCreateHighSchoolMutation, useGetHighSchoolsQuery, useDeleteHighSchoolMutation, useUpdateHighSchoolMutation } = highschoolsApi;
