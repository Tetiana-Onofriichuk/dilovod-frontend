import { useState } from "react";
import Modal from "../common/Modal";
import { deleteSoldier } from "../../services/soldiersApi";
import type { Soldier } from "../../types/soldier";

type DeleteSoldierModalProps = {
  soldier: Soldier;
  onClose: () => void;
  onSoldierDeleted: (id: number) => void;
};

const DeleteSoldierModal = ({
  soldier,
  onClose,
  onSoldierDeleted,
}: DeleteSoldierModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteSoldier(soldier.id);

      onSoldierDeleted(soldier.id);
      onClose();
    } catch (error) {
      console.error("Помилка при видаленні військовослужбовця:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Видалити військовослужбовця?">
      <p className="text-zinc-600">
        Ви впевнені, що хочете видалити{" "}
        <span className="font-semibold text-zinc-900">
          {soldier.lastName} {soldier.firstName} {soldier.patronymic}
        </span>
        ?
      </p>

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

export default DeleteSoldierModal;
