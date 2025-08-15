import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./submenu.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";

// Validation schema
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    url: yup.string(),
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

interface AddBottomMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<IFooterMenu>;
  mode: "ADD" | "EDIT";
  onSubmitHandler: (data: IFooterMenu) => void;
  isLoading?: boolean;
}

const AddBottomMenu: React.FC<AddBottomMenuProps> = ({
  isOpen,
  onClose,
  defaultValues = {},
  mode,
  onSubmitHandler,
  isLoading = false,
}) => {
  const defaultPropValues: IFooterMenu = {
    name: "",
    url: "",
    other_url: "",
    sorting_order: 1,
    target: "_self",
    lang: "en",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFooterMenu>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultPropValues,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        ...defaultPropValues,
        ...defaultValues,
      });
    }
  }, [isOpen, reset]); // Only depend on isOpen and reset

  const onSubmit = (data: IFooterMenu) => {
    console.log("Form data being submitted:", data);
    onSubmitHandler(data);
  };

  const websiteOptions = [{ label: "English", value: "en" }];

  const targetOptions = [
    { label: "Same Window", value: "_self" },
    { label: "New Window", value: "_blank" },
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
            {mode === "ADD" ? "Add Quick Menu" : "Edit Quick Menu"}
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
            <Select
              label="Website"
              name="lang"
              register={register}
              options={websiteOptions}
              errors={errors}
              required
            />
          </div>

          <div>
            <Input
              label="Menu Name"
              name="name"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Menu Name"
            />
          </div>

          <div>
            <Input
              label="Menu Position"
              name="sorting_order"
              type="number"
              register={register}
              errors={errors}
              required
              placeholder="Enter Position"
              min="1"
            />
          </div>

          <div>
            <Input
              label="SEO URL"
              name="url"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter SEO Friendly URL"
            />
          </div>

          <div>
            <Input
              label="Other URL"
              name="other_url"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter Alternate URL"
            />
          </div>

          <div>
            <Select
              label="Target"
              name="target"
              register={register}
              options={targetOptions}
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
                title={mode === "ADD" ? "Add Menu" : "Update Menu"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBottomMenu;
