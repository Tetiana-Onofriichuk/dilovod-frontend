import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../common/Modal";
import type { Soldier } from "../../types/soldier";
import { generateFamilyLeaveReport } from "../../documents/familyLeaveReport";
import { getRequisites } from "../../services/requisitesApi";

type FamilyLeaveReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};

const today = new Date().toLocaleDateString("en-CA");

const FamilyLeaveReportModal = ({
  soldier,
  onClose,
}: FamilyLeaveReportModalProps) => {
  const [formData, setFormData] = useState({
    leaveReason: "",
    days: "",
    startDate: "",
    address: "",
    attachment: "",
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

    const requisites = await getRequisites();

    await generateFamilyLeaveReport({
      soldier,
      requisites,
      leaveReason: formData.leaveReason,
      days: formData.days,
      startDate: formData.startDate,
      address: formData.address,
      attachment: formData.attachment,
      reportDate: formData.reportDate,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Відпустка за сімейними обставинами"
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
            htmlFor="leaveReason"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Причина відпустки(в зв'язку з...)
          </label>

          <input
            id="leaveReason"
            type="text"
            name="leaveReason"
            value={formData.leaveReason}
            onChange={handleChange}
            placeholder="Наприклад: госпіталізацією батька на лікування"
            required
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="days"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Кількість діб
          </label>

          <input
            id="days"
            type="number"
            name="days"
            min="1"
            value={formData.days}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="startDate"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Дата початку відпустки
          </label>

          <input
            id="startDate"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Адреса проведення відпустки
          </label>

          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Вулиця, будинок, населений пункт, область"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="attachment"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Документ, що додається до рапорту
          </label>

          <input
            id="attachment"
            type="text"
            name="attachment"
            value={formData.attachment}
            onChange={handleChange}
            placeholder="Наприклад: Довідка про госпіталізацію"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="reportDate"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Дата рапорту
          </label>

          <input
            id="reportDate"
            type="date"
            name="reportDate"
            value={formData.reportDate}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
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

export default FamilyLeaveReportModal;
