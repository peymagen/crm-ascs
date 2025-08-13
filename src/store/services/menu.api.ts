import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenus: builder.query<
      { data: IMainMenu[]; total: number },
      { limit?: number; offset?: number; search?: string }
    >({
      query: ({ limit = 10, offset = 0, search = "" } = {}) => {
        let url = `main-menu?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return { url, method: "GET" };
      },
    }),

    getMenu: builder.query<IMainMenu, number>({
      query: (id) => ({ url: `main-menu/${id}`, method: "GET" }),
    }),

    addMenu: builder.mutation<IMainMenu, Partial<IMainMenu>>({
      query: (body) => ({
        url: "main-menu",
        method: "POST",
        body,
      }),
    }),

    updateMenu: builder.mutation<
      IMainMenu,
      { id: number; body: Partial<IMainMenu> }
    >({
      query: ({ id, body }) => ({
        url: `main-menu/${id}`,
        method: "PUT",
        body,
      }),
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({ url: `main-menu/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetMenusQuery,
  useGetMenuQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useLazyGetMenusQuery,
} = menuApi;

export default menuApi;
