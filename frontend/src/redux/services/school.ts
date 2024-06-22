import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';


interface School {
  name: string;
  address: string;
  principal: string;
  students: number;
}


export const schoolsApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    createSchool: builder.mutation<School, School>({
      query: (credentials) => ({
        url: 'schools',
        method: 'POST',
        body: credentials,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    getSchools: builder.query<[], School>({
      query: (credentials) => ({
        url: 'schools',
        method: 'Get',
        body: credentials,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    updateSchool: builder.mutation({
      query: (updatedSchool) => ({
        url: `/schools/${updatedSchool._id}`,
        method: 'PUT',
        body: updatedSchool,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    deleteSchool: builder.mutation({
      query: (id: string) => ({
        url: `/schools/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
  }),
});

export const { useCreateSchoolMutation, useGetSchoolsQuery, useDeleteSchoolMutation, useUpdateSchoolMutation } = schoolsApi;
