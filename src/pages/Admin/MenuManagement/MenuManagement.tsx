import { useEffect, useState } from "react";
import { DataTable } from "../../../components/DataTable";
import AddMenuModal from "../Modals/AddMenu/AddMenuModal";
import ConfirmDeleteModal from "../Modals/ConfirmDelete/ConfirmDeleteModal";
import "./MenuManagement.css";
import Button from "../../../components/Button";

interface Menu {
  id: number;
  name: string;
  path: string;
  description: string;
  position: number;
}

const MenuManagement = () => {
  const [menus, setMenus] = useState<Menu[]>([
    {
      id: 1,
      name: "Home",
      path: "/",
      description: "Main page of the website",
      position: 1,
    },
    {
      id: 2,
      name: "About Us",
      path: "/about",
      description: "Learn about our company",
      position: 2,
    },
    {
      id: 3,
      name: "Services",
      path: "/services",
      description: "List of services we offer",
      position: 3,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMenu, setEditMenu] = useState<Menu | null>(null);
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);

  const handleAddOrUpdateMenu = (menu: Omit<Menu, "id">) => {
    if (editMenu) {
      // Update
      setMenus((prev) =>
        [...prev].map((m) =>
          m.id === editMenu.id ? { ...editMenu, ...menu } : m
        )
      );
    } else {
      // Add
      setMenus((prev) => [...prev, { id: Date.now(), ...menu }]);
    }

    setEditMenu(null);
    setIsModalOpen(false);
  };

  const fetchData = async (params?: {
    page: number;
    search?: string;
  }): Promise<{ data: Menu[]; total: number }> => {
    const page = params?.page ?? 1;
    const search = params?.search?.toLowerCase() ?? "";
    const limit = 10;

    const sortedMenus = [...menus].sort((a, b) => a.position - b.position);

    const filteredMenus = sortedMenus.filter((menu) =>
      menu.name.toLowerCase().includes(search)
    );

    const startIndex = (page - 1) * limit;
    const paginatedData = filteredMenus.slice(startIndex, startIndex + limit);

    return {
      data: paginatedData,
      total: filteredMenus.length,
    };
  };

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Menu Name", accessor: "name" },
    { label: "Path", accessor: "path" },
    { label: "Description", accessor: "description" },
  ];
  const actions = [
    {
      label: "Edit",
      onClick: (menu: Menu) => {
        setEditMenu(menu); // Set the menu to be edited
        setIsModalOpen(true); // Open modal with edit data
      },
    },
    {
      label: "Delete",
      onClick: (menu: Menu) => {
        setMenuToDelete(menu); // Show confirmation modal
      },
    },
  ];

  useEffect(() => {
    fetchData();
  }, [menus]);

  return (
    <div className="menu-management-container">
      <div className="menu-management-header">
        <h1 className="title">Menu Management</h1>
        <Button
          title="Add Menu"
          onClick={() => {
            setEditMenu(null);
            setIsModalOpen(true);
          }}
          buttonType="primary"
        />
      </div>

      <DataTable
        fetchData={fetchData}
        columns={columns}
        actions={actions}
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
            setEditMenu(null);
          }}
          onAdd={handleAddOrUpdateMenu}
          editMenu={editMenu}
        />
      )}

      {menuToDelete && (
        <ConfirmDeleteModal
          menuName={menuToDelete.name}
          onClose={() => setMenuToDelete(null)}
          onConfirm={() => {
            setMenus((prev) =>
              prev.filter((menu) => menu.id !== menuToDelete.id)
            );
            setMenuToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default MenuManagement;
