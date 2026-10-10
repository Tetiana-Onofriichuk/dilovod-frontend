import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";

import type { Requisites } from "../types/requisites";
import { getRequisites, updateRequisites } from "../services/requisitesApi";
import EditCommanderModal, {
  type CommanderData,
} from "../components/requisites/EditCommanderModal";

type CommanderType = "company" | "unit" | "finance";

export default function RequisitesPage() {
  const [requisites, setRequisites] = useState<Requisites | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommander, setEditingCommander] =
    useState<CommanderType | null>(null);

  useEffect(() => {
    const loadRequisites = async () => {
      try {
        const data = await getRequisites();
        setRequisites(data);
      } catch (error) {
        console.error("Помилка завантаження реквізитів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRequisites();
  }, []);

  const handleSaveCommander = async (data: CommanderData) => {
    if (!requisites || !editingCommander) return;

    try {
      const updatedRequisites = await updateRequisites({
        companyCommanderPosition:
          editingCommander === "company"
            ? data.position
            : requisites.companyCommanderPosition,

        companyCommanderRank:
          editingCommander === "company"
            ? data.rank
            : requisites.companyCommanderRank,

        companyCommanderFirstName:
          editingCommander === "company"
            ? data.firstName
            : requisites.companyCommanderFirstName,

        companyCommanderPatronymic:
          editingCommander === "company"
            ? (data.patronymic ?? "")
            : requisites.companyCommanderPatronymic,

        companyCommanderLastName:
          editingCommander === "company"
            ? data.lastName
            : requisites.companyCommanderLastName,

        companyCommanderLastNameGenitive:
          editingCommander === "company"
            ? (data.lastNameGenitive ?? "")
            : requisites.companyCommanderLastNameGenitive,

        unitCommanderPosition:
          editingCommander === "unit"
            ? data.position
            : requisites.unitCommanderPosition,

        unitCommanderRank:
          editingCommander === "unit"
            ? data.rank
            : requisites.unitCommanderRank,

        unitCommanderFirstName:
          editingCommander === "unit"
            ? data.firstName
            : requisites.unitCommanderFirstName,

        unitCommanderLastName:
          editingCommander === "unit"
            ? data.lastName
            : requisites.unitCommanderLastName,

        financeChiefPosition:
          editingCommander === "finance"
            ? data.position
            : requisites.financeChiefPosition,

        financeChiefRank:
          editingCommander === "finance"
            ? data.rank
            : requisites.financeChiefRank,

        financeChiefFirstName:
          editingCommander === "finance"
            ? data.firstName
            : requisites.financeChiefFirstName,

        financeChiefLastName:
          editingCommander === "finance"
            ? data.lastName
            : requisites.financeChiefLastName,
      });

      setRequisites(updatedRequisites);
      setEditingCommander(null);
    } catch (error) {
      console.error("Помилка збереження реквізитів:", error);
    }
  };

  if (isLoading) {
    return <p className="text-zinc-500">Завантаження...</p>;
  }

  let commanderData: CommanderData | null = null;

  if (requisites && editingCommander) {
    if (editingCommander === "company") {
      commanderData = {
        position: requisites.companyCommanderPosition,
        rank: requisites.companyCommanderRank,
        firstName: requisites.companyCommanderFirstName,
        patronymic: requisites.companyCommanderPatronymic,
        lastName: requisites.companyCommanderLastName,
        lastNameGenitive: requisites.companyCommanderLastNameGenitive,
      };
    }
    if (editingCommander === "unit") {
      commanderData = {
        position: requisites.unitCommanderPosition,
        rank: requisites.unitCommanderRank,
        firstName: requisites.unitCommanderFirstName,
        lastName: requisites.unitCommanderLastName,
      };
    }

    if (editingCommander === "finance") {
      commanderData = {
        position: requisites.financeChiefPosition,
        rank: requisites.financeChiefRank,
        firstName: requisites.financeChiefFirstName,
        lastName: requisites.financeChiefLastName,
      };
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Командний склад
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Актуальні дані посадових осіб для автоматичного формування документів
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CommanderCard
          title="Командир роти"
          position={requisites?.companyCommanderPosition}
          rank={requisites?.companyCommanderRank}
          firstName={requisites?.companyCommanderFirstName}
          lastName={requisites?.companyCommanderLastName}
          onEdit={() => setEditingCommander("company")}
        />

        <CommanderCard
          title="Командир військової частини"
          position={requisites?.unitCommanderPosition}
          rank={requisites?.unitCommanderRank}
          firstName={requisites?.unitCommanderFirstName}
          lastName={requisites?.unitCommanderLastName}
          onEdit={() => setEditingCommander("unit")}
        />

        <CommanderCard
          title="Начальник фінансово-економічної служби"
          position={requisites?.financeChiefPosition}
          rank={requisites?.financeChiefRank}
          firstName={requisites?.financeChiefFirstName}
          lastName={requisites?.financeChiefLastName}
          onEdit={() => setEditingCommander("finance")}
        />
      </div>

      {editingCommander && commanderData && (
        <EditCommanderModal
          title={
            editingCommander === "company"
              ? "Змінити командира роти"
              : editingCommander === "unit"
                ? "Змінити командира військової частини"
                : "Змінити начальника фінансово-економічної служби"
          }
          initialData={commanderData}
          showCompanyExtraFields={editingCommander === "company"}
          isOpen={true}
          onClose={() => setEditingCommander(null)}
          onSave={handleSaveCommander}
        />
      )}
    </div>
  );
}

type CommanderCardProps = {
  title: string;
  position?: string;
  rank?: string;
  firstName?: string;
  lastName?: string;
  onEdit?: () => void;
};

function CommanderCard({
  title,
  position,
  rank,
  firstName,
  lastName,
  onEdit,
}: CommanderCardProps) {
  const hasData = position || rank || firstName || lastName;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-800">
          {title}
        </h2>

        <button
          type="button"
          onClick={onEdit}
          className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          Змінити
        </button>
      </div>

      {hasData ? (
        <div>
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100">
              <UserRound size={21} className="text-zinc-600" />
            </div>

            <div>
              <p className="font-semibold text-zinc-900">
                {firstName} {lastName?.toUpperCase()}
              </p>

              <p className="text-sm text-zinc-500">{rank}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-zinc-100 pt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Посада
            </p>

            <p className="mt-1 text-sm text-zinc-700">{position}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">Дані ще не заповнені</p>
      )}
    </div>
  );
}
