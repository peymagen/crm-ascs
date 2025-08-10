// import { Suspense } from "react";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import Login from "./pages/login";
// import Loader from "./components/Loader";
// import Basic from "./components/Layout/basic";
// import ProtectedRoute from "./components/Layout/protectedRoute";
// import Layout from "./components/Layout";
// import PublicLayout from "./components/Layout/publicLayout";
// import PublicRoute from "./components/Layout/publicRoute";
// import "./i18n";
// <<<<<<< HEAD
// import MenuManagement from "./pages/Admin/MenuManagement";
// import GalleryCategory from "./pages/Admin/GalleryCategory";
// import GalleryImageManagement from "./pages/Admin/GalleryImage";
// =======
// import Home from "./pages/home";
// import Dashboard from "./pages/admin/dashboard";
// >>>>>>> fbaa239d9dd89e7c8b091400220ab835354a06c1

// function App() {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Routes>
//         {/* Public routes - accessible to all users */}
//         <Route
//           element={
//             <PublicRoute>
//               <Basic />
//             </PublicRoute>
//           }
//         >
//           <Route path="/admin/login" element={<Login />} />
//         </Route>

//         {/* Public routes - accessible to all users with Header and Footer */}
//         <Route
//           element={
//             <PublicRoute>
//               <PublicLayout />
//             </PublicRoute>
//           }
//         >
//           <Route path="/" element={<Home />} />
//         </Route>

//         {/* Protected routes - accessible to all authenticated users */}
//         <Route
//           element={
//             <ProtectedRoute allowedRoles={["ADMIN"]}>
//               <Layout />
//             </ProtectedRoute>
//           }
// <<<<<<< HEAD
//         ></Route>

//         <Route path="/admin/test" element={<MenuManagement />}></Route>
//         <Route path="/admin/Gallery" element={<GalleryCategory />}></Route>
//         <Route
//           path="/admin/Gallery/Image"
//           element={<GalleryImageManagement />}
//         ></Route>
// =======
//         >
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>
// >>>>>>> fbaa239d9dd89e7c8b091400220ab835354a06c1
//       </Routes>
//     </Suspense>
//   );
// }

// export default App;

import { Suspense } from "react";
// import "../../crm-ascs/src/";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Loader from "./components/Loader";
import Basic from "./components/Layout/basic";
import ProtectedRoute from "./components/Layout/protectedRoute";
import Layout from "./components/Layout";
import PublicLayout from "./components/Layout/publicLayout";
import PublicRoute from "./components/Layout/publicRoute";
import "./i18n";

import MenuManagement from "./pages/Admin/MenuManagement";
import GalleryCategory from "./pages/Admin/GalleryCategory";
import GalleryImageManagement from "./pages/Admin/GalleryImage";
import Home from "./pages/home";
import Dashboard from "./pages/Admin/dashboard";

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

        {/* Public routes - accessible to all users with Header and Footer */}
        <Route
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        {/* Protected routes - accessible to all authenticated users */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/admin/test" element={<MenuManagement />} />
        <Route path="/admin/Gallery" element={<GalleryCategory />} />
        <Route
          path="/admin/Gallery/Image"
          element={<GalleryImageManagement />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
