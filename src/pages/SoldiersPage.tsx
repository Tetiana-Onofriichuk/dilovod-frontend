import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import { getSoldiers } from "../services/soldiersApi";
import type { Soldier } from "../types/soldier";
import SoldiersTable from "../components/soldiers/SoldiersTable";
import AddSoldierModal from "../components/soldiers/AddSoldierModal";
import EditSoldierModal from "../components/soldiers/EditSoldierModal";
import DeleteSoldierModal from "../components/soldiers/DeleteSoldierModal";
import CreateDocumentModal from "../components/documents/CreateDocumentModal";
import VacationReportModal from "../components/documents/VacationReportModal";
import FamilyLeaveReportModal from "../components/documents/FamilyLeaveReportModal";

const SoldiersPage = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSoldier, setEditingSoldier] = useState<Soldier | null>(null);
  const [deletingSoldier, setDeletingSoldier] = useState<Soldier | null>(null);

  const [documentSoldier, setDocumentSoldier] = useState<Soldier | null>(null);

  const [vacationReportSoldier, setVacationReportSoldier] =
    useState<Soldier | null>(null);

  const [familyLeaveReportSoldier, setFamilyLeaveReportSoldier] =
    useState<Soldier | null>(null);

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
          <SoldiersTable
            soldiers={soldiers}
            onEdit={(soldier) => setEditingSoldier(soldier)}
            onDelete={(soldier) => setDeletingSoldier(soldier)}
            onCreateDocument={(soldier) => setDocumentSoldier(soldier)}
          />
        </div>
      </div>

      <AddSoldierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSoldierCreated={(newSoldier) => {
          setSoldiers((prev) => [...prev, newSoldier]);
        }}
      />

      {editingSoldier && (
        <EditSoldierModal
          soldier={editingSoldier}
          onClose={() => setEditingSoldier(null)}
          onSoldierUpdated={(updatedSoldier) => {
            setSoldiers((prev) =>
              prev.map((soldier) =>
                soldier.id === updatedSoldier.id ? updatedSoldier : soldier,
              ),
            );

            setEditingSoldier(null);
          }}
        />
      )}

      {deletingSoldier && (
        <DeleteSoldierModal
          soldier={deletingSoldier}
          onClose={() => setDeletingSoldier(null)}
          onSoldierDeleted={(id) => {
            setSoldiers((prev) => prev.filter((soldier) => soldier.id !== id));

            setDeletingSoldier(null);
          }}
        />
      )}

      {documentSoldier && (
        <CreateDocumentModal
          soldier={documentSoldier}
          onClose={() => setDocumentSoldier(null)}
          onVacationReport={() => {
            setVacationReportSoldier(documentSoldier);
            setDocumentSoldier(null);
          }}
          onFamilyLeaveReport={() => {
            setFamilyLeaveReportSoldier(documentSoldier);
            setDocumentSoldier(null);
          }}
        />
      )}

      {vacationReportSoldier && (
        <VacationReportModal
          soldier={vacationReportSoldier}
          onClose={() => setVacationReportSoldier(null)}
        />
      )}

      {familyLeaveReportSoldier && (
        <FamilyLeaveReportModal
          soldier={familyLeaveReportSoldier}
          onClose={() => setFamilyLeaveReportSoldier(null)}
        />
      )}
    </div>
  );
};

export default SoldiersPage;
