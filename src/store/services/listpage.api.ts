import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";
import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";

type Builder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  never,
  "apiListpage"
>;

export const apiListpage = createApi({
  reducerPath: "apiListpage",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder: Builder) => ({
    getListpageById: builder.query({
      query: (id: number) => `/pages/${id}`,
    }),
    getListpageBySlug: builder.query({
      query: (id: string) => `/pages/slug/${id}`,
    }),
    getListpage: builder.query({
      query: ({ limit = 10, offset = 0, search = "" }) => {
        let url = `pages?limit=${limit}&offset=${offset}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
    }),
    createListpage: builder.mutation({
      query: (newListpage) => ({
        url: "pages",
        method: "POST",
        body: newListpage,
      }),
    }),
    updateListpage: builder.mutation({
      query: (updatedListpage) => {
        console.log("uuuuuuuu", updatedListpage); // Moved inside function body
        return {
          url: `pages/${updatedListpage.get("id")}`,
          method: "PUT",
          body: updatedListpage,
        };
      },
    }),
    patchListpage: builder.mutation({
      query: (updatedListpage) => ({
        url: `pages/${updatedListpage.id}`,
        method: "PATCH",
        body: updatedListpage,
      }),
    }),
    deleteListpage: builder.mutation<void, { id: number }>({
      query: ({ id }: { id: number }) => ({
        url: `pages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateListpageMutation,
  useGetListpageByIdQuery,
  useGetListpageBySlugQuery,
  useGetListpageQuery,
  useDeleteListpageMutation,
  usePatchListpageMutation,
  useUpdateListpageMutation,
} = apiListpage;
