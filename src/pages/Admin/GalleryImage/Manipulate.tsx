import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDropzone } from "react-dropzone";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
// import Select from "../../../components/Select";
import styles from "./GalleryImageManagement.module.css";

interface GalleryImageItem {
  id?: number;
  ref_id: number;
  image: string;
  // Use consistent name: category (string)
}

// Props interface
interface Props {
  mode: "add" | "edit";
  imageData?: GalleryImageItem;
  onSave: (data: GalleryImageItem) => void;
  onClose: () => void;
}

// Example category options
// const categoryOptions = [
//   { label: "Nature", value: "nature" },
//   { label: "People", value: "people" },
//   { label: "Architecture", value: "architecture" },
// ];

// Yup validation schema
const schema = yup.object({
  ref_id: yup
    .number()
    .typeError("Reference ID must be a number")
    .required("Reference ID is required")
    .integer("Reference ID must be an integer")
    .positive("Reference ID must be positive"),
  image: yup
    .string()
    .required("Image is required")
    .test(
      "is-url-or-base64",
      "Image must be a valid URL or base64 string",
      (value) => {
        if (!value) return false;
        const isUrl = /^(https?:\/\/)/i.test(value);
        const isBase64 = /^data:image\/[a-zA-Z]+;base64,/.test(value);
        return isUrl || isBase64;
      }
    ),
});

const Manipulate: React.FC<Props> = ({ mode, imageData, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GalleryImageItem>({
    resolver: yupResolver(schema),
    defaultValues: {
      ref_id: 0,
      image: "",
    },
  });

  // Reset form on mode or data change
  useEffect(() => {
    if (mode === "edit" && imageData) {
      reset(imageData);
    } else {
      reset({ ref_id: 0, image: "" });
    }
  }, [mode, imageData, reset]);

  // Dropzone setup for image upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        setValue("image", reader.result as string, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    },
  });

  const imagePreview = watch("image");

  const submit = (data: GalleryImageItem) => {
    onSave({
      id: imageData?.id,
      ref_id: data.ref_id,
      image: data.image.trim(),
    });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {mode === "edit" ? "Edit Gallery Image" : "Add Gallery Image"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
          <Input
            label="Reference ID"
            name="ref_id"
            type="number"
            register={register}
            errors={errors}
            required
            placeholder="Enter reference ID"
          />
          {/* Show error below Reference ID */}
          {errors.ref_id && (
            <p className={styles.errorText}>{errors.ref_id.message}</p>
          )}

          {/* <Select
            label="Category"
           
            register={register}
            errors={errors}
            options={categoryOptions}
            required
            placeholder="Select a category"
          /> */}
          {/* Show error below Category */}
          {/* {errors.category && (
            <p className={styles.errorText}>{errors.category.message}</p> */}

          <div
            {...getRootProps()}
            className={`${styles.dropzone} ${
              isDragActive ? styles.dropzoneActive : ""
            }`}
            style={{
              border: "2px dashed #666",
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              marginBottom: 12,
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image here, or click to select one</p>
            )}
          </div>

          {/* Show error below Image upload */}
          {errors.image && (
            <p className={styles.errorText}>{errors.image.message}</p>
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: 200, objectFit: "contain" }}
            />
          )}

          <div className={styles.modalActions}>
            <Button
              title="Cancel"
              type="button"
              onClick={onClose}
              buttonType="secondary"
            />
            <Button
              title={mode === "edit" ? "Save Changes" : "Add Image"}
              type="submit"
              isLoading={isSubmitting}
              buttonType="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Manipulate;
