import React, { useState, useCallback, useMemo } from "react";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import Manipulate from "./Manipulate";
import ConfirmDelete from "./ConfirmDelete";
import styles from "./GalleryImageManagement.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useGetGalleryImagesQuery,
  useAddGalleryImageMutation,
  useUpdateGalleryImageMutation,
  useDeleteGalleryImageMutation,
} from "../../../store/services/galleryImage.api";

const GalleryImageManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    imageData?: IGalleryImage;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IGalleryImage | null>(null);

  const {
    data: queryData,
    isLoading,
    isFetching,
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

  const handleSave = async (formData: FormData) => {
    try {
      const idValue = formData.get("id");
      if (idValue) {
        await updateImage({ id: Number(idValue), body: formData }).unwrap();
        toast.success("Image updated successfully!");
      } else {
        await addImage(formData).unwrap();
        toast.success("Image added successfully!");
      }
      setModalData(null);
      await refetch();
    } catch (error) {
      console.error("Failed to save image:", error);
      toast.error("Something went wrong while saving the image");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage(deleteTarget?.id ?? 0).unwrap();
      toast.success("Image deleted successfully!");
      setDeleteTarget(null);
      await refetch();
    } catch (error) {
      console.error("Failed to delete image:", error);
      toast.error("Failed to delete image. Please try again.");
    }
  };

  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const newPage = params?.page || 1;
      const newSearch = params?.search || "";
      setPage(newPage);
      setSearch(newSearch);

      return {
        data:
          queryData?.data.map((item) => ({
            id: item.id,
            ref_id: item.ref_id,
            title: item.title ?? "",
            image: typeof item.image === "string" ? item.image : "",
          })) || [],
        total: queryData?.total ?? 0,
      };
    },
    [queryData]
  );

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { label: "Title", accessor: "title" },
      { label: "Image", accessor: "image" },
    ],
    []
  );

  // Memoize actions to prevent unnecessary re-renders
  const actions = useMemo(
    () => [
      {
        label: "✏️",
        onClick: (row: { [x: string]: unknown }) =>
          setModalData({
            mode: "edit",
            imageData: row as unknown as IGalleryImage,
          }),
      },
      {
        label: "🗑️",
        onClick: (row: { [x: string]: unknown }) =>
          setDeleteTarget(row as unknown as IGalleryImage),
      },
    ],
    []
  );

  const isLoadingState =
    isLoading || isAdding || isUpdating || isDeleting || isFetching;
  console.log(columns);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery Images</h1>
        <Button
          title="+ Add Image"
          buttonType="primary"
          onClick={() => setModalData({ mode: "add" })}
          disabled={isLoadingState}
        />
      </div>

      <DataTable
        fetchData={fetchData}
        columns={columns}
        actions={actions}
        loading={isLoadingState}
        isNavigate
        isSearch
        isExport
      />

      {modalData && (
        <Manipulate
          isOpen={!!modalData}
          onClose={() => setModalData(null)}
          onSubmit={handleSave}
          mode={modalData.mode === "add" ? "ADD" : "EDIT"}
          defaultValues={modalData.imageData || {}}
          isLoading={isAdding || isUpdating}
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
