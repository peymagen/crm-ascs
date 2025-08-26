import React, { useCallback, useState, useMemo } from "react";
import AddOpportunity from "./manipulate";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import styles from "./submenu.module.css";
import { motion } from "framer-motion";
import DeleteDialog from "./DeleteDialog";
import {
  useGetOpportunitiesQuery,
  useCreateOpportunitiesMutation,
  useUpdateOpportunitiesMutation,
  useDeleteOpportunitiesMutation,
} from "../../../store/services/opportunities.api";
import { toast } from "react-toastify";

const OpportunityData: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE">("ADD");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<IOpportunity>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const limit = 10;
  const offset = (page - 1) * limit;

  // API hooks
  const {
    data: opportunitiesData,
    isLoading: isDataLoading,
    isFetching,
    refetch,
  } = useGetOpportunitiesQuery({ limit, offset, search });

  const [createOpportunity, { isLoading: isCreating }] =
    useCreateOpportunitiesMutation();
  const [updateOpportunity, { isLoading: isUpdating }] =
    useUpdateOpportunitiesMutation();
  const [deleteOpportunity, { isLoading: isDeleting }] =
    useDeleteOpportunitiesMutation();

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => [
      { label: "ID", accessor: "id" },
      { label: "Title", accessor: "title" },
      {
        label: "File URL",
        accessor: "file_url",
        render: (value: string) =>
          value ? (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fileLink}
              title="View file"
            >
              📄 View File
            </a>
          ) : (
            <span className={styles.noFile}>No file</span>
          ),
      },
      { label: "Type", accessor: "type" },
      {
        label: "Notice",
        accessor: "notice",
        render: (value: boolean) => (
          <span className={value ? styles.noticeYes : styles.noticeNo}>
            {value ? "Yes" : "No"}
          </span>
        ),
      },
    ],
    []
  );

  // Memoize actions to prevent unnecessary re-renders
  const actions = useMemo(
    () => [
      {
        label: "✏️",
        onClick: (row: { [x: string]: unknown }) => {
          setDefaultValues({
            ...row,
            notice:
              typeof row.notice === "boolean"
                ? row.notice
                  ? 1
                  : 0
                : Number(row.notice),
          });
          setIsOpen(true);
          setMode("EDIT");
        },
      },
      {
        label: "🗑️",
        onClick: (row: { [x: string]: unknown }) => {
          setMode("DELETE");
          setSelectedId(
            typeof row.id === "number" ? row.id : row.id ? Number(row.id) : null
          );
          setIsOpen(true);
        },
      },
    ],
    []
  );

  const fetchData = useCallback(
    async (params?: { page: number; search?: string }) => {
      const newPage = params?.page || 1;
      const newSearch = params?.search || "";
      setPage(newPage);
      setSearch(newSearch);

      return {
        data: opportunitiesData?.data || [],
        total: opportunitiesData?.total || 0,
      };
    },
    [opportunitiesData]
  );

  const handleDelete = async () => {
    if (!selectedId) return;

    setIsLoading(true);
    try {
      await deleteOpportunity({ id: selectedId }).unwrap();
      toast.success("Record deleted successfully");
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      const errorMessage = "Failed to delete record";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setSelectedId(null);
    }
  };

  const handleSave = async (formData: IOpportunity) => {
    setIsLoading(true);
    try {
      const idValue = formData.get("id");
      if (idValue) {
        await updateOpportunity({
          id: Number(idValue),
          body: formData,
        }).unwrap();
        toast.success("Opportunity updated successfully!");
      } else {
        await createOpportunity(formData).unwrap();
        toast.success("Opportunity created successfully!");
      }
      refetch();
    } catch (error) {
      console.error("Failed to save opportunity:", error);
      const errorMessage = "Failed to save opportunity. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setDefaultValues({});
    }
  };

  const isLoadingState =
    isDataLoading || isCreating || isUpdating || isDeleting || isFetching;

  return (
    <div className={styles.main}>
      {!isLoading && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className={styles.formContainer}
        >
          <div className={styles.header}>
            <h1 className={styles.title}>Opportunities Management</h1>
            <Button
              type="button"
              isLoading={isLoadingState}
              buttonType="primaryFill"
              title="+ Add New Opportunity"
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
            actions={actions}
            isSearch={true}
            isExport={true}
            isNavigate={true}
            loading={isLoadingState}
          />
        </motion.div>
      )}

      <AddOpportunity
        isOpen={isOpen && ["ADD", "EDIT"].includes(mode)}
        onClose={() => {
          setIsOpen(false);
          setDefaultValues({});
        }}
        defaultValues={defaultValues}
        mode={mode}
        onSubmit={handleSave}
        isLoading={isCreating || isUpdating}
      />

      <DeleteDialog
        isOpen={isOpen && mode === "DELETE"}
        onClose={() => {
          setIsOpen(false);
          setSelectedId(null);
        }}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Confirm Deletion"
        message="Are you sure you want to delete this opportunity? This action cannot be undone."
      />
    </div>
  );
};

export default OpportunityData;
