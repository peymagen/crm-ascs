import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export interface GalleryImage {
  id: number;
  ref_id: number;
  image: string; // stored path or URL
}

interface PaginatedResponse<T> {
  data: T[];
  total?: number;
}

export const galleryImageApi = createApi({
  reducerPath: "galleryImageApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["GalleryImage"],
  endpoints: (builder) => ({
    getGalleryImages: builder.query<
      PaginatedResponse<GalleryImage>,
      { limit?: number; offset?: number; search?: string } | void
    >({
      query: ({ limit = 10, offset = 0, search = "" } = {}) => {
        let url = `gallery-image?limit=${limit}&offset=${offset}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        return { url, method: "GET" };
      },
      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map(({ id }) => ({
                type: "GalleryImage" as const,
                id,
              })),
              { type: "GalleryImage", id: "LIST" },
            ]
          : [{ type: "GalleryImage", id: "LIST" }],
    }),

    getGalleryImage: builder.query<GalleryImage, number>({
      query: (id) => ({ url: `gallery-image/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "GalleryImage", id }],
    }),

    addGalleryImage: builder.mutation<GalleryImage, FormData>({
      query: (formData) => ({
        url: "gallery-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "GalleryImage", id: "LIST" }],
    }),

    updateGalleryImage: builder.mutation<
      GalleryImage,
      { id: number; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `gallery-image/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "GalleryImage", id },
        { type: "GalleryImage", id: "LIST" },
      ],
    }),

    deleteGalleryImage: builder.mutation<void, number>({
      query: (id) => ({ url: `gallery-image/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, id) => [
        { type: "GalleryImage", id },
        { type: "GalleryImage", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetGalleryImagesQuery,
  useGetGalleryImageQuery,
  useLazyGetGalleryImagesQuery,
  useAddGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
} = galleryImageApi;

export default galleryImageApi;
