import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export interface MenuItem {
  id: number;
  name: string;
  url?: string | null;
  other_url?: string | null;
  target?: string;
  description?: string | null;
  position?: number;
  sorting_order?: number;
  lang?: string;
  [key: string]: any;
}

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenus: builder.query<
      { data: MenuItem[]; total: number },
      { limit?: number; offset?: number; search?: string }
    >({
      query: ({ limit = 10, offset = 0, search = "" } = {}) => {
        let url = `main-menu?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return { url, method: "GET" };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Menu" as const, id })),
              { type: "Menu", id: "LIST" },
            ]
          : [{ type: "Menu", id: "LIST" }],
    }),

    getMenu: builder.query<MenuItem, number>({
      query: (id) => ({ url: `main-menu/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),

    addMenu: builder.mutation<MenuItem, Partial<MenuItem>>({
      query: (body) => ({
        url: "main-menu",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
    }),

    updateMenu: builder.mutation<
      MenuItem,
      { id: number; body: Partial<MenuItem> }
    >({
      query: ({ id, body }) => ({
        url: `main-menu/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Menu", id },
        { type: "Menu", id: "LIST" },
      ],
    }),

    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({ url: `main-menu/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "Menu", id },
        { type: "Menu", id: "LIST" },
      ],
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
