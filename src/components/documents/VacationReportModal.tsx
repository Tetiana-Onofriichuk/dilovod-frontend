import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../common/Modal";
import type { Soldier } from "../../types/soldier";
import { generateVacationReport } from "../../services/documentsApi";
import DatePicker from "../common/DatePicker";

type VacationReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};

const today = new Date().toLocaleDateString("en-CA");

const VacationReportModal = ({
  soldier,
  onClose,
}: VacationReportModalProps) => {
  const [formData, setFormData] = useState({
    days: "",
    travelDays: "2",
    startDate: "",
    address: soldier.address ?? "",
    transport: "залізничним транспортом",
    reportDate: today,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateEndDate = () => {
    if (!formData.startDate || !formData.days) {
      return "";
    }

    const days = Number(formData.days);

    if (days < 1) {
      return "";
    }

    const date = new Date(`${formData.startDate}T00:00:00`);

    date.setDate(date.getDate() + days - 1);

    return date.toLocaleDateString("en-CA");
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString("uk-UA");
  };

  const endDate = calculateEndDate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = await generateVacationReport({
      soldierId: soldier.id,
      days: formData.days,
      travelDays: formData.travelDays,
      startDate: formData.startDate,
      address: formData.address,
      transport: formData.transport,
      reportDate: formData.reportDate,
    });

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;
    link.download = `Рапорт_${soldier.lastName}_${formData.reportDate}.docx`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    onClose();

    URL.revokeObjectURL(url);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Рапорт на відпустку">
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
            htmlFor="days"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Кількість днів
          </label>

          <input
            id="days"
            type="number"
            name="days"
            min="1"
            value={formData.days}
            onChange={handleChange}
            required
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="travelDays"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Кількість діб на дорогу
          </label>

          <input
            id="travelDays"
            type="number"
            name="travelDays"
            min="0"
            value={formData.travelDays}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />

          <p className="mt-1.5 text-xs text-zinc-500">
            Для слідування до місця проведення відпустки та у зворотному
            напрямку
          </p>
        </div>

        <div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Дата початку відпустки
            </label>

            <DatePicker
              value={formData.startDate}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: value,
                }))
              }
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Дата закінчення відпустки
          </label>

          <input
            id="endDate"
            type="text"
            value={formatDate(endDate)}
            placeholder="Розрахується автоматично"
            readOnly
            className="w-full cursor-not-allowed rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-600 outline-none"
          />

          <p className="mt-1.5 text-xs text-zinc-500">
            Розраховується автоматично за кількістю днів
          </p>
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
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />

          <p className="mt-1.5 text-xs text-zinc-500">
            Заповнено з картки військовослужбовця. За потреби адресу можна
            змінити для цього рапорту.
          </p>
        </div>

        <div>
          <label
            htmlFor="transport"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Транспорт
          </label>

          <select
            id="transport"
            name="transport"
            value={formData.transport}
            onChange={handleChange}
            className="w-full cursor-pointer rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-500"
          >
            <option value="залізничним транспортом">
              Залізничний транспорт
            </option>

            <option value="автомобільним транспортом">
              Автомобільний транспорт
            </option>

            <option value="автобусом">Автобус</option>

            <option value="Інше">Інше</option>
          </select>
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

export default VacationReportModal;
