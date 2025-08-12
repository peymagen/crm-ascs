import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Loader from "./components/Loader";
import Basic from "./components/Layout/basic";
import ProtectedRoute from "./components/Layout/protectedRoute";
import Layout from "./components/Layout";
import PublicLayout from "./components/Layout/publicLayout";
import PublicRoute from "./components/Layout/publicRoute";
import "./i18n";
import Home from "./pages/home";
import Dashboard from "./pages/admin/dashboard";
import ListBottomData from "./pages/admin/submenu";
import TelephonicData from "./pages/admin/telephonic";
import ListSlider from "./pages/admin/slider";
import ListPage from "./pages/admin/ListPage";



function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public routes - accessible to all users */}
        <Route
          element={
            <PublicRoute>
              <Basic />
            </PublicRoute>
          }
        >
          <Route path="/admin/login" element={<Login />} />
        </Route>

        {/* Public routes with Header and Footer */}
        <Route
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        {/* Protected routes - accessible to admin users only */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/submenu" element={<ListBottomData />} />
          <Route path="/admin/telephonic" element={<TelephonicData />} />
          <Route path="/admin/slider" element={<ListSlider />} />
          <Route 
            path="/admin/pages" 
            element={
              <Suspense fallback={<Loader />}>
                <ListPage />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;
