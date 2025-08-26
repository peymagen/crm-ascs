import React, { useCallback, useState } from "react";
import AddOtherPortal from "./manipulate";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import styles from "./otherpage.module.css";
import { motion } from "framer-motion";
import DeleteDialog from "./DeleteDialog";
import {
  useGetPortalQuery,
  useCreatePortalMutation,
  useUpdatePortalMutation,
  useDeletePortalMutation,
} from "../../../store/services/portal.api";
import { toast } from "react-toastify";

const PortalData: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE">("ADD");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<IPortal>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 10;
  const offset = (page - 1) * limit;
  // API hooks
  const {
    data: submenuData,
    isLoading: isDataLoading,
    refetch,
  } = useGetPortalQuery({ limit, offset, search });
  const [createSlider] = useCreatePortalMutation();
  const [updateSlider] = useUpdatePortalMutation();
  const [deleteSlider] = useDeletePortalMutation();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const columns = [
    { label: "S.No.", accessor: "id" },
    { label: "Title", accessor: "title" },
    { label: "URL/Path", accessor: "url" },
    { label: "Image", accessor: "image" },
  ];

  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const page = params?.page || 1;
      const search = params?.search || "";
      setPage(page);
      setSearch(search);
      return {
        data: submenuData?.data || [],
        total: submenuData?.total || 0,
      };
    },
    [submenuData]
  );

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (selectedId) {
        await deleteSlider({ id: selectedId }).unwrap();
        toast.success("Other-portal deleted successfully");
        refetch();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete Other-portal");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  const handleSubmit = async (formData: IPortal) => {
    setIsLoading(true);
    try {
      if (mode === "ADD") {
        await createSlider(formData).unwrap();
        toast.success("Other-portal created successfully");
      } else if (mode === "EDIT") {
        if (formData instanceof FormData) {
          formData.append("id", defaultValues.id?.toString() || "");
          await updateSlider(formData).unwrap();
        } else {
          await updateSlider({ ...formData, id: defaultValues.id }).unwrap();
        }
        toast.success("Other-portal updated successfully");
      }
      refetch();
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error(
        `Failed to ${mode === "ADD" ? "create" : "update"} other-portal`
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setDefaultValues({});
    }
  };

  return (
    <div className={styles.menu}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className={styles.formContainer}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Other-Page Management</h1>
          <Button
            type="button"
            isLoading={isLoading}
            buttonType="primaryFill"
            title="+ Add Other-portal"
            onClick={() => {
              setDefaultValues({});
              setIsOpen(true);
              setMode("ADD");
            }}
          />
        </div>

        <DataTable
          fetchData={fetchData}
          columns={columns}
          actions={[
            {
              label: "✏️",
              onClick: (row: { [x: string]: unknown }) => {
                const editValues = row as unknown as IPortal;
                setDefaultValues(editValues);
                setIsOpen(true);
                setMode("EDIT");
                console.log("Edit clicked:", row);
              },
            },
            {
              label: "🗑️",
              onClick: (row: { [x: string]: unknown }) => {
                setMode("DELETE");
                setSelectedId((row as unknown as IPortal).id ?? null);
                setIsOpen(true);
                console.log("Delete clicked:", row);
              },
            },
          ]}
          isSearch={true}
          isExport={true}
          isNavigate={true}
          loading={isDataLoading}
        />
      </motion.div>

      <AddOtherPortal
        isOpen={isOpen && ["ADD", "EDIT"].includes(mode)}
        onClose={() => {
          setIsOpen(false);
          setDefaultValues({});
        }}
        defaultValues={defaultValues}
        mode={mode}
        onSubmitHandler={handleSubmit}
        isLoading={isLoading}
      />

      <DeleteDialog
        isOpen={isOpen && mode === "DELETE"}
        onClose={() => {
          setIsOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleDelete}
        isLoading={isLoading}
        title="Confirm Deletion"
        message="Are you sure you want to delete this menu item? This action cannot be undone."
      />
    </div>
  );
};

export default PortalData;
