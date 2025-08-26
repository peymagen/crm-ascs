import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiFooterMenu = createApi({
  reducerPath: "apiFooterMenu",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getFooterMenuById: builder.query({
      query: (id) => `/footer-menu/${id}`,
    }),
    getFooterMenu: builder.query({
      query: ({ limit = 10, offset = 0, search = "" }) => {
        let url = `footer-menu?limit=${limit}&offset=${offset}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
    }),
    createFooterMenu: builder.mutation({
      query: (newFooterMenu) => ({
        url: "footer-menu",
        method: "POST",
        body: newFooterMenu,
      }),
    }),
    updateFooterMenu: builder.mutation({
      query: (updatedFooterMenu) => ({
        url: `footer-menu/${updatedFooterMenu.id}`,
        method: "PUT",
        body: updatedFooterMenu,
      }),
    }),
    patchFooterMenu: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedFooterMenu) => ({
        url: `footer-menu/${updatedFooterMenu.id}`,
        method: "PATCH",
        body: updatedFooterMenu,
      }),
    }),
    deleteFooterMenu: builder.mutation({
      query: (updatedFooterMenu) => ({
        url: `footer-menu/${updatedFooterMenu.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFooterMenuMutation,
  useGetFooterMenuByIdQuery,
  useGetFooterMenuQuery,
  useDeleteFooterMenuMutation,
  usePatchFooterMenuMutation,
  useUpdateFooterMenuMutation,
} = apiFooterMenu;
