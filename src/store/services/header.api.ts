import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiHeader = createApi({
  reducerPath: "apiHeader",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getHeaderById: builder.query({
      query: (id) => `/main-menu/${id}`,
    }),
    getHeader: builder.query({
      query: () => "main-menu",
    }),
    createHeader: builder.mutation({
      query: (newHeader) => ({
        url: "main-menu",
        method: "POST",
        body: newHeader,
      }),
    }),
    updateHeader: builder.mutation({
      query: (updatedHeader) => ({
        url: `main-menu/${updatedHeader.id}`,
        method: "PUT",
        body: updatedHeader,
      }),
    }),
    patchHeader: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedHeader) => ({
        url: `main-menu/${updatedHeader.id}`,
        method: "PATCH",
        body: updatedHeader,
      }),
    }),
    deleteHeader: builder.mutation({
      query: (updatedHeader) => ({
        url: `main-menu/${updatedHeader.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
 useCreateHeaderMutation,
 useGetHeaderByIdQuery,
 useGetHeaderQuery,
 useDeleteHeaderMutation,
 usePatchHeaderMutation,
 useUpdateHeaderMutation
} = apiHeader;
