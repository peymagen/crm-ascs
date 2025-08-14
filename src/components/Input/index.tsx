import { motion } from "framer-motion";
import styles from "./Input.module.css";
import type {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  FieldError,
  Merge,
  FieldErrorsImpl,
  Path,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  required?: boolean;
  placeholder?: string;
  min?: string;
  max?: string;
}

const Input = <T extends FieldValues = FieldValues>({
  label,
  name,
  type = "text",
  register,
  errors,
  setValue,
  required = false,
  placeholder = `Enter your ${label.toLowerCase()} here`,
  min = "",
  max = "",
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
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (setValue && file) {
              setValue(name, file as PathValue<T, typeof name>);
            }
          }}
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
    </motion.div>
  );
};

export default Input;
