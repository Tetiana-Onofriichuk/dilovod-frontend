import { useEffect, useState } from "react";
import { ArrowLeft, Pencil, UserRound, Shield } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { getSoldierById } from "../services/soldiersApi";
import type { Soldier } from "../types/soldier";
import EditSoldierModal from "../components/soldiers/EditSoldierModal";

const SoldierDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [soldier, setSoldier] = useState<Soldier | null>(null);
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

        const data = await getSoldierById(Number(id));
        setSoldier(data);
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
        className="mb-6 flex cursor-pointer items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
      >
        <ArrowLeft size={18} />
        Назад до списку
      </button>

      <div className="mb-8 flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">
            {soldier.lastName} {soldier.firstName} {soldier.patronymic}
          </h1>

          <p className="mt-2 text-zinc-500">{soldier.rank}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#1c2530] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#273342]"
        >
          <Pencil size={17} />
          Редагувати
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
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

        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
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

            <InfoRow label="Взвод" value={soldier.platoon} />

            <InfoRow label="Відділення" value={soldier.squad} />
          </div>
        </section>
      </div>
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
    <div className="grid grid-cols-[200px_1fr] gap-4 py-4 first:pt-0 last:pb-0">
      <span className="text-sm text-zinc-500">{label}</span>

      <span className="text-sm font-medium text-zinc-900">{value || "—"}</span>
    </div>
  );
};

export default SoldierDetailsPage;
