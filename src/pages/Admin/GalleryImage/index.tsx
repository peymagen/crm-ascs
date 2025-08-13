import React, { useState, useCallback } from "react";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import Manipulate from "./Manipulate";
import ConfirmDelete from "./ConfirmDelete";
import styles from "./GalleryImageManagement.module.css";

import {
  useGetGalleryImagesQuery,
  useAddGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
} from "../../../store/services/galleryImage.api";

export interface GalleryImage {
  id: number;
  ref_id: number;
  image: string; // stored path or URL
}

const GalleryImageManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    imageData?: GalleryImage;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);

  // Fetch gallery images
  const {
    data: queryData,
    isLoading,
    refetch,
  } = useGetGalleryImagesQuery({
    limit: 10,
    offset: (page - 1) * 10,
    search,
  });

  const [addImage, { isLoading: isAdding }] = useAddGalleryImageMutation();
  const [updateImage, { isLoading: isUpdating }] =
    useUpdateGalleryImageMutation();
  const [deleteImage, { isLoading: isDeleting }] =
    useDeleteGalleryImageMutation();

  const images = queryData?.data ?? [];

  console.log(images);
  const total = queryData?.total ?? 0;

  const handleSave = async (formData: FormData & { id?: number }) => {
    try {
      if (formData.id != null) {
        // id comes from formData appended as string, convert to number
        const id = Number(formData.get("id"));
        await updateImage({ id, body: formData }).unwrap();
      } else {
        await addImage(formData).unwrap();
      }
      setModalData(null);
      refetch();
    } catch (error) {
      console.error("Failed to save image:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage(deleteTarget.id).unwrap();
      setDeleteTarget(null);
      refetch();
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const page = params?.page || 1;
      const search = params?.search || "";
      setPage(page);
      setSearch(search);
      return {
        data: queryData?.data || [],
        total: queryData?.total || 0,
      };
    },
    [queryData]
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery Images</h1>
        <Button
          title="+ Add Image"
          buttonType="primary"
          onClick={() => setModalData({ mode: "add" })}
          disabled={isAdding || isUpdating || isDeleting}
        />
      </div>

      <DataTable
        fetchData={fetchData}
        columns={[
          { label: "ID", accessor: "id" },
          { label: "Image URL", accessor: "image" },
          { label: "Reference ID", accessor: "ref_id" },
        ]}
        actions={[
          {
            label: "Edit",
            onClick: (row: GalleryImage) =>
              setModalData({ mode: "edit", imageData: row }),
          },
          {
            label: "Delete",
            onClick: (row: GalleryImage) => setDeleteTarget(row),
          },
        ]}
        loading={isLoading || isAdding || isUpdating || isDeleting}
        isNavigate
        isSearch
        isExport
      />

      {modalData && (
        <Manipulate
          mode={modalData.mode}
          imageData={modalData.imageData}
          onSave={handleSave}
          onClose={() => setModalData(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          title="Confirm Delete"
          message={`Are you sure you want to delete image #${deleteTarget.id}?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default GalleryImageManagement;
