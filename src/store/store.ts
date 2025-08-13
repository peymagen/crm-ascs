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
import { menuApi } from "./services/menu.api";
import galleryCategoryApi from "./services/galleryCategory.api";
import galleryImageApi from "./services/galleryImage.api";
import { apiSubmenu } from "./services/submenu.api";
import { apiTelephonic } from "./services/telephonic.api";
import { apiFooterMenu } from "./services/footerMenu.api";

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
    [menuApi.reducerPath]: menuApi.reducer,
    [galleryCategoryApi.reducerPath]: galleryCategoryApi.reducer,
    [galleryImageApi.reducerPath]: galleryImageApi.reducer,
    [apiSubmenu.reducerPath]: apiSubmenu.reducer,
    [apiTelephonic.reducerPath]: apiTelephonic.reducer,
    [apiFooterMenu.reducerPath]: apiFooterMenu.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiUser.middleware,
      apiGallery.middleware,
      apiFaq.middleware,
      apiHeader.middleware,
      apiSliders.middleware,
      apiSetting.middleware,
      apiMainMenu.middleware,
      menuApi.middleware,
      galleryCategoryApi.middleware,
      galleryImageApi.middleware,
      apiSubmenu.middleware,
      apiTelephonic.middleware,
      apiFooterMenu.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
