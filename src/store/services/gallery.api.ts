// import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQueryWithReauth } from "./api";

// export const apiGallery = createApi({
//   reducerPath: "apiGallery",
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({
//     getGalleryById: builder.query({
//       query: (id) => `/gallery-image/${id}`,
//     }),
//     getGallery: builder.query({
//       query: () => "gallery-image",
//     }),
//     createGallery: builder.mutation({
//       query: (newGallery) => ({
//         url: "gallery-image",
//         method: "POST",
//         body: newGallery,
//       }),
//     }),
//     updateGallery: builder.mutation({
//       query: (updatedGallery) => ({
//         url: `gallery-image/${updatedGallery.id}`,
//         method: "PUT",
//         body: updatedGallery,
//       }),
//     }),
//     patchGallery: builder.mutation<IUser, Partial<IUser>>({
//       query: (updatedGallery) => ({
//         url: `gallery-image/${updatedGallery.id}`,
//         method: "PATCH",
//         body: updatedGallery,
//       }),
//     }),
//     deleteGallery: builder.mutation({
//       query: (updatedGallery) => ({
//         url: `gallery-image/${updatedGallery.id}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

// export const {
//  useCreateGalleryMutation,
//  useGetGalleryByIdQuery,
//  useGetGalleryQuery,
//  useDeleteGalleryMutation,
//  usePatchGalleryMutation,
//  useUpdateGalleryMutation
// } = apiGallery;





import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

interface GalleryItem {
  id: number;
  ref_id: string;
  image: string;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface GalleryResponse {
  data: GalleryItem[];
  success: boolean;
  message?: string;
}

export const apiGallery = createApi({
  reducerPath: "apiGallery",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Gallery'],
  endpoints: (builder) => ({
    getGalleryById: builder.query<GalleryItem, number>({
      query: (id) => `/gallery-image/${id}`,
      providesTags: (result, error, id) => [{ type: 'Gallery', id }],
    }),
    getGallery: builder.query<GalleryResponse, void>({
      query: () => "gallery-image",
      providesTags: ['Gallery'],
    }),
    createGallery: builder.mutation<GalleryResponse, FormData>({
      query: (newGallery) => ({
        url: "gallery-image",
        method: "POST",
        body: newGallery,
      }),
      invalidatesTags: ['Gallery'],
    }),
    updateGallery: builder.mutation<GalleryResponse, { id: number; data: FormData }>({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery.id}`,
        method: "PUT",
        body: updatedGallery.data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Gallery', id }, 'Gallery'],
    }),
    patchGallery: builder.mutation<GalleryResponse, { id: number; data: Partial<GalleryItem> }>({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery.id}`,
        method: "PATCH",
        body: updatedGallery.data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Gallery', id }, 'Gallery'],
    }),
    deleteGallery: builder.mutation<GalleryResponse, number>({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Gallery', id }, 'Gallery'],
    }),
  }),
});

export const {
 useCreateGalleryMutation,
 useGetGalleryByIdQuery,
 useGetGalleryQuery,
 useDeleteGalleryMutation,
 usePatchGalleryMutation,
 useUpdateGalleryMutation
} = apiGallery;