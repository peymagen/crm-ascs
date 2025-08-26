import { motion } from "framer-motion";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "./Editor.module.css";
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

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@ckeditor/ckeditor5-core";
import type { ModelElement } from "@ckeditor/ckeditor5-engine";

// Type for the loader parameter
interface UploadLoader {
  file: Promise<File>;
  uploadTotal?: number;
  uploaded?: number;
}

// Extended interface for FileRepository plugin
interface FileRepository {
  createUploadAdapter: (loader: UploadLoader) => MyUploadAdapter;
}

// Custom Upload Adapter
class MyUploadAdapter {
  private loader: UploadLoader;
  private xhr: XMLHttpRequest | null = null;

  constructor(loader: UploadLoader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise<{ default: string; fileType: string; fileName: string }>(
          (resolve, reject) => {
            const data = new FormData();
            data.append("file", file);

            this.xhr = new XMLHttpRequest();

            // Listen for upload progress
            this.xhr.upload.addEventListener("progress", (evt) => {
              if (evt.lengthComputable) {
                this.loader.uploadTotal = evt.total;
                this.loader.uploaded = evt.loaded;
              }
            });

            this.xhr.addEventListener("error", () => {
              reject(new Error("Upload failed"));
            });

            this.xhr.addEventListener("abort", () => {
              reject(new Error("Upload aborted"));
            });

            this.xhr.addEventListener("load", () => {
              if (!this.xhr) return;

              const response = JSON.parse(this.xhr.responseText);

              if (!response || response.error) {
                return reject(
                  response && response.error
                    ? new Error(response.error.message)
                    : new Error("Upload failed")
                );
              }

              // Return the uploaded file URL and type
              resolve({
                default: response.data.url,
                fileType: file.type,
                fileName: file.name,
              });
            });

            this.xhr.open(
              "POST",
              import.meta.env.VITE_BACKEND_SERVER + "api/upload",
              true
            );
            this.xhr.setRequestHeader("Accept", "application/json");
            this.xhr.send(data);
          }
        )
    );
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

function CustomUploadPlugin(editor: Editor) {
  // Type assertion to handle CKEditor's FileRepository plugin
  const fileRepository = editor.plugins.get("FileRepository") as FileRepository;
  fileRepository.createUploadAdapter = (loader: UploadLoader) => {
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

  const editorRef = useRef<Editor>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Properly typed selectedImage state - using ModelElement for CKEditor model elements
  const [selectedImage, setSelectedImage] = useState<ModelElement | null>(null);
  const [imageWidth, setImageWidth] = useState<string>("");
  const [imageHeight, setImageHeight] = useState<string>("");

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

  // Handle file uploads
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length || !editorRef.current) {
      return;
    }

    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const loader: UploadLoader = {
        file: Promise.resolve(file),
      };

      const uploadAdapter = new MyUploadAdapter(loader);

      uploadAdapter
        .upload()
        .then(
          (response: {
            default: string;
            fileType: string;
            fileName: string;
          }) => {
            if (!editorRef.current) return;

            // Insert link to the file
            editorRef.current.model.change((writer) => {
              const selection = editorRef.current!.model.document.selection;
              const firstPosition = selection.getFirstPosition();

              if (firstPosition) {
                const link = writer.createText(response.fileName, {
                  linkHref: response.default,
                });

                writer.insert(link, firstPosition);
              }
            });
          }
        )
        .catch((error: unknown) => {
          if (error instanceof Error) {
            console.error("File upload failed:", error.message);
          } else {
            console.error("File upload failed:", error);
          }
        });
    };

