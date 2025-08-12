import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import styles from "./listpage.module.css";
import Textarea from "../../../components/Textarea";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  status: yup.string().required('Status is required'),
});

interface FormData {
  title: string;
  content: string;
  status: string;
}

interface ManipulateListPageProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  mode: "ADD" | "EDIT";
  defaultValues: Partial<any>;
  isLoading: boolean;
}

const ManipulateListPage: React.FC<ManipulateListPageProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  defaultValues,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues
  });

  React.useEffect(() => {
    if (isOpen) {
      reset(defaultValues);
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmitForm = (data: FormData) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={styles.dialogContent}
      >
        <h2>{mode === "ADD" ? "Add New Page" : "Edit Page"}</h2>
        <form onSubmit={handleSubmit(onSubmitForm)} className={styles.formGrid}>
          <div className={styles.formGroup}>
            <Input
              label="Title"
              name="title"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <Textarea
              label="Content"
              name="content"
              register={register}
              errors={errors}
              required
              rows={5}
            />
          </div>
          <div className={styles.formGroup}>
            <Input
              label="Status"
              name="status"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className={styles.dialogActions}>
            <Button 
              onClick={onClose} 
              buttonType="secondary" 
              title="Cancel"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              buttonType="primary"
              title={mode === "ADD" ? "Create" : "Update"}
              isLoading={isLoading}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ManipulateListPage;
