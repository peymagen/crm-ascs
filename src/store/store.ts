import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { apiUser } from "./services/user.api";
import { menuApi } from "./services/menu.api";
// import GalleryCategory from "../pages/Admin/GalleryCategory";
import galleryCategoryApi from "./services/galleryCategory.api";
import galleryImageApi from "./services/galleryImage.api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiUser.reducerPath]: apiUser.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [galleryCategoryApi.reducerPath]: galleryCategoryApi.reducer,
    [galleryImageApi.reducerPath]: galleryImageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiUser.middleware)
      .concat(menuApi.middleware)
      .concat(galleryCategoryApi.middleware)
      .concat(galleryImageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
