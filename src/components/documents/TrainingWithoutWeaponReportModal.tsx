import { useState, type ChangeEvent, type FormEvent } from "react";
import { Plus, X, Search } from "lucide-react";

import Modal from "../common/Modal";
import DatePicker from "../common/DatePicker";
import type { Soldier } from "../../types/soldier";
import { getSoldiers } from "../../services/soldiersApi";
import { generateTrainingWithoutWeaponReport } from "../../services/documentsApi";

type TrainingWithoutWeaponReportModalProps = {
  soldier: Soldier;
  onClose: () => void;
};
type AdditionalSoldier = {
  soldier: Soldier;
  fullNameGenitive: string;
};
const today = new Date().toLocaleDateString("en-CA");

const TrainingWithoutWeaponReportModal = ({
  soldier,
  onClose,
}: TrainingWithoutWeaponReportModalProps) => {
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
  const [additionalSoldiers, setAdditionalSoldiers] = useState<
    AdditionalSoldier[]
  >([]);
  const [isAddingSoldier, setIsAddingSoldier] = useState(false);
  const [soldierSearch, setSoldierSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Soldier[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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

      const file = await generateTrainingWithoutWeaponReport({
        soldierIds: [
          soldier.id,
          ...additionalSoldiers.map((item) => item.soldier.id),
        ],
        startDate: formData.startDate,
        endDate: formData.endDate,
        destination: formData.destination,
        soldierFullNameGenitive: formData.soldierFullNameGenitive,
        additionalSoldiersGenitive: additionalSoldiers.map((item) => ({
          soldierId: item.soldier.id,
          fullNameGenitive: item.fullNameGenitive,
        })),
        trainingPurpose: formData.trainingPurpose,
        basis: formData.basis,
        reportDate: formData.reportDate,
        includeDryRation: formData.includeDryRation,
      });

      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Рапорт_навчання_без_зброї_${soldier.lastName}_${formData.reportDate}.docx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error(
        "Помилка при створенні рапорту на навчання без зброї:",
        error,
      );

      setError(
        "Не вдалося створити рапорт. Перевірте введені дані та спробуйте ще раз.",
      );
    } finally {
      setIsSaving(false);
    }
  };
  const handleSoldierSearch = async (value: string) => {
    setSoldierSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const response = await getSoldiers(value, 1, 10);

      const selectedIds = [
        soldier.id,
        ...additionalSoldiers.map((item) => item.soldier.id),
      ];
      setSearchResults(
        response.soldiers.filter((item) => !selectedIds.includes(item.id)),
      );
    } catch (error) {
      console.error("Помилка пошуку військовослужбовців:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddSoldier = (selectedSoldier: Soldier) => {
    setAdditionalSoldiers((prev) => [
      ...prev,
      {
        soldier: selectedSoldier,
        fullNameGenitive: `${selectedSoldier.lastNameGenitive ?? selectedSoldier.lastName} ${selectedSoldier.firstName} ${selectedSoldier.patronymic}`,
      },
    ]);

    setSoldierSearch("");
    setSearchResults([]);
    setIsAddingSoldier(false);
  };

  const handleRemoveSoldier = (soldierId: number) => {
    setAdditionalSoldiers((prev) =>
      prev.filter((item) => item.soldier.id !== soldierId),
    );
  };
  return (
    <Modal isOpen={true} onClose={onClose} title="Навчання без зброї">
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

        {additionalSoldiers.map((additionalItem) => {
          const additionalSoldier = additionalItem.soldier;

          return (
            <div
              key={additionalSoldier.id}
              className="relative rounded-lg border border-zinc-200 bg-white p-4"
            >
              <button
                type="button"
                onClick={() => handleRemoveSoldier(additionalSoldier.id)}
                className="absolute right-3 top-3 cursor-pointer rounded-md p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
                aria-label="Видалити військовослужбовця"
              >
                <X size={18} />
              </button>

              <p className="pr-8 font-semibold text-zinc-900">
                {additionalSoldier.lastName} {additionalSoldier.firstName}{" "}
                {additionalSoldier.patronymic}
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                {additionalSoldier.rank} · {additionalSoldier.position}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-zinc-200 pt-3 text-sm">
                <div>
                  <span className="text-zinc-500">Взвод:</span>{" "}
                  <span className="text-zinc-700">
                    {additionalSoldier.platoon}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500">Відділення:</span>{" "}
                  <span className="text-zinc-700">
                    {additionalSoldier.squad}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  ПІБ у родовому відмінку
                </label>

                <input
                  type="text"
                  value={additionalItem.fullNameGenitive}
                  onChange={(event) =>
                    setAdditionalSoldiers((prev) =>
                      prev.map((item) =>
                        item.soldier.id === additionalSoldier.id
                          ? {
                              ...item,
                              fullNameGenitive: event.target.value,
                            }
                          : item,
                      ),
                    )
                  }
                  placeholder="Наприклад: Іваненка Олега Миколайовича"
                  required
                  className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
                />
              </div>
            </div>
          );
        })}

        {isAddingSoldier ? (
          <div className="rounded-lg border border-zinc-200 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-700">
                Додати військовослужбовця
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsAddingSoldier(false);
                  setSoldierSearch("");
                  setSearchResults([]);
                }}
                className="cursor-pointer rounded-md p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative mt-3">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                value={soldierSearch}
                onChange={(event) =>
                  void handleSoldierSearch(event.target.value)
                }
                placeholder="Пошук за прізвищем..."
                autoFocus
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-10 pr-4 outline-none transition focus:border-zinc-500"
              />
            </div>

            {isSearching && (
              <p className="mt-3 text-sm text-zinc-500">Пошук...</p>
            )}

            {!isSearching && soldierSearch && searchResults.length === 0 && (
              <p className="mt-3 text-sm text-zinc-500">
                Військовослужбовця не знайдено
              </p>
            )}

            {searchResults.length > 0 && (
              <div className="mt-3 max-h-52 space-y-2 overflow-y-auto">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    type="button"
                    onClick={() => handleAddSoldier(result)}
                    className="w-full cursor-pointer rounded-lg border border-zinc-200 p-3 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    <p className="font-medium text-zinc-900">
                      {result.lastName} {result.firstName} {result.patronymic}
                    </p>

                    <p className="mt-1 text-sm text-zinc-500">
                      {result.rank} · {result.position}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAddingSoldier(true)}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-600 transition hover:border-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
          >
            <Plus size={18} />
            Додати військовослужбовця
          </button>
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
            placeholder="Наприклад: Іваненка Олега Миколайовича"
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
              align="right"
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
            placeholder="Військова частина, населений пункт, навчальний центр"
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
            placeholder="Наприклад: проходження фахової підготовки за ВОС..."
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
            placeholder="Наказ, розпорядження, номер та дата"
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
            disabled={isSaving}
            className="cursor-pointer rounded-lg bg-[#1c2530] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#273342] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Створення..." : "Створити документ"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TrainingWithoutWeaponReportModal;
