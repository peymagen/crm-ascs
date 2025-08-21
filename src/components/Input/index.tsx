import { motion } from "framer-motion";
import styles from "./Input.module.css";
import {
  type UseFormRegister,
  type FieldValues,
  type FieldErrors,
  type FieldError,
  type Merge,
  type FieldErrorsImpl,
  type Path,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { useEffect, useMemo } from "react";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  required?: boolean;
  placeholder?: string;
  accept?: string;
  min?: string;
  max?: string;
}

const Input = <T extends FieldValues = FieldValues>({
  label,
  name,
  type = "text",
  register,
  errors,
  watch,
  setValue,
  required = false,
  placeholder = `Enter your ${label.toLowerCase()} here`,
  min = "",
  max = "",
  accept,
}: InputProps<T>) => {
  const itemVariants = {
    hidden: { opacity: 1, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const getNestedError = (errors: FieldErrors, path: string) => {
    return path.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && acc !== null) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, errors);
  };

  const watchedValue = watch?.(name);

  useEffect(() => {
    if (watchedValue && watchedValue.length > 0) {
      setValue?.(name, watchedValue[0]);
    }
  }, [watchedValue, name, setValue]);

  const renderPreview = useMemo(() => {
    if (!watchedValue) return null;

    let url: string | null = null;

    if (watchedValue?.[0] instanceof File) {
      url = URL.createObjectURL(watchedValue[0]);
    } else if (typeof watchedValue === "string" && watchedValue.trim() !== "") {
      url = watchedValue;
    }

    if (!url) return null;

    if (accept?.includes("image") || /\.(jpeg|jpg|png|gif)$/i.test(url)) {
      return (
        <img
          src={url}
          alt="preview"
          className="w-32 h-32 object-cover rounded"
        />
      );
    }

    if (accept?.includes("video") || /\.(mp4|webm|ogg)$/i.test(url)) {
      return <video src={url} controls className="w-48 h-32 rounded" />;
    }

    if (accept?.includes("audio") || /\.(mp3|wav|ogg)$/i.test(url)) {
      return <audio src={url} controls className="mt-2" />;
    }

    if (accept?.includes("pdf") || /\.pdf$/i.test(url)) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View PDF
        </a>
      );
    }

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        View File
      </a>
    );
  }, [accept, watchedValue]);

  const error = getNestedError(errors ?? {}, name) as
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<FieldError>>
    | undefined;

  return (
    <motion.div className={styles.formGroup} variants={itemVariants}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {type === "file" ? (
        <input
          id={name}
          type="file"
          accept={accept}
          {...register(name, { required })}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          aria-invalid={error ? "true" : "false"}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, { required })}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          min={min}
          max={max}
        />
      )}

      {error && (
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {typeof error?.message === "string" ? error.message : "Invalid input"}
        </motion.p>
      )}
      {renderPreview}
    </motion.div>
  );
};

export default Input;
