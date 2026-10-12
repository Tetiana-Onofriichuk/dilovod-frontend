import { useEffect, useState } from "react";
import { Search, UserRound } from "lucide-react";

import Modal from "../common/Modal";
import { getSoldiers } from "../../services/soldiersApi";
import type { Soldier } from "../../types/soldier";

type SelectSoldierModalProps = {
  onClose: () => void;
  onSelect: (soldier: Soldier) => void;
};

const SelectSoldierModal = ({ onClose, onSelect }: SelectSoldierModalProps) => {
  const [search, setSearch] = useState("");
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true);

        const data = await getSoldiers(search, 1, 20);

        setSoldiers(data.soldiers);
      } catch (error) {
        console.error("Помилка при завантаженні військовослужбовців:", error);

        setSoldiers([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <Modal isOpen={true} onClose={onClose} title="Оберіть військовослужбовця">
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Пошук за прізвищем..."
          autoFocus
          className="w-full rounded-lg border border-zinc-300 py-3 pl-10 pr-4 outline-none transition focus:border-zinc-500"
        />
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-sm text-zinc-500">
          Завантаження...
        </div>
      ) : soldiers.length === 0 ? (
        <div className="py-8 text-center">
          <UserRound size={32} className="mx-auto mb-3 text-zinc-300" />

          <p className="text-sm font-medium text-zinc-700">
            Нічого не знайдено
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Спробуйте ввести інше прізвище
          </p>
        </div>
      ) : (
        <div
          className={`space-y-2 ${
            soldiers.length > 5 ? "max-h-[360px] overflow-y-auto pr-2" : ""
          }`}
        >
          {soldiers.map((soldier) => (
            <button
              key={soldier.id}
              type="button"
              onClick={() => onSelect(soldier)}
              className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                <UserRound size={20} className="text-zinc-700" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-900">
                  {soldier.lastName} {soldier.firstName} {soldier.patronymic}
                </p>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  {soldier.rank} · {soldier.position}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default SelectSoldierModal;
