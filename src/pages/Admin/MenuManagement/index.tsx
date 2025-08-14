import React, { useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import { DataTable } from "../../../components/DataTable";
import AddMenuModal from "./AddMenu/AddMenuModal";
import ConfirmDeleteModal from "./ConfirmDelete/ConfirmDeleteModal";
import Button from "../../../components/Button";

import {
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useLazyGetMenusQuery,
} from "../../../store/services/menu.api";

import styles from "./MenuManagement.module.css";

const MenuManagement: React.FC = () => {
  /** Pagination & search state */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  /** API hooks */
  const [triggerGetMenus, { isLoading }] = useLazyGetMenusQuery();
  const [addMenu] = useAddMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const [deleteMenu] = useDeleteMenuMutation();

  /** Modal & editing/deleting state */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"ADD" | "EDIT">("ADD");
  const [editingMenu, setEditingMenu] = useState<IMainMenu | null>(null);
  const [deletingMenu, setDeletingMenu] = useState<IMainMenu | null>(null);

  /** Fetch table data */
  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const currentPage = params?.page || 1;
      const currentSearch = params?.search || "";

      setPage(currentPage);
      setSearch(currentSearch);

      const res = await triggerGetMenus({
        limit,
        offset: (currentPage - 1) * limit,
        search: currentSearch,
      }).unwrap();

      return {
        data: res?.data || [],
        total: res?.total || 0,
      };
    },
    [triggerGetMenus]
  );

  /** Handlers */
  const handleOpenAdd = () => {
    setMode("ADD");
    setEditingMenu(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (menu: IMainMenu) => {
    setMode("EDIT");
    setEditingMenu(menu);
    setIsModalOpen(true);
  };

  const handleSave = async (payload: Partial<IMainMenu>) => {
    try {
      if (mode === "ADD") {
        await addMenu(payload).unwrap();
        toast.success("Main menu item created successfully");
      } else if (mode === "EDIT" && editingMenu?.id) {
        await updateMenu({ id: editingMenu.id, body: payload }).unwrap();
        toast.success("Menu item updated successfully");
      }

      await fetchData({ page, search });
      setIsModalOpen(false);
      setEditingMenu(null);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error(
        `Failed to ${mode === "ADD" ? "create" : "update"} menu item`
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingMenu) return;

    try {
      await deleteMenu(deletingMenu.id).unwrap();
      toast.success("Menu item deleted successfully");
      await fetchData({ page, search });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete menu item");
    } finally {
      setDeletingMenu(null);
    }
  };

  /** Table configuration */
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
      { label: "Edit", onClick: (row: IMainMenu) => handleOpenEdit(row) },
      { label: "Delete", onClick: (row: IMainMenu) => setDeletingMenu(row) },
    ],
    []
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Main Menu Management</h1>
        <Button
          title="+ Add Main Menu"
          type="button"
          onClick={handleOpenAdd}
          buttonType="primary"
        />
      </div>

      {/* Data Table */}
      <DataTable
        fetchData={fetchData}
        columns={columns}
        actions={actions}
        loading={isLoading}
        isNavigate
        isSearch
        isExport
      />

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <AddMenuModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingMenu(null);
          }}
          editMenu={editingMenu}
          onSave={handleSave}
          mode={mode}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
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
