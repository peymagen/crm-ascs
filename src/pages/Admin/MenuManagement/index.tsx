// import { useEffect, useState } from "react";
// import { DataTable } from "../../../components/DataTable";
// import AddMenuModal from "./AddMenu/AddMenuModal";
// import ConfirmDeleteModal from "./ConfirmDelete/ConfirmDeleteModal";
// import "./MenuManagement.css";
// import Button from "../../../components/Button";

// interface Menu {
//   id: number;
//   name: string;
//   path: string;
//   description: string;
//   position: number;
// }

// const MenuManagement = () => {
//   const [menus, setMenus] = useState<Menu[]>([
//     {
//       id: 1,
//       name: "Home",
//       path: "/",
//       description: "Main page of the website",
//       position: 1,
//     },
//     {
//       id: 2,
//       name: "About Us",
//       path: "/about",
//       description: "Learn about our company",
//       position: 2,
//     },
//     {
//       id: 3,
//       name: "Services",
//       path: "/services",
//       description: "List of services we offer",
//       position: 3,
//     },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editMenu, setEditMenu] = useState<Menu | null>(null);
//   const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);

//   const handleAddOrUpdateMenu = (menu: Omit<Menu, "id">) => {
//     if (editMenu) {
//       // Update
//       setMenus((prev) =>
//         [...prev].map((m) =>
//           m.id === editMenu.id ? { ...editMenu, ...menu } : m
//         )
//       );
//     } else {
//       // Add
//       setMenus((prev) => [...prev, { id: Date.now(), ...menu }]);
//     }

//     setEditMenu(null);
//     setIsModalOpen(false);
//   };

//   const fetchData = async (params?: {
//     page: number;
//     search?: string;
//   }): Promise<{ data: Menu[]; total: number }> => {
//     const page = params?.page ?? 1;
//     const search = params?.search?.toLowerCase() ?? "";
//     const limit = 10;

//     const sortedMenus = [...menus].sort((a, b) => a.position - b.position);

//     const filteredMenus = sortedMenus.filter((menu) =>
//       menu.name.toLowerCase().includes(search)
//     );

//     const startIndex = (page - 1) * limit;
//     const paginatedData = filteredMenus.slice(startIndex, startIndex + limit);

//     return {
//       data: paginatedData,
//       total: filteredMenus.length,
//     };
//   };

//   const columns = [
//     { label: "ID", accessor: "id" },
//     { label: "Menu Name", accessor: "name" },
//     { label: "Path", accessor: "path" },
//     { label: "Description", accessor: "description" },
//   ];
//   const actions = [
//     {
//       label: "Edit",
//       onClick: (menu: Menu) => {
//         setEditMenu(menu); // Set the menu to be edited
//         setIsModalOpen(true); // Open modal with edit data
//       },
//     },
//     {
//       label: "Delete",
//       onClick: (menu: Menu) => {
//         setMenuToDelete(menu); // Show confirmation modal
//       },
//     },
//   ];

//   useEffect(() => {
//     fetchData();
//   }, [menus]);

//   return (
//     <div className="menu-management-container">
//       <div className="menu-management-header">
//         <h1 className="title">Menu Management</h1>
//         <Button
//           title="Add Menu"
//           onClick={() => {
//             setEditMenu(null);
//             setIsModalOpen(true);
//           }}
//           buttonType="primary"
//         />
//       </div>

//       <DataTable
//         fetchData={fetchData}
//         columns={columns}
//         actions={actions}
//         loading={false}
//         isNavigate
//         isSearch
//         isExport
//         hasCheckbox
//         onSelectedRows={(rows) => console.log("Selected Rows:", rows)}
//       />

//       {isModalOpen && (
//         <AddMenuModal
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditMenu(null);
//           }}
//           onAdd={handleAddOrUpdateMenu}
//           editMenu={editMenu}
//         />
//       )}

//       {menuToDelete && (
//         <ConfirmDeleteModal
//           menuName={menuToDelete.name}
//           onClose={() => setMenuToDelete(null)}
//           onConfirm={() => {
//             setMenus((prev) =>
//               prev.filter((menu) => menu.id !== menuToDelete.id)
//             );
//             setMenuToDelete(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default MenuManagement;

// src/pages/Admin/MenuManagement.tsx
import React, { useState, useCallback } from "react";
import { DataTable } from "../../../components/DataTable";
import AddMenuModal from "./AddMenu/AddMenuModal";
import ConfirmDeleteModal from "./ConfirmDelete/ConfirmDeleteModal";
import Button from "../../../components/Button";

