import { useState } from "react";
import Modal from "../common/Modal";

export type CommanderData = {
  position: string;
  rank: string;
  firstName: string;
  lastName: string;
};

type EditCommanderModalProps = {
  isOpen: boolean;
  title: string;
  initialData: CommanderData;
  onClose: () => void;
  onSave: (data: CommanderData) => void;
};

export default function EditCommanderModal({
  isOpen,
  title,
  initialData,
  onClose,
  onSave,
}: EditCommanderModalProps) {
  const [formData, setFormData] = useState<CommanderData>(initialData);

  const inputClassName =
    "w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500";

  const labelClassName = "mb-1.5 block text-sm font-medium text-zinc-700";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="-mt-4 mb-6 text-sm text-zinc-500">
        Вкажіть актуальні дані посадової особи
      </p>

      <div className="space-y-4">
        <div>
          <label className={labelClassName}>Посада</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) =>
              setFormData({
                ...formData,
                position: e.target.value,
              })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Військове звання</label>
          <input
            type="text"
            value={formData.rank}
            onChange={(e) =>
              setFormData({
                ...formData,
                rank: e.target.value,
              })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Ім'я</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({
                ...formData,
                firstName: e.target.value,
              })
            }
            className={inputClassName}
          />
        </div>

        <div>
          <label className={labelClassName}>Прізвище</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({
                ...formData,
                lastName: e.target.value,
              })
            }
            className={inputClassName}
          />
        </div>
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Скасувати
        </button>

        <button
          type="button"
          onClick={() => onSave(formData)}
          className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Зберегти
        </button>
      </div>
    </Modal>
  );
}
