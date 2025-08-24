import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import styles from "./GalleryImageManagement.module.css";
import { useGetGalleryCategoriesQuery } from "../../../store/services/galleryCategory.api";
import Select from "../../../components/Select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<IGalleryImage>;
  mode: "ADD" | "EDIT";
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const schema = yup.object().shape({
  ref_id: yup
    .number()
    .typeError("Reference ID must be a number")
    .required("Reference ID is required")
    .integer("Reference ID must be an integer")
    .positive("Reference ID must be positive")
    .moreThan(0, "Please select a category"),
  image: yup
    .mixed<FileList | File | string>()
    .required("Image is required")
    .test("fileType", "Unsupported format", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return ["image/jpeg", "image/png", "image/svg+xml"].includes(
        value[0].type
      );
    })
    .test("fileSize", "Max size 2MB", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return value[0].size <= 2 * 1024 * 1024;
    }),
});

const Manipulate: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultValues = {},
  mode,
  onSubmit,
  isLoading = false,
}) => {
  const defaultData = useMemo(
    () => ({
      ref_id: 0,
      image: "",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultData,
      ...defaultValues,
    },
  });

  const { data: queryData, isLoading: categoriesLoading } =
    useGetGalleryCategoriesQuery({
      limit: 10000,
      offset: 0,
    });

  // Reset form when modal opens or defaultValues change
  useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultData,
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset, defaultData]);

  const onSubmitData = (values: IGalleryImage) => {
    const formData = new FormData();

    // Append ID if in EDIT mode
    if (mode === "EDIT" && defaultValues.id) {
      formData.append("id", defaultValues.id.toString());
    }

    // Append all form values
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image" && value instanceof FileList && value.length > 0) {
        formData.append("image", value[0]);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    onSubmit(formData);
  };

  const options = useMemo(() => {
    return [
      { value: "0", label: "Select Category" },
      ...(queryData?.data?.map((category) => ({
        value: String(category.id),
        label: category.title,
      })) || []),
    ];
  }, [queryData]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <motion.div
        className={styles.modalContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHead}>
            <h2 className={styles.modalTitle}>
              {mode === "EDIT" ? "Edit Gallery Image" : "Add Gallery Image"}
            </h2>
            <button
              onClick={onClose}
              className={styles.closeButton}
              disabled={isLoading}
            >
              ×
            </button>
          </div>

          <form
            onSubmit={handleSubmit(onSubmitData)}
            className={styles.modalForm}
          >
            {categoriesLoading ? (
              <div className={styles.loading}>Loading categories...</div>
            ) : (
              <div className={styles.fullSpan}>
                <Select
                  label="Reference Category"
                  name="ref_id"
                  register={register}
                  options={options}
                  errors={errors}
                  required
                />
              </div>
            )}

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

            <div className={styles.modalActions}>
              <Button
                title="Cancel"
                type="button"
                onClick={onClose}
                buttonType="secondary"
                disabled={isLoading}
              />
              <Button
                title={mode === "EDIT" ? "Save Changes" : "Add Image"}
                type="submit"
                isLoading={isLoading}
                buttonType="primary"
              />
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Manipulate;
