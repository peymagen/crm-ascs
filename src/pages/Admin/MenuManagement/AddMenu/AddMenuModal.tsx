import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Textarea from "../../../../components/Textarea";
import Select from "../../../../components/Select";

import "./AddMenuModal.css";

interface Props {
  onClose: () => void;
  onAdd: (menu: Omit<Menu, "id">) => void;
  editMenu?: Menu | null;
}

interface MenuFormInputs {
  menuName: string;
  menuSubHeading?: string;
  menuPosition: string;
  menuDescription?: string;
  seoUrl: string;
  otherUrl?: string;
  website: string;
  displayArea: string;
  displayOnMenu: string;
  target: string;
}

const urlRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // Matches "my-seo-url"
const numberRegex = /^[1-9]\d*$/; // Matches positive integers

const AddMenuModal: React.FC<Props> = ({ onClose, onAdd, editMenu }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MenuFormInputs>({
    defaultValues: {
      website: "English",
      displayArea: "Main Navigation",
      displayOnMenu: "Yes",
      target: "Same Window",
    },
  });

  useEffect(() => {
    if (editMenu) {
      reset({
        menuName: editMenu.name,
        menuPosition: String(editMenu.position),
        menuDescription: editMenu.description || "",
        seoUrl: editMenu.path || "",
        otherUrl: "",
        website: "English",
        displayArea: "Main Navigation",
        displayOnMenu: "Yes",
        target: "Same Window",
      });
    }
  }, [editMenu, reset]);

  const onSubmit = (data: MenuFormInputs) => {
    if (!urlRegex.test(data.seoUrl)) {
      alert("SEO URL must be in a valid format (e.g., 'my-seo-url').");
      return;
    }

    if (!numberRegex.test(data.menuPosition)) {
      alert("Menu Position must be a positive number.");
      return;
    }

    onAdd({
      name: data.menuName,
      path: data.seoUrl || data.otherUrl || "",
      description: data.menuDescription || "",
      position: parseInt(data.menuPosition, 10),
    });

    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">
          {editMenu ? "Edit Menu" : "Add New Menu"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>General Information</h3>
            </div>

            {/* Select Website */}
            <Select
              label="Select Website"
              name="website"
              options={[{ label: "English", value: "English" }]}
              register={register}
              errors={errors}
            />

            {/* Display Area */}
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

            {/* Display on Menu */}
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

            {/* Menu Name */}
            <Input
              label="Enter Menu Name"
              name="menuName"
              register={register}
              errors={errors}
              required
            />

            {/* Sub Heading */}
            <Input
              label="Enter Menu Sub Heading"
              name="menuSubHeading"
              register={register}
              errors={errors}
            />

            {/* Menu Position */}
            <Input
              label="Enter Menu Position"
              name="menuPosition"
              register={register}
              errors={errors}
              required
              placeholder="Enter numeric position"
              type="text"
            />

            {/* Description */}
            <div className="col-span-full">
              <Textarea
                label="Description"
                name="menuDescription"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          {/* Hyperlink Info */}
          <div className="modal-form-grid">
            <div className="modal-section-header">
              <h3>Hyperlink Information</h3>
            </div>

            {/* SEO URL */}
            <Input
              label="Enter SEO URL"
              name="seoUrl"
              register={register}
              errors={errors}
              required
              placeholder="SEO-friendly URL (e.g., my-page)"
            />

            {/* Other URL */}
            <Input
              label="Enter Other URL"
              name="otherUrl"
              register={register}
              errors={errors}
              placeholder="Other URL (if any)"
            />

            {/* Target */}
            <Select
              label="Select Target"
              name="target"
              options={[
                { label: "Same Window", value: "Same Window" },
                { label: "New Window", value: "New Window" },
              ]}
              register={register}
              errors={errors}
            />
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <Button
              title="Cancel"
              type="button"
              onClick={onClose}
              buttonType="secondary"
            />
            <Button
              title="Add Menu"
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
