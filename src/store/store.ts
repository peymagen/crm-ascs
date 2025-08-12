import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiUser } from "./services/user.api";
import { apiSubmenu } from "./services/submenu.api";
import { apiTelephonic } from "./services/telephonic.api";
import { apiSlider } from "./services/sliders.api";
import { apiListpage } from "./services/listpage.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiSubmenu.reducerPath]: apiSubmenu.reducer,
    [apiTelephonic.reducerPath]: apiTelephonic.reducer,
    [apiSlider.reducerPath]: apiSlider.reducer,
    [apiListpage.reducerPath]: apiListpage.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      apiUser.middleware,
      apiSubmenu.middleware,
      apiTelephonic.middleware,
      apiSlider.middleware,
      apiListpage.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
