// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithReauth } from "./api";

// export const menuApi = createApi({
//   reducerPath: "menuApi",
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Menu"],
//   endpoints: (builder) => ({
//     getMenus: builder.query<
//       any,
//       { limit?: number; offset?: number; search?: string }
//     >({
//       query: ({ limit = 10, offset = 0, search = "" } = {}) => {
//         let url = `menus?limit=${limit}&offset=${offset}`;
//         if (search) {
//           url += `&search=${encodeURIComponent(search)}`;
//         }
//         return url;
//       },
//       providesTags: (result) =>
//         result
//           ? [
//               ...(result.data || []).map(({ id }: { id: string }) => ({
//                 type: "Menu" as const,
//                 id,
//               })),
//               { type: "Menu", id: "LIST" },
//             ]
//           : [{ type: "Menu", id: "LIST" }],
//     }),

//     addMenu: builder.mutation({
//       query: (newMenu) => ({
//         url: "menus",
//         method: "POST",
//         body: newMenu,
//       }),
//       invalidatesTags: [{ type: "Menu", id: "LIST" }],
//     }),

//     updateMenu: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `menus/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Menu", id }],
//     }),

//     deleteMenu: builder.mutation({
//       query: (id) => ({
//         url: `menus/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: (result, error, id) => [{ type: "Menu", id }],
//     }),
//   }),
// });

// export const {
//   useGetMenusQuery,
//   useAddMenuMutation,
//   useUpdateMenuMutation,
//   useDeleteMenuMutation,
// } = menuApi;

// src/store/services/menu.api.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api"; // your baseQueryWithReauth

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    // GET /main-menu?limit=..&offset=..&search=..
    getMenus: builder.query<
      any,
      { limit?: number; offset?: number; search?: string } | void
    >({
      // default param fallback inside query signature
      query: ({ limit = 10, offset = 0, search = "" } = {}) => {
        let url = `main-menu?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return { url, method: "GET" };
      },
      providesTags: (result) => {
        // normalize many possible shapes
        const items: any[] = Array.isArray(result)
          ? result
          : result?.data ?? result?.items ?? [];
        if (items && items.length) {
          return [
            ...items.map((itm) => ({ type: "Menu" as const, id: itm.id })),
            { type: "Menu" as const, id: "LIST" },
          ];
        }
        return [{ type: "Menu" as const, id: "LIST" }];
      },
    }),

    // GET /main-menu/:id
    getMenu: builder.query<any, number>({
      query: (id) => ({ url: `main-menu/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),

    // POST /main-menu
    addMenu: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: "main-menu",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Menu", id: "LIST" }],
    }),

    // PUT /main-menu/:id
    updateMenu: builder.mutation<any, { id: number; body: Partial<any> }>({
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

    // DELETE /main-menu/:id
    deleteMenu: builder.mutation<any, number>({
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
