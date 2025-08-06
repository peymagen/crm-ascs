import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Loader from "./components/Loader";
import Basic from "./components/Layout/basic";
import ProtectedRoute from "./components/Layout/protectedRoute";
import Layout from "./components/Layout";
import PublicLayout from "./components/Layout/publicLayout";
import PublicRoute from "./components/Layout/publicRoute";
import "./i18n";
import AdminPanel from "./pages/login/Admin/AdminPanel";

const mockInitialMenus = [
  {
    id: "1",
    name: "Home",
    path: "/",
    description: "Main page of the website",
    subheading: "Welcome!",
    position: "1",
    target: "Same Window",
    displayArea: "Main Navigation",
    seoUrl: "/",
    otherUrl: "",
    submenus: [],
  },
  {
    id: "2",
    name: "About Us",
    path: "/about",
    description: "Learn about our company",
    subheading: "Our Story",
    position: "2",
    target: "Same Window",
    displayArea: "Main Navigation",
    seoUrl: "/about",
    otherUrl: "",
    submenus: [
      {
        id: "2.1",
        name: "Our Team",
        path: "/about/team",
        seoUrl: "/about/team",
        position: "1",
      },
      {
        id: "2.2",
        name: "Our Mission",
        path: "/about/mission",
        seoUrl: "/about/mission",
        position: "2",
      },
    ],
  },
  {
    id: "3",
    name: "Services",
    path: "/services",
    description: "List of services we offer",
    subheading: "What we do",
    position: "3",
    target: "Same Window",
    displayArea: "Main Navigation",
    seoUrl: "/services",
    otherUrl: "",
    submenus: [],
  },
];

function App() {
  const [menus, setMenus] = useState<any[]>([]);
  const location = useLocation(); // Hook to get current URL location

  // Simulate fetching initial menu data
  useEffect(() => {
    setMenus(mockInitialMenus);
  }, []);

  // Handler for adding a new menu item
  const handleAddMenu = (newMenu: any) => {
    setMenus((prevMenus) => [...prevMenus, newMenu]);
  };

  // Handler for deleting a menu item
  const handleDeleteMenu = (menuId: string) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== menuId));
  };

  // Handler for adding a new submenu
  const handleAddSubmenu = (parentMenuId: string, newSubmenu: any) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === parentMenuId
          ? { ...menu, submenus: [...(menu.submenus || []), newSubmenu] }
          : menu
      )
    );
  };

  // Handler for deleting a submenu
  const handleDeleteSubmenu = (parentMenuId: string, submenuId: string) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === parentMenuId
          ? {
              ...menu,
              submenus: (menu.submenus || []).filter(
                (submenu: any) => submenu.id !== submenuId
              ),
            }
          : menu
      )
    );
  };
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
        ></Route>

        {/* Public routes - accessible to all users with Header and Footer */}
        <Route
          element={
            <PublicRoute>
              <PublicLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<Login />} />
        </Route>

        {/* Protected routes - accessible to all authenticated users */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/admin/menu"
          element={
            <AdminPanel
              menus={menus}
              onAddMenu={handleAddMenu}
              onDeleteMenu={handleDeleteMenu}
              onAddSubmenu={handleAddSubmenu}
            />
          }
        ></Route>

        {/* <Route
          path="/admin/menu"
          element={
            <Route
              path="/admin/menu"
              element={
                <AdminPanel
                  menus={menus}
                  onAddMenu={handleAddMenu}
                  onDeleteMenu={handleDeleteMenu}
                  onAddSubmenu={handleAddSubmenu}
                  onDeleteSubmenu={handleDeleteSubmenu}
                />
              }
            />
          }
        ></Route> */}
      </Routes>
    </Suspense>
  );
}

export default App;
