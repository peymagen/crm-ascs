import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./submenu.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone No. is required"),
  description: yup.string().required("Description is required"),
});

interface AddTelephonic {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<ITelephonic>;
  mode: "ADD" | "EDIT" | "DELETE";
  onSubmitHandler: (data: ITelephonic) => void;
  isLoading?: boolean;
}

const AddTelephonic: React.FC<AddTelephonic> = ({
  isOpen,
  onClose,
  defaultValues = {},
  mode,
  onSubmitHandler,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        email: "",
        phone: "",
        description: "",
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: ITelephonic) => {
    console.log("Form data being submitted:", data);
    onSubmitHandler(data);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <motion.div
        className={styles.modalContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {mode === "ADD" ? "Add Telephone" : "Edit Telephone"}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>Dashboard</span>
          <span> / </span>
          <span className={styles.breadcrumbLink}>telephone</span>
          <span> / </span>
          <span className={styles.breadcrumbCurrent}>
            {mode === "ADD" ? "Add Telephone" : "Edit Telephone"}
          </span>
        </div>

        <form className={styles.formGrid} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              label="Name"
              name="name"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Name"
            />
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              errors={errors}
              required
              placeholder="Enter email"
            />
          </div>

          <div>
            <Input
              label="Phone"
              name="phone"
              type="number"
              register={register}
              errors={errors}
              required
              placeholder="Enter Phone"
            />
          </div>

          <div className={styles.fullSpan}>
            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
              placeholder="Enter Description"
              rows={3}
            />
          </div>

          <div className={styles.fullSpan}>
            <div className={styles.formActions}>
              <Button
                type="button"
                onClick={onClose}
                buttonType="secondary"
                title="Cancel"
                disabled={isLoading}
              />
              <Button
                type="submit"
                buttonType="primary"
                title={mode === "ADD" ? "Add Telephone" : "Update Telephone"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTelephonic;
