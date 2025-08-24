import React, { useCallback, useState } from "react";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import styles from "./listpage.module.css";
import { motion } from "framer-motion";
import DeleteDialog from "./DeleteDialog";
import ManipulateListPage from "./manipulate";
import {
  useGetListpageQuery,
  useCreateListpageMutation,
  useUpdateListpageMutation,
  useDeleteListpageMutation,
} from "../../../store/services/listpage.api";
import { toast } from "react-toastify";

const ListPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE">("ADD");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<IPage>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 10;
  const offset = (page - 1) * limit;
  // API hooks
  const {
    data: listpageData,
    isLoading: isDataLoading,
    refetch,
  } = useGetListpageQuery({ limit, offset, search });
  const [createListpage] = useCreateListpageMutation();
  const [updateListpage] = useUpdateListpageMutation();
  const [deleteListpage] = useDeleteListpageMutation();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };
  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const page = params?.page || 1;
      const search = params?.search || "";
      setPage(page);
      setSearch(search);
      return {
        data: listpageData?.data || [],
        total: listpageData?.total || 0,
      };
    },
    [listpageData]
  );

  const handleAdd = () => {
    setMode("ADD");
    setIsOpen(true);
    setDefaultValues({});
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedId(null);
    setDefaultValues({});
  };

  const handleSubmit = async (formData: IPage) => {
    setIsLoading(true);
    try {
      if (mode === "ADD") {
        await createListpage(formData).unwrap();
        toast.success("Page created successfully!");
      } else if (mode === "EDIT" && selectedId) {
        formData.append("id", selectedId.toString());
        await updateListpage(formData).unwrap();
        toast.success("Page updated successfully!");
      }
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred!");
    }
    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    setIsLoading(true);
    try {
      await deleteListpage({ id: selectedId }).unwrap();
      toast.success("Page deleted successfully!");
      refetch();
      handleClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred!");
    }
    setIsLoading(false);
  };

  const columns = [
    { label: "Title", accessor: "title" },
    { label: "Slug", accessor: "slug" },
    { label: "Meta Title", accessor: "metaTitle" },
    { label: "Published", accessor: "publishDate" },
    { label: "Image", accessor: "image" },
  ];

  return (
    <div className={styles.main}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className={styles.formContainer}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Page Management</h1>
          <Button
            type="button"
            isLoading={isLoading}
            buttonType="primary"
            title="+ Add New"
            onClick={handleAdd}
          />
        </div>

        <DataTable
          fetchData={fetchData}
          columns={columns}
          actions={[
            {
              label: "✏️",
              onClick: (row: { [x: string]: unknown }) => {
                setDefaultValues(row);
                setIsOpen(true);
                setSelectedId(Number(row.id));
                setMode("EDIT");
              },
            },
            {
              label: "🗑️",
              onClick: (row: { [x: string]: unknown }) => {
                setMode("DELETE");
                setSelectedId(Number(row.id));
                setIsOpen(true);
              },
            },
          ]}
          isSearch={true}
          isExport={true}
          loading={isDataLoading}
        />

        {mode !== "DELETE" ? (
          <ManipulateListPage
            isOpen={isOpen}
            onClose={handleClose}
            onSubmit={handleSubmit} // Pass the function directly
            mode={mode}
            defaultValues={defaultValues}
            isLoading={isLoading}
          />
        ) : (
          <DeleteDialog
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={handleConfirmDelete}
            isLoading={isLoading}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ListPage;
