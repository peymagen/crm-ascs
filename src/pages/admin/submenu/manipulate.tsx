
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import styles from './submenu.module.css';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Textarea from '../../../components/Textarea';

// Validation schema
const schema = yup.object().shape({
  website: yup.string().required('Website is required'),
  displayOnMenu: yup.string().required('Display on Menu is required'),
  displayArea: yup.string().required('Display Area is required'),
  menuName: yup.string().required('Menu Name is required'),
  menuSubHeading: yup.string(),
  menuDescription: yup.string(),
  menuPosition: yup.number().required('Menu Position is required').min(1, 'Position must be at least 1'),
  seoUrl: yup.string(),
  otherUrl: yup.string(),
  target: yup.string().required('Target is required'),
});

interface FormData {
  website: string;
  displayOnMenu: string;
  displayArea: string;
  menuName: string;
  menuSubHeading: string;
  menuDescription: string;
  menuPosition: number;
  seoUrl: string;
  otherUrl: string;
  target: string;
}

interface AddBottomMenuProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<FormData>;
  mode: "ADD" | "EDIT";
  onSubmitHandler: (data: FormData) => void;
  isLoading?: boolean;
}

const AddBottomMenu: React.FC<AddBottomMenuProps> = ({ 
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
      website: 'English',
      displayOnMenu: 'Yes',
      displayArea: 'Bottom Menu',
      menuName: '',
      menuSubHeading: '',
      menuDescription: '',
      menuPosition: 1,
      seoUrl: '',
      otherUrl: '',
      target: 'Same Window',
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        website: 'English',
        displayOnMenu: 'Yes',
        displayArea: 'Bottom Menu',
        menuName: '',
        menuSubHeading: '',
        menuDescription: '',
        menuPosition: 1,
        seoUrl: '',
        otherUrl: '',
        target: 'Same Window',
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: FormData) => {
    console.log('Form data being submitted:', data);
    onSubmitHandler(data);
  };

  const websiteOptions = [
    { label: 'English', value: 'English' },
    { label: 'Hindi', value: 'Hindi' },
  ];

  const displayOnMenuOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const displayAreaOptions = [
    { label: 'Bottom Menu', value: 'Bottom Menu' },
    { label: 'Top Menu', value: 'Top Menu' },
    { label: 'Header', value: 'Header' },
    { label: 'Footer', value: 'Footer' },
  ];

  const targetOptions = [
    { label: 'Same Window', value: 'Same Window' },
    { label: 'New Window', value: 'New Window' },
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
            {mode === "ADD" ? "Add Bottom Menu" : "Edit Bottom Menu"}
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
          <span className={styles.breadcrumbLink}>Dashboard</span>
          <span> / </span>
          <span className={styles.breadcrumbLink}>Bottom Menus</span>
          <span> / </span>
          <span className={styles.breadcrumbCurrent}>
            {mode === "ADD" ? "Add Bottom Menu" : "Edit Bottom Menu"}
          </span>
        </div>

        <form className={styles.formGrid} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Select
              label="Website"
              name="website"
              register={register}
              options={websiteOptions}
              errors={errors}
              required
            />
          </div>

          <div>
            <Select
              label="Display on Menu"
              name="displayOnMenu"
              register={register}
              options={displayOnMenuOptions}
              errors={errors}
              required
            />
          </div>

          <div>
            <Select
              label="Display Area"
              name="displayArea"
              register={register}
              options={displayAreaOptions}
              errors={errors}
              required
            />
          </div>

          <div>
            <Input
              label="Menu Name"
              name="menuName"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter Menu Name"
            />
          </div>

          <div>
            <Input
              label="Menu Sub Heading"
              name="menuSubHeading"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter Sub Heading"
            />
          </div>

          <div className={styles.fullSpan}>
            <Textarea
              label="Menu Description"
              name="menuDescription"
              register={register}
              errors={errors}
              placeholder="Enter Menu Description"
              rows={3}
            />
          </div>

          <div>
            <Input
              label="Menu Position"
              name="menuPosition"
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
              name="seoUrl"
              type="text"
              register={register}
              errors={errors}
              placeholder="Enter SEO Friendly URL"
            />
          </div>

          <div>
            <Input
              label="Other URL"
              name="otherUrl"
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