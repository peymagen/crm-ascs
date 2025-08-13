import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import styles from "./GalleryCategory.module.css";

interface FormValues {
  title: string;
  description: string;
}

interface Props {
  mode: "add" | "edit";
  category?: { id?: number; title: string; description: string };
  onSave: (data: { id?: number; title: string; description: string }) => void;
  onClose: () => void;
}

const Manipulate: React.FC<Props> = ({ mode, category, onSave, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (mode === "edit" && category) {
      reset({
        title: category.title || "",
        description: category.description || "",
      });
    } else {
      reset({ title: "", description: "" });
    }
  }, [mode, category, reset]);

  const submit = (data: FormValues) => {
    if (mode === "edit") {
      onSave({
        id: category?.id,
        title: data.title.trim(),
        description: data.description.trim(),
      });
    } else {
      onSave({
        title: data.title.trim(),
        description: data.description.trim(),
      });
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
          <Input
            label="Title"
            name="title"
            register={register}
            errors={errors}
            required
            placeholder="Category title"
          />

          <div className={styles.colFull}>
            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
              placeholder="Short description"
            />
          </div>

          <div className={styles.modalActions}>
            <Button
              title="Cancel"
              type="button"
              onClick={onClose}
              buttonType="secondary"
            />
            <Button
              title={mode === "edit" ? "Save Changes" : "Add Category"}
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
