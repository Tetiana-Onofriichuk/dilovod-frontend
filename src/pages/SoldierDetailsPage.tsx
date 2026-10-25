import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Pencil,
  UserRound,
  Shield,
  FileText,
  Download,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getSoldierById } from "../services/soldiersApi";
import {
  downloadDocument,
  getSoldierDocuments,
} from "../services/documentsApi";

import type { Soldier } from "../types/soldier";
import type { Document } from "../types/document";

import EditSoldierModal from "../components/soldiers/EditSoldierModal";

const SoldierDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [soldier, setSoldier] = useState<Soldier | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const loadSoldier = async () => {
      if (!id) {
        setError("Не вдалося визначити військовослужбовця.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const soldierId = Number(id);

        const [soldierData, documentsData] = await Promise.all([
          getSoldierById(soldierId),
          getSoldierDocuments(soldierId),
        ]);

        setSoldier(soldierData);
        setDocuments(documentsData);
      } catch (error) {
        console.error("Помилка при завантаженні військовослужбовця:", error);

        setError("Не вдалося завантажити дані військовослужбовця.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSoldier();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-zinc-500">Завантаження...</div>
    );
  }

  if (error || !soldier) {
    return (
      <div>
        <button
          type="button"
          onClick={() => navigate("/soldiers")}
          className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          <ArrowLeft size={18} />
          Назад до списку
        </button>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          {error || "Військовослужбовця не знайдено."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate("/soldiers")}
        className="mb-2 flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-600 transition hover:text-zinc-900"
      >
        <ArrowLeft size={15} />
        Назад до списку
      </button>

      <div className="mb-3 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">
            {soldier.lastName} {soldier.firstName} {soldier.patronymic}
          </h1>

          <p className="mt-0.5 text-sm text-zinc-500">{soldier.rank}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#1c2530] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#273342]"
        >
          <Pencil size={12} />
          Редагувати
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
              <UserRound size={20} className="text-zinc-700" />
            </div>

            <h2 className="text-lg font-semibold text-zinc-900">
              Особисті дані
            </h2>
          </div>

          <div className="divide-y divide-zinc-100">
            <InfoRow label="Прізвище" value={soldier.lastName} />

            <InfoRow
              label="Прізвище у родовому відмінку"
              value={soldier.lastNameGenitive}
            />

            <InfoRow label="Імʼя" value={soldier.firstName} />

            <InfoRow label="По батькові" value={soldier.patronymic} />

            <InfoRow label="Номер телефону" value={soldier.phone} />

            <InfoRow label="Адреса проживання" value={soldier.address} />
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white px-6 py-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
              <Shield size={20} className="text-zinc-700" />
            </div>

            <h2 className="text-lg font-semibold text-zinc-900">
              Службові дані
            </h2>
          </div>

          <div className="divide-y divide-zinc-100">
            <InfoRow label="Військове звання" value={soldier.rank} />

            <InfoRow label="Посада" value={soldier.position} />

            <InfoRow
              label="Посада у родовому відмінку"
              value={soldier.positionGenitive}
            />

            <InfoRow label="Взвод" value={soldier.platoon} />

            <InfoRow label="Відділення" value={soldier.squad} />

            <InfoRow label="Зброя" value={soldier.weapon} />
          </div>
        </section>
      </div>

      <section className="mt-5 rounded-xl border border-zinc-200 bg-white px-6 py-2 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100">
            <FileText size={16} className="text-zinc-700" />
          </div>

          <div>
            <h2 className="text-base font-semibold leading-tight text-zinc-900">
              Документи
            </h2>

            <p className="mt-0.5 text-xs text-zinc-500">
              Документи, сформовані для військовослужбовця
            </p>
          </div>
        </div>

        {documents.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-200 px-4 py-6 text-center">
            <FileText size={28} className="mx-auto mb-2 text-zinc-300" />

            <p className="text-sm font-medium text-zinc-700">
              Документів поки немає
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              Для цього військовослужбовця ще не сформовано жодного документа.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <div className="grid grid-cols-[1fr_180px_60px] gap-4 bg-zinc-50 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
              <span>Документ</span>
              <span>Дата створення</span>
              <span className="text-center">Дії</span>
            </div>

            <div className="max-h-[150px] divide-y divide-zinc-100 overflow-y-auto">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="grid grid-cols-[1fr_180px_60px] items-center gap-4 px-4 py-1"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-zinc-900">
                      {document.title}
                    </p>
                  </div>

                  <span className="text-xs text-zinc-500">
                    {new Date(document.createdAt).toLocaleDateString("uk-UA")}
                  </span>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        downloadDocument(document.id, document.fileName)
                      }
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                      title="Завантажити документ"
                    >
                      <Download size={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {isEditModalOpen && (
        <EditSoldierModal
          soldier={soldier}
          onClose={() => setIsEditModalOpen(false)}
          onSoldierUpdated={(updatedSoldier) => {
            setSoldier(updatedSoldier);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

type InfoRowProps = {
  label: string;
  value?: string | null;
};

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="grid grid-cols-[190px_1fr] gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="text-[13px] text-zinc-500">{label}</span>

      <span className="text-[13px] font-medium text-zinc-900">
        {value || "—"}
      </span>
    </div>
  );
};

export default SoldierDetailsPage;
