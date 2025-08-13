import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Loader from "./components/Loader";
import Basic from "./components/Layout/basic";
import ProtectedRoute from "./components/Layout/protectedRoute";
import Layout from "./components/Layout";
import PublicLayout from "./components/Layout/publicLayout";
import PublicRoute from "./components/Layout/publicRoute";
import GalleryPage from "./pages/gallery";
import "./i18n";

import MenuManagement from "./pages/Admin/MenuManagement";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/home";
import ListBottomData from "./pages/Admin/BottomMenu";
import TelephonicData from "./pages/admin/Telephonic";
import ListSlider from "./pages/admin/Slider";

import GalleryCategory from "./pages/Admin/GalleryCategory";
import GalleryImageManagement from "./pages/Admin/GalleryImage";

import ListSetting from "./pages/admin/Settings";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          element={
            <PublicRoute>
              <Basic />
            </PublicRoute>
          }
        >
          <Route path="/admin/login" element={<Login />} />
        </Route>

        <Route
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/main-menu" element={<MenuManagement />} />
          <Route path="/admin/bottom-menu" element={<ListBottomData />} />
          <Route path="/admin/telephonic" element={<TelephonicData />} />
          <Route path="/admin/slider" element={<ListSlider />} />
          <Route path="/admin/gallery" element={<GalleryCategory />} />
          <Route
            path="/admin/gallery-image"
            element={<GalleryImageManagement />}
          />
          <Route path="/admin/setting" element={<ListSetting />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
