import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "./faq.module.css";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import RichTextEditor from "../../../components/RichTextEditor";

// Validation schema
const schema = yup.object().shape({
  question: yup.string().required("Question is required"),
  answer: yup.string().required("Answer is required"),
});

interface AddFaq {
  isOpen: boolean;
  onClose: () => void;
  defaultValues?: Partial<IFAQ>;
  mode: "ADD" | "EDIT" | "DELETE";
  onSubmitHandler: (data: IFAQ) => void;
  isLoading?: boolean;
}

const AddFaq: React.FC<AddFaq> = ({
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
  } = useForm<IFAQ>({
    resolver: yupResolver(schema),
    defaultValues: {
      question: "",
      answer: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        question: "",
        answer: "",
        ...defaultValues,
      });
    }
  }, [isOpen, defaultValues, reset]);

  const onSubmit = (data: IFAQ) => {
    console.log("Form data being submitted:", data);
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
            {mode === "ADD" ? "Add Faq" : "Edit Faq"}
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
          <div className={styles.fullSpan}>
            <Input
              label="Question"
              name="question"
              type="text"
              register={register}
              errors={errors}
              required
              placeholder="Enter question"
            />
          </div>
          <div className={styles.fullSpan}>
            <RichTextEditor
              label="Answer"
              name="answer"
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
                buttonType="primaryFill"
                title={mode === "ADD" ? "Add Faq" : "Update Faq"}
                isLoading={isLoading}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFaq;
