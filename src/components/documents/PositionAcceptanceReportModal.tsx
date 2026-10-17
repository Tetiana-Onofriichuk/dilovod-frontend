import { useState, type FormEvent } from "react";

import Modal from "../common/Modal";
import DatePicker from "../common/DatePicker";

import type { Soldier } from "../../types/soldier";

import { generatePositionAcceptanceReport } from "../../services/documentsApi";

type PositionAcceptanceReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};

const today = new Date().toLocaleDateString("en-CA");

const PositionAcceptanceReportModal = ({
  soldier,
  onClose,
}: PositionAcceptanceReportModalProps) => {
  const [reportDate, setReportDate] = useState(today);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = await generatePositionAcceptanceReport({
      soldierId: soldier.id,
      reportDate,
    });

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;
    link.download = `Рапорт_прийняття_справ_${soldier.lastName}_${reportDate}.docx`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    onClose();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Рапорт про прийняття справ та посади"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Військовослужбовець
          </p>

          <p className="mt-1 font-semibold text-zinc-900">
            {soldier.lastName} {soldier.firstName} {soldier.patronymic}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {soldier.rank} · {soldier.position}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-zinc-200 pt-3 text-sm">
            <div>
              <span className="text-zinc-500">Взвод:</span>{" "}
              <span className="text-zinc-700">{soldier.platoon}</span>
            </div>

            <div>
              <span className="text-zinc-500">Відділення:</span>{" "}
              <span className="text-zinc-700">{soldier.squad}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Дата рапорту
          </label>

          <DatePicker value={reportDate} onChange={setReportDate} required />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Скасувати
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#1c2530] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#273342]"
          >
            Створити документ
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PositionAcceptanceReportModal;
