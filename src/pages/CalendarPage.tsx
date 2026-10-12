import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import { CalendarDays } from "lucide-react";
import "./CalendarPage.css";
import { useEffect, useState, useMemo } from "react";

import type { Task } from "../types/task";
import { deleteTask, getTasks, updateTask } from "../services/tasksApi";
import TaskModal from "../components/calendar/TaskModal";
import DayTasksModal from "../components/calendar/DayTasksModal";
import DeleteConfirmModal from "../components/common/DeleteConfirmModal";

const CalendarPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [tasksListDate, setTasksListDate] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Не вдалося завантажити завдання:", error);
      }
    };

    void loadTasks();
  }, []);

  const sortedTasks = useMemo(
    () =>
      [...tasks].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      ),
    [tasks],
  );
  const events = useMemo(
    () =>
      sortedTasks.map((task) => ({
        id: String(task.id),
        title: task.title,
        date: task.date,
        createdAt: task.createdAt,
        extendedProps: {
          completed: task.completed,
        },
      })),
    [sortedTasks],
  );

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays size={28} className="text-zinc-700" />

          <h2 className="text-2xl font-semibold text-zinc-900">Календар</h2>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          Планування та контроль завдань
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ukLocale}
          firstDay={1}
          height="auto"
          dayMaxEvents={2}
          eventOrder="createdAt"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          events={events}
          eventContent={(eventInfo) => {
            const completed = eventInfo.event.extendedProps.completed;

            const today = new Date();
            const todayString = `${today.getFullYear()}-${String(
              today.getMonth() + 1,
            ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

            const taskDate = eventInfo.event.startStr;

            const isOverdue = taskDate < todayString && !completed;

            return (
              <div className="flex min-w-0 items-center gap-1 overflow-hidden">
                {completed && <span className="shrink-0">✓</span>}

                {isOverdue && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-red-400" />
                )}

                <span className={`truncate ${isOverdue ? "text-red-100" : ""}`}>
                  {eventInfo.event.title}
                </span>
              </div>
            );
          }}
          eventClick={(info) => {
            const taskId = Number(info.event.id);

            const task = tasks.find((task) => task.id === taskId);

            if (task) {
              setSelectedTask(task);
            }
          }}
          dateClick={(info) => {
            const dayCell = info.dayEl.getBoundingClientRect();

            const clickX = info.jsEvent.clientX - dayCell.left;
            const clickY = info.jsEvent.clientY - dayCell.top;

            const isAddButtonClick =
              clickX >= 0 && clickX <= 34 && clickY >= 0 && clickY <= 30;

            if (isAddButtonClick) {
              setSelectedDate(info.dateStr);
              return;
            }

            setTasksListDate(info.dateStr);
          }}
          moreLinkClick={(info) => {
            setTasksListDate(info.date.toLocaleDateString("en-CA"));
            return "none";
          }}
        />
      </section>
      {selectedDate && (
        <TaskModal
          isOpen={true}
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onCreated={(newTask) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);
          }}
        />
      )}

      {tasksListDate && (
        <DayTasksModal
          isOpen={true}
          date={tasksListDate}
          tasks={sortedTasks.filter((task) => task.date === tasksListDate)}
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

export default CalendarPage;
