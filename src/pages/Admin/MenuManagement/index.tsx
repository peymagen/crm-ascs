import React, { useState, useCallback, useMemo } from "react";
import { DataTable } from "../../../components/DataTable";
import AddMenuModal from "./AddMenu/AddMenuModal";
import ConfirmDeleteModal from "./ConfirmDelete/ConfirmDeleteModal";
import Button from "../../../components/Button";

import {
  useUpdateMainMenuMutation,
  useDeleteMainMenuMutation,
  useGetMainMenuQuery,
  useCreateMainMenuMutation,
} from "../../../store/services/mainMenu.api";

import styles from "./MenuManagement.module.css";

const MenuManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 10;
  const offset = (page - 1) * limit;

  const { data, isLoading, refetch } = useGetMainMenuQuery({
    limit,
    offset,
    search,
  });

  const [addMenu] = useCreateMainMenuMutation();
  const [updateMenu] = useUpdateMainMenuMutation();
  const [deleteMenu] = useDeleteMainMenuMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<IMainMenu | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<IMainMenu | null>(null);

  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const page = params?.page || 1;
      const search = params?.search || "";
      setPage(page);
      setSearch(search);
      return {
        data: data?.data || [],
        total: data?.total || 0,
      };
    },
    [data]
  );

  const handleOpenAdd = () => {
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleEdit = (menu: IMainMenu) => {
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: Partial<IMainMenu>) => {
    try {
      if (editingMenu?.id) {
        await updateMenu({ id: editingMenu.id, body: payload }).unwrap();
      } else {
        await addMenu(payload).unwrap();
      }
      refetch();
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
      refetch();
      setDeletingMenu(null);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const columns = useMemo(
    () => [
      { label: "Menu Name", accessor: "name" },
      { label: "Path / URL", accessor: "url" },
      { label: "Target", accessor: "target" },
      { label: "Order", accessor: "sorting_order" },
    ],
    []
  );

  const actions = useMemo(
    () => [
      { label: "Edit", onClick: (row) => handleEdit(row) },
      { label: "Delete", onClick: (row) => setDeletingMenu(row) },
    ],
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Main Menu Management</h1>
        <Button
          title="+ Add New Menu"
          type="button"
          onClick={handleOpenAdd}
          buttonType="primary"
        />
      </div>

      <DataTable
        fetchData={fetchData}
        columns={columns}
        actions={actions}
        loading={isLoading}
        isNavigate
        isSearch
        isExport
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
