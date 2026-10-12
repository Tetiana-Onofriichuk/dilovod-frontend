import { AlertTriangle } from "lucide-react";

import Modal from "../common/Modal";

type RestoreBackupModalProps = {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: () => void;
  isRestoring: boolean;
};

const RestoreBackupModal = ({
  isOpen,
  fileName,
  onClose,
  onConfirm,
  isRestoring,
}: RestoreBackupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Відновлення даних">
      <div className="flex gap-4 rounded-lg bg-amber-50 p-4">
        <AlertTriangle size={24} className="shrink-0 text-amber-600" />

        <div>
          <p className="font-medium text-zinc-900">
            Поточні дані буде замінено
          </p>

          <p className="mt-1 text-sm leading-6 text-zinc-600">
            База даних і документи OPORA будуть відновлені зі стану, збереженого
            у вибраній резервній копії.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-zinc-200 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
          Резервна копія
        </p>

        <p className="mt-1 break-all text-sm font-medium text-zinc-800">
          {fileName}
        </p>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Перед відновленням OPORA автоматично створить страховочну копію
        поточного стану.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={isRestoring}
          className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Скасувати
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isRestoring}
          className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRestoring ? "Відновлення..." : "Відновити дані"}
        </button>
      </div>
    </Modal>
  );
};

export default RestoreBackupModal;
