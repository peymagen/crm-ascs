import React, { useState, useCallback } from "react";
import { DataTable } from "../../../components/DataTable";
import Manipulate from "./Manipulate";
import Button from "../../../components/Button";
import styles from "./GalleryCategory.module.css";
import ConfirmDelete from "./ConfirmDelete";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  useGetGalleryCategoriesQuery,
  useAddGalleryCategoryMutation,
  useUpdateGalleryCategoryMutation,
  useDeleteGalleryCategoryMutation,
} from "../../../store/services/galleryCategory.api";

type ModalData = { mode: "add" } | { mode: "edit"; category: IGalleryCategory };

const GalleryCategory: React.FC = () => {
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [targetToDelete, setTargetToDelete] = useState<IGalleryCategory | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

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

  const isMutating = isAdding || isUpdating || isDeleting;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const handleSave = useCallback(
    async (data: Omit<IGalleryCategory, "id"> & { id?: number }) => {
      try {
        if (data.id != null) {
          await updateCategory({
            id: data.id,
            body: { title: data.title, description: data.description },
          }).unwrap();
          toast.success(`Category "${data.title}" updated successfully`);
        } else {
          await addCategory({
            title: data.title,
            description: data.description,
          }).unwrap();
          toast.success(`Category "${data.title}" added successfully`);
        }
        setModalData(null);
        await refetch();
      } catch (error) {
        console.error("Failed to save category:", error);
        toast.error("Something went wrong while saving the category");
      }
    },
    [addCategory, updateCategory, refetch]
  );

  const handleDeleteConfirm = useCallback(async () => {
    if (!targetToDelete) return;
    try {
      await deleteCategory(targetToDelete.id ?? 0).unwrap();
      toast.success(`Category "${targetToDelete.title}" deleted successfully`);
      setTargetToDelete(null);
      await refetch();
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast.error("Failed to delete category");
    }
  }, [targetToDelete, deleteCategory, refetch]);

  const actions = [
    {
      label: "✏️",
      onClick: (row: { [x: string]: unknown }) =>
        setModalData({
          mode: "edit",
          category: row as unknown as IGalleryCategory,
        }),
    },
    {
      label: "🗑️",
      onClick: (row: { [x: string]: unknown }) =>
        setTargetToDelete(row as unknown as IGalleryCategory),
    },
  ];

  const fetchData = useCallback(
    async (params?: { page?: number; search?: string }) => {
      const newPage = params?.page ?? page;
      const newSearch = params?.search ?? search;
      setPage(newPage);
      setSearch(newSearch);

      return {
        data:
          queryData?.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description ?? "",
          })) || [],
        total: queryData?.total || 0,
      };
    },
    [queryData, page, search]
  );

  return (
    <div className={styles.container}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className={styles.formContainer}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Gallery Categories</h1>
          <Button
            title="+ Add Category"
            buttonType="primaryFill"
            onClick={() => setModalData({ mode: "add" })}
            disabled={isMutating}
          />
        </div>

        <DataTable
          fetchData={fetchData}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Title", accessor: "title" },
          ]}
          actions={actions}
          loading={isLoading || isMutating}
          isNavigate
          isSearch
          isExport
        />

        {modalData && (
          <Manipulate
            mode={modalData.mode}
            category={
              modalData.mode === "edit" ? modalData.category : undefined
            }
            onSave={handleSave}
            onClose={() => setModalData(null)}
            isLoading={isMutating}
          />
        )}

        {targetToDelete && (
          <ConfirmDelete
            title="Confirm Delete"
            message={`Are you sure you want to delete "${targetToDelete.title}"?`}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setTargetToDelete(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

export default GalleryCategory;
