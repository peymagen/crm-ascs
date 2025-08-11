import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Textarea from "../../../../components/Textarea";
import Button from "../../../../components/Button";

import styles from "./AddMenu.module.css";

// import { MenuItem } from "../../../../store/services/menu.api";

export interface MenuItem {
  id: number;
  name: string;
  url?: string | null;
  other_url?: string | null;
  target?: string;
  description?: string | null;
  position?: number;
  sorting_order?: number;
  lang?: string;
  [key: string]: any;
}
interface Props {
  onClose: () => void;
  onSave: (menu: Partial<MenuItem>) => Promise<any>;
  editMenu?: MenuItem | null;
}

interface MenuFormInputs {
  website: string;
  displayArea: string;
  displayOnMenu: string;
  menuName: string;
  menuSubHeading?: string;
  menuPosition: string;
  menuDescription?: string;
  seoUrl: string;
  otherUrl?: string;
  target: string;
}

const defaultValues: MenuFormInputs = {
  website: "English",
  displayArea: "Main Navigation",
  displayOnMenu: "Yes",
  menuName: "",
  menuSubHeading: "",
  menuPosition: "1",
  menuDescription: "",
  seoUrl: "my-page",
  otherUrl: "",
  target: "_self",
};

const schema = yup
  .object({
    website: yup.string().required("Website is required"),
    displayArea: yup.string().required("Display area is required"),
    displayOnMenu: yup.string().required("Display on menu is required"),
    menuName: yup.string().required("Menu name is required"),
    menuSubHeading: yup.string().notRequired(),
    menuPosition: yup
      .string()
      .matches(/^[1-9]\d*$/, "Menu position must be a positive number")
      .required("Menu position is required"),
    menuDescription: yup.string().notRequired(),
    seoUrl: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid SEO URL format")
      .required("SEO URL is required"),
    otherUrl: yup.string().notRequired(),
    target: yup.string().required("Target is required"),
  })
  .required();

const AddMenuModal: React.FC<Props> = ({ onClose, onSave, editMenu }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MenuFormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (editMenu) {
      reset({
        website: defaultValues.website,
        displayArea: defaultValues.displayArea,
        displayOnMenu: defaultValues.displayOnMenu,
        menuName: editMenu.name || "",
        menuSubHeading: editMenu.menuSubHeading || "",
        menuPosition: editMenu.position ? String(editMenu.position) : "1",
        menuDescription: editMenu.description || "",
        seoUrl: editMenu.url ? editMenu.url.replace(/^\//, "") : "",
        otherUrl: editMenu.other_url || "",
        target: editMenu.target || defaultValues.target,
      });
    } else {
      reset(defaultValues);
    }
  }, [editMenu, reset]);

  const submit = async (data: MenuFormInputs) => {
    const payload: Partial<MenuItem> = {
      name: data.menuName.trim(),
      target: data.target,
      lang: "en", // fixed for now
      sorting_order: Number(data.menuPosition),
      description: data.menuDescription ? data.menuDescription.trim() : null,
      url: data.seoUrl
        ? data.seoUrl.trim().startsWith("/")
          ? data.seoUrl.trim()
          : "/" + data.seoUrl.trim()
        : null,
      other_url: data.otherUrl ? data.otherUrl.trim() : null,
    };

    try {
      await onSave(payload);
      onClose();
    } catch (error) {
      console.error("Failed to save menu:", error);
      // optionally show error to user here
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

            <Select
              label="Select Website"
              name="website"
              options={[{ label: "English", value: "English" }]}
              register={register}
              errors={errors}
            />

            <Select
              label="Display Area/Region"
              name="displayArea"
              options={[
                { label: "Main Navigation", value: "Main Navigation" },
                { label: "Bottom Menu", value: "Bottom Menu" },
              ]}
              register={register}
              errors={errors}
            />

            <Select
              label="Display on Menu"
              name="displayOnMenu"
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              register={register}
              errors={errors}
            />

            <Input
              label="Enter Menu Name"
              name="menuName"
              register={register}
              errors={errors}
              required
            />

            <Input
              label="Enter Menu Sub Heading"
              name="menuSubHeading"
              register={register}
              errors={errors}
            />

            <Input
              label="Enter Menu Position"
              name="menuPosition"
              register={register}
              errors={errors}
              required
              placeholder="Enter numeric position"
            />

            <div className={styles.colSpanFull}>
              <Textarea
                label="Description"
                name="menuDescription"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div className={styles.modalFormGrid}>
            <div className={styles.modalSectionHeader}>
              <h3>Hyperlink Information</h3>
            </div>

            <Input
              label="Enter SEO URL"
              name="seoUrl"
              register={register}
              errors={errors}
              required
              placeholder="SEO-friendly URL (e.g., my-page)"
            />

            <Input
              label="Enter Other URL"
              name="otherUrl"
              register={register}
              errors={errors}
              placeholder="Other URL (if any)"
            />

            <Select
              label="Select Target"
              name="target"
              options={[
                { label: "Same Window", value: "_self" },
                { label: "New Window", value: "_blank" },
              ]}
              register={register}
              errors={errors}
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
