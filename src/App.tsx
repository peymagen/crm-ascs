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

import MenuManagement from "../src/pages/admin/MenuManagement";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/home";
import OpportunityData from "./pages/admin/Opportunities";
import ListBottomData from "./pages/admin/BottomMenu";
import TelephonicData from "./pages/admin/Telephonic";
import ListSlider from "./pages/admin/Slider";

import GalleryCategory from "../src/pages/admin/GalleryCategory";
import GalleryImageManagement from "../src/pages/admin/GalleryImage";

import ListSetting from "./pages/admin/Settings";
import FaqData from "./pages/admin/Faq";
import QuickMenuData from "./pages/admin/Quicklink";
import SubMenuData from "./pages/admin/SubMenu";
import ListPage from "./pages/admin/ListPage";
import Faqs from "./pages/faq";
import SocialLinkData from "./pages/admin/SocialLink";
import PortalData from "./pages/admin/OtherPortal";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import Opportunity from "./pages/opportunity";

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
          <Route path="/faq" element={<Faqs />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/page/:id" element={<ProjectsPage />} />
          <Route path="/opportunity/:type" element={<Opportunity />} />
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
          <Route path="/admin/sub-menu" element={<SubMenuData />} />
          <Route path="/admin/bottom-menu" element={<ListBottomData />} />
          <Route path="/admin/quick-menu" element={<QuickMenuData />} />
          <Route path="/admin/page" element={<ListPage />} />
          <Route path="/admin/faq" element={<FaqData />} />
          <Route path="/admin/social-link" element={<SocialLinkData />} />
          <Route path="/admin/other-portal" element={<PortalData />} />
          <Route path="/admin/telephonic" element={<TelephonicData />} />
          <Route path="/admin/slider" element={<ListSlider />} />

          <Route path="/admin/gallery" element={<GalleryCategory />} />
          <Route
            path="/admin/gallery-image"
            element={<GalleryImageManagement />}
          />
          <Route path="/admin/setting" element={<ListSetting />} />
          <Route path="/admin/opportunities" element={<OpportunityData />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
