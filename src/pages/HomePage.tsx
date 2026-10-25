import { useEffect, useState } from "react";
import { CalendarDays, FileText, ShieldCheck, UsersRound } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import WeeklyTasks from "../components/dashboard/WeeklyTasks";
import Clock from "../components/common/Clock";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";
import TaskModal from "../components/calendar/TaskModal";
import DayTasksModal from "../components/calendar/DayTasksModal";

import { getSoldiers } from "../services/soldiersApi";
import { getRequisites } from "../services/requisitesApi";
import { getDocuments } from "../services/documentsApi";
import { deleteTask, getTasks, updateTask } from "../services/tasksApi";

import type { Document } from "../types/document";
import type { Task } from "../types/task";

const HomePage = () => {
  const [soldiersCount, setSoldiersCount] = useState(0);
  const [commandStaffCount, setCommandStaffCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);

  const [documents, setDocuments] = useState<Document[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasksListDate, setTasksListDate] = useState<string | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();

        setTasks(data);
      } catch (error) {
        console.error("Помилка завантаження завдань:", error);
      }
    };

    void loadTasks();
  }, []);

  const today = new Date();

  const monday = new Date(today);
  const currentDay = today.getDay();
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

  monday.setDate(today.getDate() - daysFromMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weeklyTasksCount = tasks.filter((task) => {
    const taskDate = new Date(`${task.date}T00:00:00`);

    return taskDate >= monday && taskDate <= sunday;
  }).length;

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const overdueTasksCount = tasks.filter(
    (task) => task.date < todayString && !task.completed,
  ).length;

  return (
    <div>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Головна</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Огляд основної інформації
          </p>
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
          value={weeklyTasksCount}
          linkText="Перейти до календаря"
          icon={CalendarDays}
          to="/calendar"
          statusText={
            overdueTasksCount > 0
              ? `${overdueTasksCount} прострочено`
              : undefined
          }
        />
      </div>

      <RecentDocuments documents={documents} />

      <WeeklyTasks
        tasks={tasks}
        onTaskClick={(task) => {
          setSelectedTask(task);
        }}
        onDayClick={(date) => {
          setTasksListDate(date);
        }}
      />

      {tasksListDate && (
        <DayTasksModal
          isOpen={true}
          date={tasksListDate}
          tasks={tasks.filter((task) => task.date === tasksListDate)}
          onClose={() => setTasksListDate(null)}
          onTaskClick={(task) => {
            setTasksListDate(null);
            setSelectedTask(task);
          }}
          onDelete={(task) => {
            setTaskToDelete(task);
          }}
          onToggleCompleted={async (task) => {
            try {
              const updatedTask = await updateTask(task.id, {
                completed: !task.completed,
              });

              setTasks((prevTasks) =>
                prevTasks.map((currentTask) =>
                  currentTask.id === updatedTask.id ? updatedTask : currentTask,
                ),
              );
            } catch (error) {
              console.error("Не вдалося змінити статус завдання:", error);
            }
          }}
        />
      )}

      {selectedTask && (
        <TaskModal
          isOpen={true}
          date={selectedTask.date}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={(updatedTask) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
              ),
            );

            setSelectedTask(updatedTask);
          }}
          onDelete={(task) => {
            setTaskToDelete(task);
          }}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmModal
          title="Видалити завдання?"
          onClose={() => setTaskToDelete(null)}
          onConfirm={async () => {
            await deleteTask(taskToDelete.id);

            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== taskToDelete.id),
            );

            setSelectedTask(null);
            setTaskToDelete(null);
          }}
        >
          <p className="text-sm text-zinc-700">
            Ви впевнені, що хочете видалити завдання{" "}
            <span className="font-medium">«{taskToDelete.title}»</span>?
          </p>
        </DeleteConfirmModal>
      )}
    </div>
  );
};

export default HomePage;
