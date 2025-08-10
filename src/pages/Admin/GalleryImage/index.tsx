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

export interface GalleryImageItem {
  id: number;
  ref_id: number;
  image: string;
}

const GalleryImageManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    imageData?: GalleryImageItem;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<GalleryImageItem | null>(
    null
  );

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
  const total = queryData?.total ?? 0;

  const handleSave = async (formData: {
    id?: number;
    ref_id: number;
    image: string;
  }) => {
    try {
      if (formData.id != null) {
        await updateImage({ id: formData.id, body: formData }).unwrap();
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

  const onPageChange = (newPage: number) => setPage(newPage);
  const onSearchChange = useCallback((searchValue: string) => {
    setSearch(searchValue);
    setPage(1);
  }, []);

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

      <div className={styles.tableWrapper}>
        <DataTable
          fetchData={async () => ({ data: images, total })}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Reference ID", accessor: "ref_id" },
            { label: "Image URL", accessor: "image" },
          ]}
          actions={[
            {
              label: "Edit",
              onClick: (row: GalleryImageItem) =>
                setModalData({ mode: "edit", imageData: row }),
            },
            {
              label: "Delete",
              onClick: (row: GalleryImageItem) => setDeleteTarget(row),
            },
          ]}
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
