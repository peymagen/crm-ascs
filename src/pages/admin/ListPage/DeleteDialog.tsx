import React from "react";
import Button from "../../../components/Button";
import styles from "./listpage.module.css";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  itemName: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  itemName,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete the page "{itemName}"?</p>
        <div className={styles.dialogActions}>
          <Button onClick={onClose} variant="secondary" disabled={isLoading} title="Cancel">
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger" isLoading={isLoading} title="Delete">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
