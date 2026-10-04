import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import { getSoldiers } from "../services/soldiersApi";
import type { Soldier } from "../types/soldier";
import SoldiersTable from "../components/soldiers/SoldiersTable";
import AddSoldierModal from "../components/soldiers/AddSoldierModal";

const SoldiersPage = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchSoldiers = async () => {
      try {
        const data = await getSoldiers();
        setSoldiers(data.soldiers);
      } catch (error) {
        console.error("Помилка отримання військовослужбовців:", error);
      }
    };

    fetchSoldiers();
  }, []);
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900">
            Військовослужбовці
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Управління особовим складом
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1c2530] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#273342]"
        >
          <Plus size={18} />
          Додати військовослужбовця
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Пошук за прізвищем..."
            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400"
          />
        </div>

        <div className="mt-6">
          <SoldiersTable soldiers={soldiers} />
        </div>
      </div>
      <AddSoldierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default SoldiersPage;
