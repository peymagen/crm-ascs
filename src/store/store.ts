import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiUser } from "./services/user.api";
import { apiGallery } from "./services/gallery.api";
import { apiFaq } from "./services/faq.api";
import { apiHeader } from "./services/header.api";
import { apiSliders } from "./services/sliders.api";
import { apiSetting } from "./services/setting.api";
import { apiMainMenu } from "./services/mainMenu.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiGallery.reducerPath]: apiGallery.reducer,
    [apiFaq.reducerPath]: apiFaq.reducer,
    [apiHeader.reducerPath]: apiHeader.reducer,
    [apiSliders.reducerPath]: apiSliders.reducer,
    [apiSetting.reducerPath]: apiSetting.reducer,
    [apiMainMenu.reducerPath]: apiMainMenu.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiUser.middleware,
      apiGallery.middleware,
      apiFaq.middleware,
      apiHeader.middleware,
      apiSliders.middleware,
      apiSetting.middleware,
      apiMainMenu.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
