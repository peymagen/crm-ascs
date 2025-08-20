import { motion } from "framer-motion";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "./Editor.module.css"; // reuse your styles
import type {
  FieldValues,
  FieldErrors,
  FieldError,
  Merge,
  FieldErrorsImpl,
  UseFormWatch,
  Path,
  UseFormSetValue,
  PathValue,
} from "react-hook-form";

// Custom Upload Adapter
class MyUploadAdapter {
  private loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          data.append("file", file);

          fetch(import.meta.env.VITE_BACKEND_SERVER + "api/upload", {
            method: "POST",
            body: data,
          })
            .then((res) => res.json())
            .then((res) => {
              resolve({ default: res.data.url });
            })
            .catch((err) => {
              reject(err);
            });
        })
    );
  }
  abort() {}
}

function CustomUploadPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

interface RichTextEditorProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  errors?: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  required?: boolean;
}

const RichTextEditor = <T extends FieldValues = FieldValues>({
  label,
  name,
  errors,
  setValue,
  watch,
  required = false,
}: RichTextEditorProps<T>) => {
  const itemVariants = {
    hidden: { opacity: 1, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
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
  const value = watch(name);
  return (
    <motion.div className={styles.formGroup} variants={itemVariants}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <div
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        style={{ minHeight: "150px", padding: "4px" }}
      >
        <CKEditor
          editor={ClassicEditor as typeof ClassicEditor}
          data={value || ""}
          config={{
            extraPlugins: [CustomUploadPlugin],
          }}
          onReady={(editor) => {
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "min-height",
                "250px",
                editor.editing.view.document.getRoot()!
              );
            });
          }}
          onChange={(_, editor) => {
            const data = editor.getData().trim();
            // Save editor value to react-hook-form
            setValue(name, data as PathValue<T, typeof name>, {
              shouldValidate: true,
            });
          }}
        />
      </div>

      {error && (
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
        >
          {typeof error?.message === "string"
            ? error.message
            : "Invalid content"}
        </motion.p>
      )}
    </motion.div>
  );
};

export default RichTextEditor;
