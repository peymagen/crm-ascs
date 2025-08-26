import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export const apiOpportunities = createApi({
  reducerPath: "apiOpportunities",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOpportunitiesById: builder.query({
      query: (id) => `/opportunities/${id}`,
    }),
    getOpportunities: builder.query({
      query: ({ limit = 10, offset = 0, search = "" }) => {
        let url = `opportunities?limit=${limit}&offset=${offset}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        return url;
      },
    }),
    getNotice: builder.query({
      query: () => "opportunities/notice",
    }),
    getOpportunityType: builder.query({
      query: (type) => `opportunities/type/${type}`,
    }),
    createOpportunities: builder.mutation({
      query: (newOpportunities) => ({
        url: "opportunities",
        method: "POST",
        body: newOpportunities,
      }),
    }),
    updateOpportunities: builder.mutation({
      query: (updatedOpportunities) => ({
        url: `opportunities/${updatedOpportunities.id}`,
        method: "PUT",
        body: updatedOpportunities.body,
      }),
    }),
    patchOpportunities: builder.mutation({
      query: (updatedOpportunities) => ({
        url: `opportunities/${updatedOpportunities.id}`,
        method: "PATCH",
        body: updatedOpportunities.body,
      }),
    }),
    deleteOpportunities: builder.mutation({
      query: (updatedOpportunities) => ({
        url: `opportunities/${updatedOpportunities.id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOpportunitiesMutation,
  useGetOpportunitiesByIdQuery,
  useGetOpportunitiesQuery,
  useGetNoticeQuery,
  useGetOpportunityTypeQuery,
  usePatchOpportunitiesMutation,
  useUpdateOpportunitiesMutation,
  useDeleteOpportunitiesMutation,
} = apiOpportunities;