import {
  useLazyGetMenusQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} from "../../../store/services/menu.api";

import styles from "./MenuManagement.module.css";

interface MenuItem {
  id: number;
  name: string;
  url?: string; // API might name it url / path / other_url
  other_url?: string;
  target?: string;
  sorting_order?: number;
  lang?: string;
  description?: string;
  position?: number;
  [k: string]: any;
}

const MenuManagement: React.FC = () => {
  const [triggerGetMenus] = useLazyGetMenusQuery();
  const [addMenu] = useAddMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<MenuItem | null>(null);

  // DataTable's fetchData — called by DataTable internally.
  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const page = params?.page ?? 1;
      const search = params?.search ?? "";
      const limit = 10;
      const offset = (page - 1) * limit;

      try {
        const result = await triggerGetMenus({
          limit,
          offset,
          search,
        }).unwrap();

        // Normalise common shapes:
        // 1) if API returns array -> result is array
        // 2) if API returns { data: [...], total: n } -> use that
        // 3) if API returns { items: [...], total: n } -> use that
        let items: MenuItem[] = [];
        let total = 0;

        if (Array.isArray(result)) {
          items = result;
          total = result.length;
        } else if (result?.data && Array.isArray(result.data)) {
          items = result.data;
          total = result.total ?? result.data.length;
        } else if (result?.items && Array.isArray(result.items)) {
          items = result.items;
          total = result.total ?? result.items.length;
        } else if (result?.result && Array.isArray(result.result)) {
          // fallback shape
          items = result.result;
          total = result.total ?? items.length;
        } else {
          // unexpected shape, attempt to treat result as array
          items = Array.isArray(result) ? result : [];
          total = items.length;
        }

        return { data: items, total };
      } catch (err) {
        console.error("fetchData error", err);
        return { data: [], total: 0 };
      }
    },
    [triggerGetMenus]
  );

  const handleOpenAdd = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleEdit = (menu: MenuItem) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: Partial<MenuItem>) => {
    try {
      if (editingMenu && editingMenu.id) {
        // Update
        await updateMenu({ id: editingMenu.id, body: payload }).unwrap();
      } else {
        // Create
        await addMenu(payload).unwrap();
      }
      setIsModalOpen(false);
      setEditingMenu(null);
      // No explicit refetch required: RTK Query invalidates list tag so next DataTable fetch will get fresh data
    } catch (err) {
      console.error("Save failed:", err);
      throw err; // rethrow so modal can show errors if you want
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMenu) return;
    try {
      await deleteMenu(deletingMenu.id).unwrap();
      setDeletingMenu(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Menu Name", accessor: "name" },
    { label: "Path / URL", accessor: "url" },
    { label: "Description", accessor: "description" },
  ];

  // const actions = [
  //   { label: "Edit", onClick: (row: MenuItem) => handleEdit(row) },
  //   { label: "Delete", onClick: (row: MenuItem) => setDeletingMenu(row) },
  // ];

  // const Action = [
  //   {
  //     label: "Edit", // your DataTable probably styles this automatically
  //     onClick: (row: Menu) => {
  //       handleEdit(row);
  //       setIsModalOpen(true);
  //     },
  //   },
  //   {
  //     label: "Delete",
  //     onClick: (row: Menu) => {
  //       setDeletingMenu(row);
  //     },
  //   },
  // ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Menu Management</h1>
        <Button
          title="Add Menu"
          type="button"
          onClick={handleOpenAdd}
          buttonType="primary"
        />
      </div>

      <DataTable
        fetchData={fetchData}
        columns={columns}
        actions={[
          {
            label: "Edit",
            onClick: (row: MenuItem): void => {
              handleEdit(row);
              setIsModalOpen(true);
            },
          },
          {
            label: "Delete",
            onClick: (row: MenuItem): void => {
              setDeletingMenu(row);
            },
          },
        ]}
        loading={false}
        isNavigate
        isSearch
        isExport
        hasCheckbox
        onSelectedRows={(rows) => console.log("Selected Rows:", rows)}
      />

      {isModalOpen && (
        <AddMenuModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingMenu(null);
          }}
          onAdd={handleSave}
          editMenu={editingMenu}
        />
      )}

      {deletingMenu && (
        <ConfirmDeleteModal
          menuName={deletingMenu.name}
          onClose={() => setDeletingMenu(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default MenuManagement;
