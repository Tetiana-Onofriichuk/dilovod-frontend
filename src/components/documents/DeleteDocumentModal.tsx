import DeleteConfirmModal from "../common/DeleteConfirmModal";
import { deleteDocument } from "../../services/documentsApi";
import type { Document } from "../../types/document";

type DeleteDocumentModalProps = {
  document: Document;
  onClose: () => void;
  onDocumentDeleted: (id: number) => void;
};

const DeleteDocumentModal = ({
  document,
  onClose,
  onDocumentDeleted,
}: DeleteDocumentModalProps) => {
  const handleDelete = async () => {
    await deleteDocument(document.id);
    onDocumentDeleted(document.id);
  };

  return (
    <DeleteConfirmModal
      title="Видалити документ?"
      onClose={onClose}
      onConfirm={handleDelete}
    >
      <p className="text-zinc-600">
        Ви впевнені, що хочете видалити{" "}
        <span className="font-semibold text-zinc-900">«{document.title}»</span>?
      </p>
    </DeleteConfirmModal>
  );
};

export default DeleteDocumentModal;
