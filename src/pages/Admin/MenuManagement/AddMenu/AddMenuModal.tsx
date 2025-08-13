import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";

import styles from "./AddMenu.module.css";

interface Props {
  onClose: () => void;
  onSave: (menu: Partial<IMainMenu>) => Promise<any>;
  editMenu?: IMainMenu | null;
}

const defaultValues: IMainMenu = {
  name: "",
  url: "",
  other_url: "",
  sorting_order: 1,
  target: "_self",
  lang: "en",
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    url: yup
      .string()
      .matches(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid URL format (use lowercase letters, numbers and hyphens)"
      ),
    other_url: yup.string().url("Must be a valid URL"),
    sorting_order: yup
      .string()
      .matches(/^[1-9]\d*$/, "Sorting order must be a positive number")
      .required("Sorting order is required"),
    target: yup.string().required("Target is required"),
    lang: yup.string().required("Language is required"),
  })
  .required()
  .test(
    "url-or-other_url",
    "Either URL or Other URL must be provided",
    (obj) => !!obj.url || !!obj.other_url
  );

const AddMenuModal: React.FC<Props> = ({ onClose, onSave, editMenu }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IMainMenu>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (editMenu) {
      reset({
        name: editMenu.name || "",
        url: editMenu.url ? editMenu.url.replace(/^\//, "") : "",
        other_url: editMenu.other_url || "",
        sorting_order: editMenu.sorting_order
          ? Number(editMenu.sorting_order)
          : 1,
        target: editMenu.target || defaultValues.target,
        lang: editMenu.lang || defaultValues.lang,
      });
    } else {
      reset(defaultValues);
    }
  }, [editMenu, reset]);

  const submit = async (data: IMainMenu) => {
    const payload: Partial<IMainMenu> = {
      name: data.name.trim(),
      target: data.target,
      lang: data.lang,
      sorting_order: Number(data.sorting_order),
      url: data.url
        ? data.url.trim().startsWith("/")
          ? data.url.trim()
          : "/" + data.url.trim()
        : "",
      other_url: data.other_url ? data.other_url.trim() : "",
    };

    try {
      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Failed to save menu:", error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>
          {editMenu ? "Edit Menu" : "Add New Menu"}
        </h2>

        <form onSubmit={handleSubmit(submit)} className={styles.modalForm}>
          <div className={styles.modalFormGrid}>
            <div className={styles.modalSectionHeader}>
              <h3>General Information</h3>
            </div>

            <Input
              label="Name"
              name="name"
              register={register}
              errors={errors}
              required
            />

            <Input
              label="Sorting Order"
              name="sorting_order"
              register={register}
              errors={errors}
              required
              placeholder="Enter numeric position"
            />

            <Select
              label="Language"
              name="lang"
              options={[
                { label: "English", value: "en" },
                // Add other language options as needed
              ]}
              register={register}
              errors={errors}
              required
            />
          </div>

          <div className={styles.modalFormGrid}>
            <div className={styles.modalSectionHeader}>
              <h3>Link Information</h3>
            </div>

            <Input
              label="URL"
              name="url"
              register={register}
              errors={errors}
              placeholder="SEO-friendly URL (e.g., my-page)"
            />

            <Input
              label="Other URL"
              name="other_url"
              register={register}
              errors={errors}
              placeholder="Full URL (e.g., https://example.com)"
            />

            <Select
              label="Target"
              name="target"
              options={[
                { label: "Same Window", value: "_self" },
                { label: "New Window", value: "_blank" },
              ]}
              register={register}
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
            />
            <Button
              title={editMenu ? "Update Menu" : "Add Menu"}
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

export default AddMenuModal;
