import { useEffect, useState } from "react";
import { CalendarDays, FileText, ShieldCheck, UsersRound } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import WeeklyTasks from "../components/dashboard/WeeklyTasks";

import { getSoldiers } from "../services/soldiersApi";
import { getRequisites } from "../services/requisitesApi";
import { getDocuments } from "../services/documentsApi";
import Clock from "../components/common/Clock";

import type { Document } from "../types/document";

const HomePage = () => {
  const [soldiersCount, setSoldiersCount] = useState(0);
  const [commandStaffCount, setCommandStaffCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const loadSoldiersCount = async () => {
      try {
        const response = await getSoldiers("", 1, 1);

        setSoldiersCount(response.total);
      } catch (error) {
        console.error(
          "Помилка завантаження кількості військовослужбовців:",
          error,
        );
      }
    };

    loadSoldiersCount();
  }, []);

  useEffect(() => {
    const loadCommandStaffCount = async () => {
      try {
        const requisites = await getRequisites();

        const commandStaff = [
          requisites.companyCommanderLastName,
          requisites.unitCommanderLastName,
          requisites.financeChiefLastName,
        ];

        const count = commandStaff.filter(
          (lastName) => lastName?.trim().length > 0,
        ).length;

        setCommandStaffCount(count);
      } catch (error) {
        console.error(
          "Помилка завантаження кількості командного складу:",
          error,
        );
      }
    };

    loadCommandStaffCount();
  }, []);

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await getDocuments();

        setDocuments(data);
        setDocumentsCount(data.length);
      } catch (error) {
        console.error("Помилка завантаження документів:", error);
      }
    };

    loadDocuments();
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900">Головна</h2>
          <p className="mt-2 text-zinc-500">Огляд основної інформації</p>
        </div>

        <Clock />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Військовослужбовці"
          value={soldiersCount}
          linkText="Перейти до списку"
          icon={UsersRound}
          to="/soldiers"
        />

        <StatCard
          title="Командний склад"
          value={commandStaffCount}
          linkText="Перейти до списку"
          icon={ShieldCheck}
          to="/command-staff"
        />

        <StatCard
          title="Документи"
          value={documentsCount}
          linkText="Перейти до документів"
          icon={FileText}
          to="/documents"
        />

        <StatCard
          title="Завдання на цей тиждень"
          value={7}
          linkText="Перейти до календаря"
          icon={CalendarDays}
        />
      </div>

      <RecentDocuments documents={documents} />

      <WeeklyTasks />
    </div>
  );
};

export default HomePage;
