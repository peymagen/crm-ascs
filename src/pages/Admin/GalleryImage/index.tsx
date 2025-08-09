import React, { useState } from "react";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import Manipulate from "./Manipulate";
import ConfirmDelete from "./ConfirmDelete";
import styles from "./GalleryImageManagement.module.css";

export interface GalleryImageItem {
  id: number;
  ref_id: number;
  image: string;
  category: string; // Added category field
}

const initialData: GalleryImageItem[] = [
  {
    id: 1,
    ref_id: 101,
    image: "https://via.placeholder.com/150?text=Image+1",
    category: "nature",
  },
  {
    id: 2,
    ref_id: 102,
    image: "https://via.placeholder.com/150?text=Image+2",
    category: "people",
  },
];

// Helper to truncate long URLs
const truncateText = (text: string, maxLength = 25) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

const GalleryImageManagement: React.FC = () => {
  const [images, setImages] = useState<GalleryImageItem[]>(initialData);
  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    imageData?: GalleryImageItem;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryImageItem | null>(
    null
  );

  const fetchData = async (params?: {
    page: number;
    search?: string;
  }): Promise<{ data: GalleryImageItem[]; total: number }> => {
    const page = params?.page ?? 1;
    const search = (params?.search ?? "").toLowerCase();
    const limit = 10;

    const sorted = [...images].sort((a, b) => a.id - b.id);
    const filtered = search
      ? sorted.filter(
          (img) =>
            img.ref_id.toString().includes(search) ||
            img.image.toLowerCase().includes(search) ||
            img.category.toLowerCase().includes(search) // filter by category too
        )
      : sorted;

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    // Truncate the image string for display only (don't modify original)
    const truncatedData = paginated.map((img) => ({
      ...img,
      image: truncateText(img.image, 30),
    }));

    return { data: truncatedData, total: filtered.length };
  };

  const handleSave = (data: Omit<GalleryImageItem, "id"> & { id?: number }) => {
    if (data.id != null) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === data.id
            ? {
                ...img,
                ref_id: data.ref_id,
                image: data.image,
                category: data.category ?? img.category,
              }
            : img
        )
      );
    } else {
      const nextId = images.length
        ? Math.max(...images.map((i) => i.id)) + 1
        : 1;
      setImages((prev) => [
        ...prev,
        {
          id: nextId,
          ref_id: data.ref_id,
          image: data.image,
          category: data.category ?? "",
        },
      ]);
    }
    setModalData(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setImages((prev) => prev.filter((img) => img.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  const actions = [
    {
      label: "Edit",
      onClick: (row: GalleryImageItem) => {
        setModalData({ mode: "edit", imageData: row });
      },
    },
    {
      label: "Delete",
      onClick: (row: GalleryImageItem) => {
        setDeleteTarget(row);
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery Images</h1>
        <Button
          title="+ Add Image"
          buttonType="primary"
          onClick={() => setModalData({ mode: "add" })}
        />
      </div>

      <div className={styles.tableWrapper}>
        <DataTable
          fetchData={fetchData}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Reference ID", accessor: "ref_id" },
            { label: "Category", accessor: "category" }, // new category column
            { label: "Image URL", accessor: "image" },
          ]}
          actions={actions}
          loading={false}
          isNavigate
          isSearch
          isExport
          hasCheckbox
          onSelectedRows={(rows) => console.log("Selected Rows:", rows)}
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
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default GalleryImageManagement;
