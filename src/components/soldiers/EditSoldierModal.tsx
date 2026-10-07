import { useState, type ChangeEvent, type FormEvent } from "react";

import Modal from "../common/Modal";
import { updateSoldier } from "../../services/soldiersApi";
import type { Soldier } from "../../types/soldier";

type EditSoldierModalProps = {
  soldier: Soldier;
  onClose: () => void;
  onSoldierUpdated: (soldier: Soldier) => void;
};

const EditSoldierModal = ({
  soldier,
  onClose,
  onSoldierUpdated,
}: EditSoldierModalProps) => {
  const [formData, setFormData] = useState({
    lastName: soldier.lastName,
    lastNameGenitive: soldier.lastNameGenitive ?? "",
    firstName: soldier.firstName,
    patronymic: soldier.patronymic,
    phone: soldier.phone,
    address: soldier.address ?? "",
    rank: soldier.rank,
    position: soldier.position,
    platoon: soldier.platoon,
    squad: soldier.squad,
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

      const updatedSoldier = await updateSoldier(soldier.id, formData);

      onSoldierUpdated(updatedSoldier);
      onClose();
    } catch (error) {
      console.error("Помилка при редагуванні військовослужбовця:", error);

      setError(
        "Не вдалося зберегти зміни. Перевірте введені дані та спробуйте ще раз.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const inputClassName =
    "w-full rounded-lg border border-zinc-300 px-4 py-3 outline-none transition focus:border-zinc-500";

  const labelClassName = "mb-1.5 block text-sm font-medium text-zinc-700";

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Редагувати військовослужбовця"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Прізвище
          </label>

          <input
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Наприклад: Петренко"
            required
            autoFocus
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="lastNameGenitive" className={labelClassName}>
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
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="firstName" className={labelClassName}>
            Ім&apos;я
          </label>

          <input
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Наприклад: Іван"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="patronymic" className={labelClassName}>
            По батькові
          </label>

          <input
            id="patronymic"
            type="text"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
            placeholder="Наприклад: Іванович"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClassName}>
            Номер телефону
          </label>

          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Наприклад: 0671234567"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="address" className={labelClassName}>
            Адреса проживання
          </label>

          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Область, район, населений пункт, вулиця, будинок"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="rank" className={labelClassName}>
            Військове звання
          </label>

          <input
            id="rank"
            type="text"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            placeholder="Наприклад: солдат"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label htmlFor="position" className={labelClassName}>
            Посада
          </label>

          <input
            id="position"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Наприклад: водій-машиніст екскаватора"
            required
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="platoon" className={labelClassName}>
              Взвод
            </label>

            <input
              id="platoon"
              type="text"
              name="platoon"
              value={formData.platoon}
              onChange={handleChange}
              placeholder="Взвод"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="squad" className={labelClassName}>
              Відділення
            </label>

            <input
              id="squad"
              type="text"
              name="squad"
              value={formData.squad}
              onChange={handleChange}
              placeholder="Відділення"
              required
              className={inputClassName}
            />
          </div>
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
            {isSaving ? "Збереження..." : "Зберегти зміни"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSoldierModal;
