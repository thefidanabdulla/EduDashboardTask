import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';


interface University {
  _id?: string; 
  name: string;
  address: string;
  president: string;
  students: number;
  email: string;
  corpus: {
    department: string;
    head: string;
    numberOfCourses: number;
  }[];
}

export const universitiesApi = createApi({
  reducerPath: 'universitiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    createUniversity: builder.mutation<University, University>({
      query: (university) => ({
        url: 'universities',
        method: 'POST',
        body: university,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    getUniversities: builder.query<University[], {name?: string, address?: string, president?: string, email?: string}>({
      query: ({name = "", address = "", president = "", email = ""}) => ({
        url: `universities?name=${name}&address=${address}&president=${president}&email=${email}`,
        method: 'GET',
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    updateUniversity: builder.mutation<University, University>({
      query: (updatedUniversity) => ({
        url: `universities/${updatedUniversity._id}`,
        method: 'PUT',
        body: updatedUniversity,
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
    deleteUniversity: builder.mutation<{ success: boolean }, string>({
      query: (id: string) => ({
        url: `universities/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${Cookies.get("token") || ""}`
        }
      }),
    }),
  }),
});

export const {
  useCreateUniversityMutation,
  useGetUniversitiesQuery,
  useUpdateUniversityMutation,
  useDeleteUniversityMutation,
} = universitiesApi;