import DeleteConfirmModal from "../common/DeleteConfirmModal";
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
  const handleDelete = async () => {
    await deleteSoldier(soldier.id);
    onSoldierDeleted(soldier.id);
  };

  return (
    <DeleteConfirmModal
      title="Видалити військовослужбовця?"
      onClose={onClose}
      onConfirm={handleDelete}
    >
      <p className="text-zinc-600">
        Ви впевнені, що хочете видалити{" "}
        <span className="font-semibold text-zinc-900">
          {soldier.lastName} {soldier.firstName} {soldier.patronymic}
        </span>
        ?
      </p>
    </DeleteConfirmModal>
  );
};

export default DeleteSoldierModal;
