import { useState, type ChangeEvent, type FormEvent } from "react";

import Modal from "../common/Modal";
import DatePicker from "../common/DatePicker";
import type { Soldier } from "../../types/soldier";
import { generateTrainingWithWeaponReport } from "../../services/documentsApi";

type TrainingWithWeaponReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};

const today = new Date().toLocaleDateString("en-CA");

const TrainingWithWeaponReportModal = ({
  soldier,
  onClose,
}: TrainingWithWeaponReportModalProps) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    destination: "",
    soldierFullNameGenitive: `${soldier.lastNameGenitive ?? soldier.lastName} ${soldier.firstName} ${soldier.patronymic}`,
    trainingPurpose: "",
    basis: "",
    reportDate: today,
    includeDryRation: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError("");

      const file = await generateTrainingWithWeaponReport({
        soldierId: soldier.id,
        startDate: formData.startDate,
        endDate: formData.endDate,
        destination: formData.destination,
        soldierFullNameGenitive: formData.soldierFullNameGenitive,
        trainingPurpose: formData.trainingPurpose,
        basis: formData.basis,
        reportDate: formData.reportDate,
        includeDryRation: formData.includeDryRation,
      });

      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Рапорт_навчання_зі_зброєю_${soldier.lastName}_${formData.reportDate}.docx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error("Помилка при створенні рапорту на навчання:", error);

      setError(
        "Не вдалося створити рапорт. Перевірте введені дані та спробуйте ще раз.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Навчання зі зброєю">
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
              <span className="text-zinc-500">Зброя:</span>{" "}
              <span className="font-medium text-zinc-700">
                {soldier.weapon || "Не вказано"}
              </span>
            </div>
          </div>
        </div>

        {!soldier.weapon && (
          <div className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
            У картці військовослужбовця не вказана зброя. Додайте її перед
            створенням цього рапорту.
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            ПІБ у родовому відмінку
          </label>

          <input
            type="text"
            name="soldierFullNameGenitive"
            value={formData.soldierFullNameGenitive}
            onChange={handleChange}
            placeholder="Прізвище, ім'я та по батькові у потрібному відмінку"
            required
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Дата початку навчання
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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-700">
              Дата закінчення навчання
            </label>

            <DatePicker
              value={formData.endDate}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  endDate: value,
                }))
              }
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="destination"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Місце навчання
          </label>

          <input
            id="destination"
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Військова частина, населений пункт, полігон"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="trainingPurpose"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Мета навчання
          </label>

          <input
            id="trainingPurpose"
            type="text"
            name="trainingPurpose"
            value={formData.trainingPurpose}
            onChange={handleChange}
            placeholder="Наприклад: проходження базової загальновійськової підготовки..."
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="basis"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Підстава
          </label>

          <input
            id="basis"
            type="text"
            name="basis"
            value={formData.basis}
            onChange={handleChange}
            placeholder="Розпорядження, номер та дата"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 p-4 transition hover:bg-zinc-50">
          <input
            type="checkbox"
            checked={formData.includeDryRation}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                includeDryRation: event.target.checked,
              }))
            }
            className="mt-0.5 h-4 w-4 cursor-pointer"
          />

          <span className="text-sm text-zinc-700">
            Видати повсякденний набір сухих продуктів на 1 добу
          </span>
        </label>

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

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Скасувати
          </button>

          <button
            type="submit"
            disabled={isSaving || !soldier.weapon}
            className="cursor-pointer rounded-lg bg-[#1c2530] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#273342] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Створення..." : "Створити документ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TrainingWithWeaponReportModal;
