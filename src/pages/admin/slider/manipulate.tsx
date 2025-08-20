import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./slider.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("fileOrString", "Image is required", (value) => {
      // Allow string (existing image) or FileList (new upload)
      return typeof value === "string" || value instanceof FileList;
    })
    .required("Image is required"),
});

interface FormData {
  title: string;
  description: string;
  image: File | string;
}

interface AddSliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<FormData>;
  mode: "ADD" | "EDIT" | "DELETE";
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const AddSlider: React.FC<AddSliderMenuProps> = ({
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
      description: "",
      image: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        description: "",
        image: "",
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmitData = (values: FormData) => {
    const formData = new FormData();

    // Append all form values
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList && value.length > 0) {
        formData.append("image", value[0]);
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
            {mode === "ADD" ? "Add Slider" : "Edit Slider"}
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
          <div className={styles.fullSpan}>
            <Input
              label="Title"
              name="title"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter title"
            />
          </div>

          <div className={styles.fullSpan}>
            <Input
              label="Image"
              name="image"
              type="file"
              accept="image/*"
              register={register}
              watch={watch}
              errors={errors}
              required
            />
          </div>

          <div className={styles.fullSpan}>
            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
              required
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
                title={mode === "ADD" ? "Add Slider" : "Update Slider"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddSlider;
