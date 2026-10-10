import { FileText } from "lucide-react";
import Modal from "../common/Modal";
import type { Soldier } from "../../types/soldier";

type CreateDocumentModalProps = {
  soldier: Soldier;
  onClose: () => void;
  onVacationReport: () => void;
  onFamilyLeaveReport: () => void;
  onBankDetailsReport: () => void;
  onTrainingWithWeaponReport: () => void;
  onTrainingWithoutWeaponReport: () => void;
};

const CreateDocumentModal = ({
  soldier,
  onClose,
  onVacationReport,
  onFamilyLeaveReport,
  onBankDetailsReport,
  onTrainingWithWeaponReport,
  onTrainingWithoutWeaponReport,
}: CreateDocumentModalProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Створити документ">
      <div className="mb-5">
        <p className="text-sm text-zinc-500">Військовослужбовець</p>

        <p className="mt-1 font-semibold text-zinc-900">
          {soldier.lastName} {soldier.firstName} {soldier.patronymic}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          {soldier.rank} · {soldier.position}
        </p>
      </div>

      <p className="mb-3 text-sm font-medium text-zinc-700">
        Оберіть тип документа
      </p>

      <div className="max-h-[390px] space-y-3 overflow-y-auto pr-2">
        <button
          type="button"
          onClick={onVacationReport}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={20} className="text-zinc-700" />
          </div>

          <div>
            <p className="font-medium text-zinc-900">
              Щорічна основна відпустка
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Рапорт на щорічну основну відпустку
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onFamilyLeaveReport}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={20} className="text-zinc-700" />
          </div>

          <div>
            <p className="font-medium text-zinc-900">
              Відпустка за сімейними обставинами
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Рапорт на відпустку за сімейними обставинами
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={onBankDetailsReport}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={20} className="text-zinc-700" />
          </div>

          <div>
            <p className="font-medium text-zinc-900">
              Зарахування грошового забезпечення
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Рапорт на зарахування грошового забезпечення на банківський
              рахунок
            </p>
          </div>
        </button>
        <button
          type="button"
          onClick={onTrainingWithWeaponReport}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={20} className="text-zinc-700" />
          </div>

          <div>
            <p className="font-medium text-zinc-900">Навчання зі зброєю</p>

            <p className="mt-1 text-sm text-zinc-500">
              Рапорт на направлення на навчання зі зброєю
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={onTrainingWithoutWeaponReport}
          className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={20} className="text-zinc-700" />
          </div>

          <div>
            <p className="font-medium text-zinc-900">Навчання без зброї</p>

            <p className="mt-1 text-sm text-zinc-500">
              Рапорт на направлення на навчання без зброї
            </p>
          </div>
        </button>
      </div>
    </Modal>
  );
};

export default CreateDocumentModal;
