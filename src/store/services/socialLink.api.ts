import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiSocialLink = createApi({
  reducerPath: "apiSocialLink",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getSocialLinkById: builder.query({
      query: (id) => `/social-links/${id}`,
    }),
    getSocialLink: builder.query({
      query: () => "social-links",
    }),
    createSocialLink: builder.mutation({
      query: (newSocialLink) => ({
        url: "social-links",
        method: "POST",
        body: newSocialLink,
      }),
    }),
    updateSocialLink: builder.mutation({
      query: (updatedSocialLink) => ({
        url: `social-links/${updatedSocialLink.id}`,
        method: "PUT",
        body: updatedSocialLink,
      }),
    }),
    patchSocialLink: builder.mutation<IUser, Partial<IUser>>({
      query: (updatedSocialLink) => ({
        url: `social-links/${updatedSocialLink.id}`,
        method: "PATCH",
        body: updatedSocialLink,
      }),
    }),
    deleteSocialLink: builder.mutation({
      query: (updatedSocialLink) => ({
        url: `social-links/${updatedSocialLink.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateSocialLinkMutation,
  useGetSocialLinkByIdQuery,
  useGetSocialLinkQuery,
  useDeleteSocialLinkMutation,
  usePatchSocialLinkMutation,
  useUpdateSocialLinkMutation,
} = apiSocialLink;
