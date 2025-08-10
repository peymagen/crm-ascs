
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSlider = createApi({
  reducerPath: "apiSlider",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSliderById: builder.query({
      query: (id) => `/sliders/${id}`,
    }),
    getSlider: builder.query({
      query: () => "sliders",
    }),
    createSlider: builder.mutation({
      query: (newSlider) => ({
        url: "sliders",
        method: "POST",
        body: newSlider,
      }),
    }),
    updateSlider: builder.mutation({
      query: (updatedSlider) => {
        if (updatedSlider instanceof FormData) {
          // Handle FormData (with file upload)
          const id = updatedSlider.get('id');
          updatedSlider.delete('id'); // Remove ID from FormData body
          return {
            url: `sliders/${id}`,
            method: "PUT",
            body: updatedSlider,
          };
        } else {
          // Handle regular JSON object
          return {
            url: `sliders/${updatedSlider.id}`,
            method: "PUT",
            body: updatedSlider,
          };
        }
      },
    }),
    patchSlider: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedSlider) => ({
        url: `sliders/${updatedSlider.id}`,
        method: "PATCH",
        body: updatedSlider,
      }),
    }),
    deleteSlider: builder.mutation({
      query: (updatedSlider) => ({
        url: `sliders/${updatedSlider.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
    useCreateSliderMutation,
    useGetSliderByIdQuery,
    useGetSliderQuery,
    usePatchSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation

} = apiSlider;
