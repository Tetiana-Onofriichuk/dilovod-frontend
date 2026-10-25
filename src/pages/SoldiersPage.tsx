import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";

import { getSoldiers } from "../services/soldiersApi";

import type { Soldier } from "../types/soldier";
import type { DocumentTemplate } from "../config/documentTemplates";

import SoldiersTable from "../components/soldiers/SoldiersTable";
import AddSoldierModal from "../components/soldiers/AddSoldierModal";
import EditSoldierModal from "../components/soldiers/EditSoldierModal";
import DeleteSoldierModal from "../components/soldiers/DeleteSoldierModal";

import CreateDocumentModal from "../components/documents/CreateDocumentModal";
import DocumentGenerator from "../components/documents/DocumentGenerator";

const SoldiersPage = () => {
  const [soldiers, setSoldiers] = useState<Soldier[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSoldier, setEditingSoldier] = useState<Soldier | null>(null);
  const [deletingSoldier, setDeletingSoldier] = useState<Soldier | null>(null);
  const [documentSoldier, setDocumentSoldier] = useState<Soldier | null>(null);

  const [selectedTemplate, setSelectedTemplate] =
    useState<DocumentTemplate | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchSoldiers = async () => {
      try {
        const data = await getSoldiers(debouncedSearch);
        setSoldiers(data.soldiers);
      } catch (error) {
        console.error("Помилка отримання військовослужбовців:", error);
      }
    };

    fetchSoldiers();
  }, [debouncedSearch]);

  const handleOpenCreateDocument = (soldier: Soldier) => {
    setDocumentSoldier(soldier);
    setSelectedTemplate(null);
  };

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCloseDocument = () => {
    setDocumentSoldier(null);
    setSelectedTemplate(null);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden">
      <div className="mb-6 flex shrink-0 items-center justify-between">
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

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white p-6 shadow-sm">
        <div className="relative max-w-md shrink-0">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Пошук за прізвищем..."
            className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400"
          />
        </div>

        <div className="mt-6 max-h-[calc(100vh-250px)] overflow-y-auto">
          <SoldiersTable
            soldiers={soldiers}
            onEdit={(soldier) => setEditingSoldier(soldier)}
            onDelete={(soldier) => setDeletingSoldier(soldier)}
            onCreateDocument={handleOpenCreateDocument}
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

      {documentSoldier && !selectedTemplate && (
        <CreateDocumentModal
          soldier={documentSoldier}
          onClose={handleCloseDocument}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {documentSoldier && selectedTemplate && (
        <DocumentGenerator
          soldier={documentSoldier}
          template={selectedTemplate}
          onClose={handleCloseDocument}
        />
      )}
    </div>
  );
};

export default SoldiersPage;
