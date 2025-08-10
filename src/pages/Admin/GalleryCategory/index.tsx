import React, { useState, useCallback } from "react";
import { DataTable } from "../../../components/DataTable";
import Manipulate from "./Manipulate";
import Button from "../../../components/Button";
import styles from "./GalleryCategory.module.css";
import ConfirmDelete from "./ConfirmDelete";

import {
  useGetGalleryCategoriesQuery,
  useAddGalleryCategoryMutation,
  useUpdateGalleryCategoryMutation,
  useDeleteGalleryCategoryMutation,
} from "../../../store/services/galleryCategory.api"; // adjust path as needed

export interface GalleryCategoryItem {
  id: number;
  title: string;
  description: string;
}

const GalleryCategory: React.FC = () => {
  // Modal state for add/edit
  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    category?: GalleryCategoryItem;
  } | null>(null);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<GalleryCategoryItem | null>(
    null
  );

  // Pagination and search state
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // API hooks
  const {
    data: queryData,
    isLoading,
    refetch,
  } = useGetGalleryCategoriesQuery({
    limit: 10,
    offset: (page - 1) * 10,
    search,
  });

  const [addCategory, { isLoading: isAdding }] =
    useAddGalleryCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateGalleryCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteGalleryCategoryMutation();

  // Data for DataTable
  const categories = queryData?.data ?? [];
  const total = queryData?.total ?? 0;

  // Handle save from modal (add or edit)
  const handleSave = async (
    data: Omit<GalleryCategoryItem, "id"> & { id?: number }
  ) => {
    try {
      if (data.id != null) {
        await updateCategory({
          id: data.id,
          body: { title: data.title, description: data.description },
        }).unwrap();
      } else {
        await addCategory({
          title: data.title,
          description: data.description,
        }).unwrap();
      }
      setModalData(null);
      refetch(); // Refresh data after mutation
    } catch (error) {
      console.error("Failed to save category:", error);
      // Handle error UI here if needed
    }
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteCategory(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      refetch(); // Refresh after deletion
    } catch (error) {
      console.error("Failed to delete category:", error);
      // Handle error UI here if needed
    }
  };

  // Actions for each row in the DataTable
  const actions = [
    {
      label: "Edit",
      onClick: (row: GalleryCategoryItem) => {
        setModalData({ mode: "edit", category: row });
      },
    },
    {
      label: "Delete",
      onClick: (row: GalleryCategoryItem) => {
        setDeleteTarget(row);
      },
    },
  ];

  // Handle page change
  const onPageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle search input from DataTable
  const onSearchChange = useCallback((searchValue: string) => {
    setSearch(searchValue);
    setPage(1); // reset to first page on new search
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery Categories</h1>
        <Button
          title="+ Add Category"
          buttonType="primary"
          onClick={() => setModalData({ mode: "add" })}
          disabled={isAdding || isUpdating || isDeleting}
        />
      </div>

      <div className={styles.tableWrapper}>
        <DataTable
          fetchData={async ({ page: p, search: s }) => {
            // We rely on RTK Query, so just return current data and total here
            return { data: categories, total };
          }}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Title", accessor: "title" },
            { label: "Description", accessor: "description" },
          ]}
          actions={actions}
          loading={isLoading || isAdding || isUpdating || isDeleting}
          isNavigate
          isSearch
          isExport
          hasCheckbox
          onSelectedRows={(rows) => console.log("Selected Rows:", rows)}
          page={page}
          onPageChange={onPageChange}
          onSearchChange={onSearchChange}
          totalRecords={total}
          pageSize={10}
        />
      </div>

      {modalData && (
        <Manipulate
          mode={modalData.mode}
          category={modalData.category}
          onSave={handleSave}
          onClose={() => setModalData(null)}
          // isSaving={isAdding || isUpdating}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          title="Confirm Delete"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          // isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default GalleryCategory;
