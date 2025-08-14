import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiUser } from "./services/user.api";
import { apiListpage } from "./services/listpage.api";
import { apiOpportunities } from "./services/opportunities.api";
import { apiGallery } from "./services/gallery.api";
import { apiFaq } from "./services/faq.api";
import { apiSliders } from "./services/sliders.api";
import { apiSetting } from "./services/setting.api";
import { apiMainMenu } from "./services/mainMenu.api";
import { galleryCategoryApi } from "./services/galleryCategory.api";
import { galleryImageApi } from "./services/galleryImage.api";
import { apiSubmenu } from "./services/submenu.api";
import { apiTelephonic } from "./services/telephonic.api";
import { apiFooterMenu } from "./services/footerMenu.api";
import { apiQuickMenu } from "./services/quickMenu.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [apiSubmenu.reducerPath]: apiSubmenu.reducer,
    [apiTelephonic.reducerPath]: apiTelephonic.reducer,
    [apiListpage.reducerPath]: apiListpage.reducer,
    [apiOpportunities.reducerPath]: apiOpportunities.reducer,
    [apiGallery.reducerPath]: apiGallery.reducer,
    [apiFaq.reducerPath]: apiFaq.reducer,
    [apiSliders.reducerPath]: apiSliders.reducer,
    [apiSetting.reducerPath]: apiSetting.reducer,
    [apiMainMenu.reducerPath]: apiMainMenu.reducer,
    [galleryCategoryApi.reducerPath]: galleryCategoryApi.reducer,
    [galleryImageApi.reducerPath]: galleryImageApi.reducer,
    [apiFooterMenu.reducerPath]: apiFooterMenu.reducer,
    [apiQuickMenu.reducerPath]: apiQuickMenu.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      apiUser.middleware,
      apiSubmenu.middleware,
      apiTelephonic.middleware,
      apiListpage.middleware,
      apiOpportunities.middleware,
      apiGallery.middleware,
      apiFaq.middleware,
      apiSliders.middleware,
      apiSetting.middleware,
      apiMainMenu.middleware,
      galleryCategoryApi.middleware,
      galleryImageApi.middleware,
      apiSubmenu.middleware,
      apiTelephonic.middleware,
      apiFooterMenu.middleware,
      apiQuickMenu.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
