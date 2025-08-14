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
  tagTypes: ["Gallery"],
  endpoints: (builder) => ({
    getGalleryById: builder.query<GalleryItem, number>({
      query: (id) => `/gallery-image/${id}`,
    }),
    getGallery: builder.query<GalleryResponse, void>({
      query: () => "gallery-image",
    }),
    createGallery: builder.mutation<GalleryResponse, FormData>({
      query: (newGallery) => ({
        url: "gallery-image",
        method: "POST",
        body: newGallery,
      }),
    }),
    updateGallery: builder.mutation<
      GalleryResponse,
      { id: number; data: FormData }
    >({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery.id}`,
        method: "PUT",
        body: updatedGallery.data,
      }),
    }),
    patchGallery: builder.mutation<
      GalleryResponse,
      { id: number; data: Partial<GalleryItem> }
    >({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery.id}`,
        method: "PATCH",
        body: updatedGallery.data,
      }),
    }),
    deleteGallery: builder.mutation<GalleryResponse, number>({
      query: (updatedGallery) => ({
        url: `gallery-image/${updatedGallery}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateGalleryMutation,
  useGetGalleryByIdQuery,
  useGetGalleryQuery,
  useDeleteGalleryMutation,
  usePatchGalleryMutation,
  useUpdateGalleryMutation,
} = apiGallery;
