import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import styles from './style.module.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';


// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  slogan: yup.string().required('slogan on Menu is required'),
 logo: yup
    .mixed()
    .required('Display Area is required')
    .test('fileRequired', 'A file is required', (value) => {
      return value instanceof File;
    })
    .test('fileSize', 'File is too large (max 2MB)', (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/svg+xml'].includes(value.type);
    }),
  videoUrl: yup
    .mixed()
    .required('Video file is required')
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type);
    })
    .test('fileSize', 'File too large (max 10MB)', (value) => {
      return value && value.size <= 10 * 1024 * 1024;
    }),
 audioUrl: yup
    .mixed()
    .required('Audio file is required')
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['audio/mpeg', 'audio/wav', 'audio/mp3'].includes(value.type);
    })
    .test('fileSize', 'File is too large (max 5MB)', (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
  content: yup.string().required('Content is required'),
  lang: yup.string().required('Language is required'),
  
});

interface FormData {
  name: string;
  logo: File;
  slogan: string;
  videoUrl: File;
  content: string;
audioUrl: File;
lang: string;
}

interface AddBottomMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<FormData>;
  mode: "ADD" | "EDIT";
  onSubmitHandler: (data: FormData) => void;
  isLoading?: boolean;
}

const AddSetting: React.FC<AddBottomMenuProps> = ({ 
  isOpen, 
  onClose, 
  defaultValues = {}, 
  mode, 
  onSubmitHandler,
  isLoading = false 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
        name: "",
  slogan: "",
  content: "",
  lang: "",
  logo: undefined,
  videoUrl: undefined,
  audioUrl: undefined,
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
  logo: undefined,
  videoUrl: undefined,
  audioUrl: undefined,
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: FormData) => {
    onSubmitHandler(data);
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
            {mode === "ADD" ? "Add settting" : "Edit setting"}
          </h2>
          <button 
            onClick={onClose} 
            className={styles.closeButton}
            disabled={isLoading}
          >
            ×
          </button>
        </div>

        <div className={styles.breadcrumb}>
          <span className={styles.breadcrumbLink}>admin</span>
          <span> / </span>
          <span className={styles.breadcrumbLink}>setting</span>
          <span> / </span>
          <span className={styles.breadcrumbCurrent}>
            {mode === "ADD" ? "Add setting" : "Edit setting"}
          </span>
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
              register={register}
              errors={errors}
              placeholder="Enter Logo"
            />
          </div>

          <div>
            <Input
              label="Video URL"
              name="videoUrl"
              type="file"
              register={register}
              errors={errors}
              required
              placeholder="Upload Video"
            />
          </div>


          <div>
            <Input
              label="Audio URL"
              name="audioUrl"
              type="file"
              register={register}
              errors={errors}
              required
              placeholder="Upload Audio"
            />
          </div>


          <div>
            <Input
              label="Content"
              name="content"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Content"
            
            />
          </div>


          {/* <div>
            <Input
              label="Language"
              name="lang"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter Language"
            />
          </div> */}

          <div>
            <Select
              label="Language"
              name="lang"
              register={register}
              options={[
                { value: "en", label: "English" },
                { value: "fr", label: "French" },
                { value: "es", label: "Spanish" },
                // Add more languages as needed
              ]}
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

export default AddSetting;