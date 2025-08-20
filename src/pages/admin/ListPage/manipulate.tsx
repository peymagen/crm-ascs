import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./listpage.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Select from "../../../components/Select";
import RichTextEditor from "../../../components/RichTextEditor";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  slug: yup.string().required("Slug is required"),
  metaTitle: yup.string().required("Meta title is required"),
  metaDescription: yup.string().required("Meta description is required"),
  image: yup
    .mixed()
    .test("fileOrString", "Image is required", (value) => {
      // Allow string (existing image) or FileList (new upload)
      return typeof value === "string" || value instanceof FileList;
    })
    .required("Image is required"),
  publishDate: yup.string().required("Publish date is required"),
  lang: yup.string().required("Language is required"),
});

interface FormData {
  title: string;
  description: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  publishDate: string;
  lang: string;
}

interface ManipulateListPageProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<FormData>;
  mode: "ADD" | "EDIT";
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

const ManipulateListPage: React.FC<ManipulateListPageProps> = ({
  isOpen,
  onClose,
  defaultValues = {},
  mode,
  onSubmit,
  isLoading = false,
}) => {
  const defaultData = React.useMemo(
    () => ({
      title: "",
      description: "",
      slug: "",
      metaTitle: "",
      metaDescription: "",
      image: "",
      publishDate: "",
      lang: "en",
    }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultData,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultData,
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset, defaultData]);

  const onSubmitData = (values: FormData) => {
    const formData = new FormData();

    // Append all form values
    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "status" ||
        key === "createdOn" ||
        key === "updatedOn" ||
        key === "id"
      )
        return; // Skip status field if it exists
      if (key === "image" && value instanceof FileList && value.length > 0) {
        formData.append("image", value[0]);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    onSubmit(formData);
  };

  const languageOptions = [{ label: "English", value: "en" }];

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
            {mode === "ADD" ? "Add Page" : "Edit Page"}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmitData)} className={styles.formGrid}>
          <div className={styles.fullSpan}>
            <Input
              label="Title"
              type="text"
              name="title"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className={styles.fullSpan}>
            <RichTextEditor
              label="Description"
              watch={watch}
              name="description"
              setValue={setValue}
              errors={errors}
              required
            />
          </div>

          <div>
            <Input
              label="Slug"
              name="slug"
              register={register}
              errors={errors}
              required
            />
          </div>

          <div>
            <Input
              label="Meta Title"
              name="metaTitle"
              register={register}
              errors={errors}
              required
            />
          </div>

          <div>
            <Textarea
              label="Meta Description"
              name="metaDescription"
              register={register}
              errors={errors}
              required
              rows={3}
            />
          </div>

          <div>
            <Input
              label="Image"
              name="image"
              type="file"
              accept="image/*"
              watch={watch}
              register={register}
              errors={errors}
              required
            />
          </div>

          <div>
            <Input
              label="Publish Date"
              name="publishDate"
              type="date"
              register={register}
              errors={errors}
              required
            />
          </div>

          <div>
            <Select
              label="Language"
              name="lang"
              register={register}
              options={languageOptions}
              errors={errors}
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
                title={mode === "ADD" ? "Create" : "Update"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ManipulateListPage;
