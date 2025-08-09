import React, { useState } from "react";
import { DataTable } from "../../../components/DataTable";
import Manipulate from "./Manipulate";
import Button from "../../../components/Button";
import styles from "./GalleryCategory.module.css";
import ConfirmDelete from "./ConfirmDelete";

export interface GalleryCategoryItem {
  id: number;
  title: string;
  description: string;
}

const initialData: GalleryCategoryItem[] = [
  { id: 1, title: "Nature", description: "Beautiful nature images" },
  { id: 2, title: "Architecture", description: "Buildings and structures" },
  { id: 3, title: "Wildlife", description: "Animals in the wild" },
];

const GalleryCategory: React.FC = () => {
  const [categories, setCategories] =
    useState<GalleryCategoryItem[]>(initialData);
  const [loading] = useState(false);
  const [modalData, setModalData] = useState<{
    mode: "add" | "edit";
    category?: GalleryCategoryItem;
  } | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<GalleryCategoryItem | null>(
    null
  );

  // DataTable fetch
  const fetchData = async (params?: {
    page: number;
    search?: string;
  }): Promise<{ data: GalleryCategoryItem[]; total: number }> => {
    const page = params?.page ?? 1;
    const search = (params?.search ?? "").toLowerCase();
    const limit = 10;

    const sorted = [...categories].sort((a, b) => a.id - b.id);
    const filtered = search
      ? sorted.filter((c) => c.title.toLowerCase().includes(search))
      : sorted;

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return { data: paginated, total: filtered.length };
  };

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

  const handleSave = (
    data: Omit<GalleryCategoryItem, "id"> & { id?: number }
  ) => {
    if (data.id != null) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === data.id
            ? { ...c, title: data.title, description: data.description }
            : c
        )
      );
    } else {
      const nextId = categories.length
        ? Math.max(...categories.map((c) => c.id)) + 1
        : 1;
      setCategories((prev) => [
        ...prev,
        { id: nextId, title: data.title, description: data.description },
      ]);
    }
    setModalData(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gallery Categories</h1>
        <Button
          title="+ Add Category"
          buttonType="primary"
          onClick={() => setModalData({ mode: "add" })}
        />
      </div>

      <div className={styles.tableWrapper}>
        <DataTable
          fetchData={fetchData}
          columns={[
            { label: "ID", accessor: "id" },
            { label: "Title", accessor: "title" },
            { label: "Description", accessor: "description" },
          ]}
          actions={actions}
          loading={loading}
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
          category={modalData.category}
          onSave={handleSave}
          onClose={() => setModalData(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDelete
          title="Confirm Delete"
          message={`Are you sure you want to delete "${deleteTarget.title}"?`}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default GalleryCategory;
