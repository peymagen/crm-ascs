import React, { useState, useCallback, useMemo } from "react";
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

export interface MenuItem {
  id: number;
  name: string;
  url?: string | null;
  other_url?: string | null;
  target?: string;
  description?: string | null;
  position?: number;
  sorting_order?: number;
  lang?: string;
  [key: string]: any;
}

const MenuManagement: React.FC = () => {
  const [triggerGetMenus, { isFetching }] = useLazyGetMenusQuery();
  const [addMenu] = useAddMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<MenuItem | null>(null);

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

        return {
          data: result.data,
          total: result.total,
        };
      } catch (error) {
        console.error("fetchData error:", error);
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
      if (editingMenu?.id) {
        await updateMenu({ id: editingMenu.id, body: payload }).unwrap();
      } else {
        await addMenu(payload).unwrap();
      }
      setIsModalOpen(false);
      setEditingMenu(null);
    } catch (error) {
      console.error("Save failed:", error);
      throw error;
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMenu) return;

    try {
      await deleteMenu(deletingMenu.id).unwrap();
      setDeletingMenu(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = useMemo(
    () => [
      { label: "ID", accessor: "id" },
      { label: "Menu Name", accessor: "name" },
      { label: "Path / URL", accessor: "url" },
      { label: "Description", accessor: "description" },
    ],
    []
  );

  const actions = useMemo(
    () => [
      { label: "Edit", onClick: (row: MenuItem) => handleEdit(row) },
      { label: "Delete", onClick: (row: MenuItem) => setDeletingMenu(row) },
    ],
    []
  );

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
        actions={actions}
        loading={isFetching}
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
          editMenu={editingMenu}
          onSave={handleSave}
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
