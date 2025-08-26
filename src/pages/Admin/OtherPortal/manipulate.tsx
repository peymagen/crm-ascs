import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./otherpage.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  url: yup.string().default(""),
  image: yup
    .mixed<File | FileList | string>()
    .test("fileOrString", "Image is required", (value) => {
      // Allow string (existing image) or FileList (new upload)
      return typeof value === "string" || value instanceof FileList;
    })
    .required("Image is required"),
});

interface AddSliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<IPortal>;
  mode: "ADD" | "EDIT" | "DELETE";
  onSubmitHandler: (data: IPortal) => void;
  isLoading?: boolean;
}

const AddOtherPortal: React.FC<AddSliderMenuProps> = ({
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      url: defaultValues.url ?? "",
      image: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: "",
        url: defaultValues.url ?? "",
        image: "",
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit: SubmitHandler<IPortal> = (data: IPortal) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("url", data.url);
    if (data.image && data.image instanceof FileList && data.image.length > 0) {
      formData.append("image", data.image[0]);
    } else if (typeof data.image === "string" && data.image) {
      formData.append("image", data.image);
    } else {
      console.log(" No image provided, skipping image append");
    }
    onSubmitHandler(formData as unknown as IPortal);
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
            {mode === "ADD" ? "Add Other-portal" : "Edit Other-portal"}
          </h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <form className={styles.formGrid} onSubmit={handleSubmit(onSubmit)}>
          <div>
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

          <div>
            <Input
              label="Image"
              name="image"
              type="file"
              accept="image/*"
              register={register}
              errors={errors}
              watch={watch}
              required
            />
          </div>
          <div>
            <Input
              label="URL"
              name="url"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter url"
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
                buttonType="primaryFill"
                title={
                  mode === "ADD" ? "Add Other-portal" : "Update Other-portal"
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

export default AddOtherPortal;
