import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./style.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import RichTextEditor from "../../../components/RichTextEditor";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  slogan: yup.string().required("Slogan on Menu is required"),
  logo: yup
    .mixed<File | FileList | string>()
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
  videoUrl: yup
    .mixed<File | FileList | string>()
    .test("fileType", "Unsupported format", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return ["video/mp4", "video/webm", "video/ogg"].includes(value[0].type);
    })
    .test("fileSize", "Max size 10MB", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return value[0].size <= 10 * 1024 * 1024;
    }),

  audioUrl: yup
    .mixed<File | FileList | string>()
    .test("fileType", "Unsupported format", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return ["audio/mpeg", "audio/wav", "audio/ogg"].includes(value[0].type);
    })
    .test("fileSize", "Max size 10MB", (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return value[0].size <= 10 * 1024 * 1024;
    }),

  content: yup.string().required("Content is required"),
  lang: yup.string().required("Language is required"),
});

interface AddSettings {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<ISettings>;
  mode: "ADD" | "EDIT" | "DELETE";
  onSubmitHandler: (data: ISettings) => void;
  isLoading?: boolean;
}

const AddSetting: React.FC<AddSettings> = ({
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
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      slogan: "",
      content: "",
      lang: "",
      logo: "" as string,
      videoUrl: "" as string,
      audioUrl: "" as string,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        slogan: "",
        content: "",
        lang: "",
        logo: "",
        videoUrl: "",
        audioUrl: "",
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: ISettings) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slogan", data.slogan);
    formData.append("lang", data.lang);
    formData.append("content", data.content);

    if (data.logo instanceof FileList && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    } else if (typeof data.logo === "string" && data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.videoUrl instanceof FileList && data.videoUrl.length > 0) {
      formData.append("videoUrl", data.videoUrl[0]);
    } else if (typeof data.videoUrl === "string" && data.videoUrl) {
      formData.append("videoUrl", data.videoUrl);
    }

    if (data.audioUrl instanceof FileList && data.audioUrl.length > 0) {
      formData.append("audioUrl", data.audioUrl[0]);
    } else if (typeof data.audioUrl === "string" && data.audioUrl) {
      formData.append("audioUrl", data.audioUrl);
    }

    onSubmitHandler(formData as unknown as ISettings);
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
            {mode === "ADD" ? "Add setting" : "Edit setting"}
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
              label="Name"
              name="name"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Name"
            />
          </div>

          <div>
            <Input
              label="Slogan"
              name="slogan"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Slogan"
            />
          </div>

          <div>
            <Input
              label="Logo"
              name="logo"
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
              label="Video"
              name="videoUrl"
              type="file"
              accept="video/*"
              register={register}
              errors={errors}
              watch={watch}
              required
            />
          </div>

          <div>
            <Input
              label="Audio"
              name="audioUrl"
              type="file"
              accept="audio/*"
              register={register}
              errors={errors}
              watch={watch}
              required
            />
          </div>

          <div>
            <Select
              label="Language"
              name="lang"
              register={register}
              options={[{ value: "en", label: "English" }]}
              errors={errors}
              required
            />
          </div>
          <div className={styles.fullSpan}>
            <RichTextEditor
              label="Content"
              name="content"
              watch={watch}
              setValue={setValue}
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
                title={mode === "ADD" ? "Add Setting" : "Update Setting"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddSetting;
