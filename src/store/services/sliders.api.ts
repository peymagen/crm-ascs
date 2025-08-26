import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSliders = createApi({
  reducerPath: "apiSliders",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSlidersById: builder.query({
      query: (id) => `sliders/${id}`,
    }),
    getSliders: builder.query({
      query: ({ limit = 10, offset = 0, search = "" }) => {
        let url = `sliders?limit=${limit}&offset=${offset}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
    }),
    createSliders: builder.mutation({
      query: (newSliders) => ({
        url: "sliders",
        method: "POST",
        body: newSliders,
      }),
    }),
    updateSliders: builder.mutation({
      query: (data) => ({
        url: `sliders/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    patchSliders: builder.mutation({
      query: (data) => ({
        url: `sliders/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSliders: builder.mutation({
      query: (data) => ({
        url: `sliders/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSlidersByIdQuery,
  useGetSlidersQuery,
  useCreateSlidersMutation,
  useUpdateSlidersMutation,
  usePatchSlidersMutation,
  useDeleteSlidersMutation,
} = apiSliders;
