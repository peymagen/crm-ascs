import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiOtherPage = createApi({
  reducerPath: "apiOtherPage",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOtherPageById: builder.query({
      query: (id) => `/other-portal/${id}`,
    }),
    getOtherPage: builder.query({
      query: () => "other-portal",
    }),
    createOtherPage: builder.mutation({
      query: (newOtherPage) => ({
        url: "other-portal",
        method: "POST",
        body: newOtherPage,
      }),
    }),
    updateOtherPage: builder.mutation({
      query: (updatedOtherPage) => ({
        url: `other-portal/${updatedOtherPage.id}`,
        method: "PUT",
        body: updatedOtherPage,
      }),
    }),
    patchOtherPage: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedOtherPage) => ({
        url: `other-portal/${updatedOtherPage.id}`,
        method: "PATCH",
        body: updatedOtherPage,
      }),
    }),
    deleteOtherPage: builder.mutation({
      query: (updatedOtherPage) => ({
        url: `other-portal/${updatedOtherPage.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOtherPageMutation,
  useGetOtherPageByIdQuery,
  useGetOtherPageQuery,
  useDeleteOtherPageMutation,
  usePatchOtherPageMutation,
  useUpdateOtherPageMutation,
} = apiOtherPage;
