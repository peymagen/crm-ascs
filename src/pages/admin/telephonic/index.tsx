


import React, { useState } from "react";
import AddTelephonic from "./manipulate";
import { DataTable } from "../../../components/DataTable";
import Button from "../../../components/Button";
import styles from "./submenu.module.css";
import { motion } from "framer-motion";
import DeleteDialog from "./DeleteDialog";

interface RowData {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string;
}

const TelephonicData: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ADD" | "EDIT" | "DELETE">("ADD");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<RowData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const dummyData: RowData[] = [
    { id: 1, name: "Anand", email: "anand@.com", phone: "7890546787",  description: "i am anand " },
    { id: 2, name: "Saurav", email: "saurav@.com", phone: "7890546787",  description: "i am saurav " },
    { id: 3, name: "OM", email: "om@.com", phone: "7890546787",  description: "i am om " },
    { id: 4, name: "Satwik", email: "satwik@.com", phone: "7890546787",  description: "i am satwik " },
  ];

  const columns = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "name" },
    { label: "Email", accessor: "email" },
    { label: "Phone", accessor: "phone" },
    { label: "Description", accessor: "description" },
  ];

  const fetchData = () => {
    return new Promise<{ data: RowData[]; total: number }>((resolve) => {
      setTimeout(() => {
        resolve({
          data: dummyData,
          total: dummyData.length,
        });
      }, 500);
    });
  };

  const handleDelete = () => {
    setIsLoading(true);
    console.log("Delete confirmed for ID:", selectedId);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setSelectedId(null);
      // Here you would typically refresh the data
    }, 1000);
  };

  const handleSubmit = (formData: any) => {
    setIsLoading(true);
    console.log("Form submitted:", formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setDefaultValues({});
      // Here you would typically refresh the data
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        className={styles.formContainer}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Telephonic Management</h1>
          <Button
            type="button"
            isLoading={isLoading}
            buttonType="primary"
            title="+ Add New"
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
              onClick: (row) => {
                setDefaultValues(row as RowData);
                setIsOpen(true);
                setMode("EDIT");
                console.log("Edit clicked:", row);
              },
            },
            {
              label: "🗑️",
              onClick: (row) => {
                setMode("DELETE");
                setSelectedId((row as RowData).id);
                setIsOpen(true);
                console.log("Delete clicked:", row);
              },
            },
          ]}
          isSearch={true}
          isExport={true}
          isNavigate={true}
          loading={isLoading}
        />
      </motion.div>

      <AddTelephonic 
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
        message="Are you sure you want to delete this record? This action cannot be undone."
      />
    </div>
  );
};

export default TelephonicData;