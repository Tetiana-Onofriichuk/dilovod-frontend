import { useState } from "react";
import type { ReactNode } from "react";
import Modal from "./Modal";

type DeleteConfirmModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

const DeleteConfirmModal = ({
  title,
  children,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={title}>
      {children}

      <p className="mt-2 text-sm text-zinc-500">
        Цю дію неможливо буде скасувати.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Скасувати
        </button>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Видалення..." : "Видалити"}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
