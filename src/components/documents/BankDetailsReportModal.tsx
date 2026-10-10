import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../common/Modal";
import type { Soldier } from "../../types/soldier";
import { generateBankDetailsReport } from "../../services/documentsApi";
import DatePicker from "../common/DatePicker";

type BankDetailsReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};

const today = new Date().toLocaleDateString("en-CA");

const BankDetailsReportModal = ({
  soldier,
  onClose,
}: BankDetailsReportModalProps) => {
  const [formData, setFormData] = useState({
    bankAccount: "",
    bankName: "",
    reportDate: today,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = await generateBankDetailsReport({
      soldierId: soldier.id,
      bankAccount: formData.bankAccount,
      bankName: formData.bankName,
      reportDate: formData.reportDate,
    });

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Рапорт_банківські_реквізити_${soldier.lastName}_${formData.reportDate}.docx`;

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
      title="Зарахування грошового забезпечення"
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

            <div className="col-span-2">
              <span className="text-zinc-500">Телефон:</span>{" "}
              <span className="font-medium text-zinc-700">{soldier.phone}</span>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="bankAccount"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Номер банківського рахунку
          </label>

          <input
            id="bankAccount"
            type="text"
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="Наприклад: UA123456789012345678901234567"
            required
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="bankName"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Назва банку
          </label>

          <input
            id="bankName"
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder='Наприклад: АТ КБ "ПриватБанк"'
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Дата рапорту
          </label>

          <DatePicker
            value={formData.reportDate}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                reportDate: value,
              }))
            }
            required
          />
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

export default BankDetailsReportModal;
