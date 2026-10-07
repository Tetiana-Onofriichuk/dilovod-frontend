import { useState, type ChangeEvent, type FormEvent } from "react";
import Modal from "../common/Modal";
import { createSoldier } from "../../services/soldiersApi";
import type { Soldier } from "../../types/soldier";

type AddSoldierModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSoldierCreated: (soldier: Soldier) => void;
};

const AddSoldierModal = ({
  isOpen,
  onClose,
  onSoldierCreated,
}: AddSoldierModalProps) => {
  const [formData, setFormData] = useState({
    lastName: "",
    lastNameGenitive: "",
    firstName: "",
    patronymic: "",
    rank: "",
    position: "",
    platoon: "",
    squad: "",
    phone: "",
    address: "",
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

      const newSoldier = await createSoldier(formData);

      onSoldierCreated(newSoldier);

      setFormData({
        lastName: "",
        lastNameGenitive: "",
        firstName: "",
        patronymic: "",
        rank: "",
        position: "",
        platoon: "",
        squad: "",
        phone: "",
        address: "",
      });

      onClose();
    } catch (error) {
      console.error("Помилка при створенні військовослужбовця:", error);

      setError(
        "Не вдалося додати військовослужбовця. Перевірте введені дані та спробуйте ще раз.",
      );
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Додати військовослужбовця">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Прізвище
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>
        <div>
          <label
            htmlFor="lastNameGenitive"
            className="mb-1.5 block text-sm font-medium text-zinc-700"
          >
            Прізвище у родовому відмінку
          </label>

          <input
            id="lastNameGenitive"
            type="text"
            name="lastNameGenitive"
            value={formData.lastNameGenitive}
            onChange={handleChange}
            placeholder="Наприклад: Петренка"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Імʼя
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            По батькові
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Номер телефону
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Адреса проживання
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Область, район, населений пункт, вулиця, будинок"
            required
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Звання
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Посада
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Взвод
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
              name="platoon"
              value={formData.platoon}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Відділення
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
              name="squad"
              value={formData.squad}
              onChange={handleChange}
            />
          </div>
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
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
            {isSaving ? "Додавання..." : "Додати"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSoldierModal;
