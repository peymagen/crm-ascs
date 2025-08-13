import type { BaseQueryApi } from "@reduxjs/toolkit/query";
import type { FetchArgs } from "@reduxjs/toolkit/query";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { resetTokens, setTokens } from "../reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_SERVER + "api/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken; // Get accessToken from your Redux states
    // List of public endpoints where no token is required
    if (token) {
      // Attach the token only for private endpoints
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    typeof args !== "string" && // Ensure args is an object before accessing url
    !(args.url?.split("/")[0] === "users" && args?.method === "POST") &&
    result.error &&
    result.error.status === 401
  ) {
    // Access token expired, attempt to refresh
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    if (refreshToken) {
      // Attempt token refresh
      const refreshResult = await baseQuery(
        {
          url: "users/ref-token",
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`, // Send the refresh token as Bearer
          },
        },
        api,
        extraOptions
      );

      if (refreshResult) {
        if (refreshResult.data && typeof refreshResult.data === "object") {
          api.dispatch(
            setTokens({
              ...refreshResult.data,
              user: state.auth.user,
              accessToken: "",
              refreshToken: "",
            })
          );
        }
        const data = refreshResult.data as {
          accessToken: string;
          refreshToken: string;
        };
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // Retry the original request with the new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, log the user out
        api.dispatch(resetTokens());
      }
    } else {
      api.dispatch(resetTokens());
    }
  }

  return result;
};

// import { createApi } from "@reduxjs/toolkit/query/react";
// // import { baseQueryWithReauth } from "./baseQuery"; // or api.ts file

// export const api = createApi({
//   baseQuery: baseQueryWithReauth,
//   tagTypes: ["Menu"],
//   endpoints: () => ({}),
// });
