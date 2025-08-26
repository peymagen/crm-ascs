import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSubmenu = createApi({
  reducerPath: "apiSubmenu",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSubmenuById: builder.query({
      query: (id) => `/sub-menu/${id}`,
    }),
    getSubmenu: builder.query({
      query: ({ limit = 10, offset = 0, search = "" }) => {
        let url = `sub-menu?limit=${limit}&offset=${offset}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
    }),
    createSubmenu: builder.mutation({
      query: (newSubmenu) => ({
        url: "sub-menu",
        method: "POST",
        body: newSubmenu,
      }),
    }),
    updateSubmenu: builder.mutation({
      query: (updatedSubmenu) => ({
        url: `sub-menu/${updatedSubmenu.id}`,
        method: "PUT",
        body: updatedSubmenu,
      }),
    }),
    patchSubmenu: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedSubmenu) => ({
        url: `sub-menu/${updatedSubmenu.id}`,
        method: "PATCH",
        body: updatedSubmenu,
      }),
    }),
    deleteSubmenu: builder.mutation({
      query: (updatedSubmenu) => ({
        url: `sub-menu/${updatedSubmenu.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSubmenuMutation,
  useGetSubmenuByIdQuery,
  useGetSubmenuQuery,
  useDeleteSubmenuMutation,
  usePatchSubmenuMutation,
  useUpdateSubmenuMutation,
} = apiSubmenu;