    fileReader.readAsArrayBuffer(file);
    // Reset the file input
    e.target.value = "";
  };

  // Update image dimensions
  const updateImageSize = () => {
    if (!editorRef.current || !selectedImage) return;

    editorRef.current.model.change((writer) => {
      // Update width if provided
      if (imageWidth) {
        writer.setAttribute("width", imageWidth, selectedImage);
      }

      // Update height if provided
      if (imageHeight) {
        writer.setAttribute("height", imageHeight, selectedImage);
      }
    });

    // Clear the form
    setImageWidth("");
    setImageHeight("");
    setSelectedImage(null);
  };

  useEffect(() => {
    // Add custom button after editor is ready
    if (isEditorReady && editorRef.current) {
      // Create a container for our custom buttons
      const toolbarElement = document.querySelector(".ck-toolbar");
      if (
        toolbarElement &&
        !document.getElementById("custom-toolbar-buttons")
      ) {
        const buttonContainer = document.createElement("div");
        buttonContainer.id = "custom-toolbar-buttons";
        buttonContainer.style.display = "inline-flex";
        buttonContainer.style.alignItems = "center";
        buttonContainer.style.marginLeft = "10px";
        buttonContainer.style.gap = "8px";

        // File upload button
        const fileButton = document.createElement("button");
        fileButton.type = "button";
        fileButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
          Upload File
        `;
        fileButton.style.display = "inline-flex";
        fileButton.style.alignItems = "center";
        fileButton.style.gap = "4px";
        fileButton.style.padding = "6px 12px";
        fileButton.style.background = "#f5f5f5";
        fileButton.style.border = "1px solid #ddd";
        fileButton.style.borderRadius = "4px";
        fileButton.style.cursor = "pointer";
        fileButton.style.fontSize = "14px";
        fileButton.onclick = handleFileUpload;

        buttonContainer.appendChild(fileButton);
        toolbarElement.appendChild(buttonContainer);
      }

      // Listen for image selection
      const editor = editorRef.current;
      editor.model.document.selection.on("change", () => {
        const selectedElement =
          editor.model.document.selection.getSelectedElement();

        if (selectedElement && selectedElement.is("element", "image")) {
          setSelectedImage(selectedElement);
          // Safe access to attributes with proper type checking
          const width = selectedElement.getAttribute("width");
          const height = selectedElement.getAttribute("height");
          setImageWidth(width ? String(width) : "");
          setImageHeight(height ? String(height) : "");
        } else {
          setSelectedImage(null);
          setImageWidth("");
          setImageHeight("");
        }
      });
    }
  }, [isEditorReady]);

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
          editor={ClassicEditor}
          config={{
            extraPlugins: [CustomUploadPlugin],
            toolbar: {
              items: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "uploadImage",
                "blockQuote",
                "insertTable",
                "|",
                "undo",
                "redo",
              ],
            },
            // Use type assertion to bypass TypeScript checking for link config
            ...{
              link: {
                // Allow all file types in links
                decorators: {
                  isExternal: {
                    mode: "automatic",
                    callback: (url: string) => /^(https?:)?\/\//.test(url),
                    attributes: {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                  },
                  isFile: {
                    mode: "automatic",
                    callback: (url: string) =>
                      /\.(pdf|doc|docx|xls|xlsx|zip)$/i.test(url),
                    attributes: {
                      class: "file-link",
                      download: true,
                    },
                  },
                },
              },
            },
          }}
          onReady={(editor) => {
            editorRef.current = editor;
            setIsEditorReady(true);

            // Set initial data if available
            if (value) {
              editor.setData(value);
            }

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

        {/* Hidden file input for uploads */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
          onChange={onFileChange}
        />
      </div>

      {/* Image size adjustment form */}
      {selectedImage && (
        <motion.div
          className={styles.imageSizeForm}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h4>Adjust Image Size</h4>
          <div className={styles.sizeInputs}>
            <div className={styles.inputGroup}>
              <label>Width (px)</label>
              <input
                type="number"
                value={imageWidth}
                onChange={(e) => setImageWidth(e.target.value)}
                placeholder="Width"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Height (px)</label>
              <input
                type="number"
                value={imageHeight}
                onChange={(e) => setImageHeight(e.target.value)}
                placeholder="Height"
              />
            </div>
            <button className={styles.applyButton} onClick={updateImageSize}>
              Apply
            </button>
          </div>
        </motion.div>
      )}

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
