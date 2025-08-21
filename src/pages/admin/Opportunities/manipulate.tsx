import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./submenu.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  file_url: yup
    .mixed()
    .test("fileOrString", "File is required", (value) => {
      // Allow string (existing file) or FileList (new upload)
      return typeof value === "string" || value instanceof FileList;
    })
    .required("File is required"),
  type: yup.string().required("Type is required"),
  notice: yup.boolean(),
});

interface FormData {
  id?: number;
  title: string;
  file_url: File | string;
  type: string;
  notice: boolean;
}

interface AddBottomMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<FormData>;
  mode: "ADD" | "EDIT";
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const AddOpportunity: React.FC<AddBottomMenuProps> = ({
  isOpen,
  onClose,
  defaultValues = {},
  mode,
  onSubmit,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      file_url: "",
      type: "",
      notice: 1,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        file_url: "",
        type: "",
        notice: 1,
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmitData = (values: FormData) => {
    const formData = new FormData();

    // Append ID if in EDIT mode
    if (mode === "EDIT" && defaultValues.id) {
      formData.append("id", defaultValues.id.toString());
    }

    // Append all form values
    Object.entries(values).forEach(([key, value]) => {
      if (key === "status" || key === "updatedOn" || key === "createdOn")
        return;
      if (key === "file_url" && value instanceof FileList && value.length > 0) {
        formData.append("file_url", value[0]);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    // Debug: log FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    onSubmit(formData);
  };

  const displayOnMenuOptions = [
    { label: "True", value: 1 },
    { label: "False", value: 0 },
  ];
  const displayTypeOptions = [
    { label: "Tenders", value: "TENDERS" },
    { label: "Vacancies", value: "VACANCIES" },
  ];

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
            {mode === "ADD" ? "Add Opportunity" : "Edit Opportunity"}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form className={styles.formGrid} onSubmit={handleSubmit(onSubmitData)}>
          <div>
            <Input
              label="Title"
              name="title"
              type="text"
              placeholder="Enter Title"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div>
            <Input
              label="File"
              name="file_url"
              type="file"
              accept="application/*"
              watch={watch}
              register={register}
              errors={errors}
              required
            />
          </div>

          <div>
            <Select
              label="Type"
              name="type"
              register={register}
              options={displayTypeOptions}
              errors={errors}
              required
            />
          </div>

          <div>
            <Select
              label="Notice"
              name="notice"
              register={register}
              options={displayOnMenuOptions}
              errors={errors}
              required
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
                title={
                  mode === "ADD" ? "Add Opportunity" : "Update Opportunity"
                }
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddOpportunity;
