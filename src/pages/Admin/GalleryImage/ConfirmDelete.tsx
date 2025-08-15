// import React from "react";
// import styles from "../../pages/Admin/GalleryImage/GalleryImage.module.css";

// interface Props {
//   onClose: () => void;
//   onConfirm: () => void;
//   imageUrl: string;
// }

// const DeleteConfirmation: React.FC<Props> = ({
//   onClose,
//   onConfirm,
//   imageUrl,
// }) => {
//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modal}>
//         <h2>Confirm Deletion</h2>
//         <p>Are you sure you want to delete this image?</p>
//         <img src={imageUrl} alt="Preview" className={styles.previewImg} />
//         <div className={styles.modalButtons}>
//           <button onClick={onClose}>Cancel</button>
//           <button onClick={onConfirm}>Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteConfirmation;

// src/pages/admin/gallery/ConfirmDelete.tsx
import React from "react";
import Button from "../../../components/Button";
import styles from "./GalleryImageManagement.module.css";

interface ConfirmDeleteProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{title}</h2>
        {message && <p className={styles.modalMessage}>{message}</p>}
        <div className={styles.actions}>
          <Button title="Cancel" buttonType="secondary" onClick={onCancel} />
          <Button title="Delete" buttonType="primary" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
