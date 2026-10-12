import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

import type { Task } from "../../types/task";
type WeeklyTasksProps = {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDayClick: (date: string) => void;
};

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const WeeklyTasks = ({ tasks, onTaskClick, onDayClick }: WeeklyTasksProps) => {
  const navigate = useNavigate();

  const days = useMemo(() => {
    const today = new Date();

    const monday = new Date(today);
    const currentDay = today.getDay();

    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;

    monday.setDate(today.getDate() - daysFromMonday);
    monday.setHours(0, 0, 0, 0);

    return dayNames.map((dayName, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const dateString = formatDate(date);

      return {
        day: dayName,
        date: String(date.getDate()),
        dateString,
        tasks: tasks.filter((task) => task.date === dateString),
      };
    });
  }, [tasks]);

  return (
    <section className="mt-4 rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3">
        <div>
          <h3 className="font-semibold text-zinc-900">
            Завдання на цей тиждень
          </h3>

          <p className="mt-0.5 text-xs text-zinc-500">
            Планування та важливі події
          </p>
        </div>

        <button
          type="button"
          className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
          onClick={() => navigate("/calendar")}
        >
          <CalendarDays size={16} />
          Календар на місяць →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 p-4">
        {days.map((item) => (
          <div
            key={`${item.day}-${item.date}`}
            onClick={() => onDayClick(item.dateString)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-2.5"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-zinc-500">
                {item.day}
              </span>

              <span className="text-sm font-semibold text-zinc-900">
                {item.date}
              </span>
            </div>

            <div className="mt-2 space-y-1">
              {item.tasks.length > 0 ? (
                <>
                  {item.tasks.slice(0, 2).map((task) => (
                    <button
                      key={task.id}
                      type="button"
                      title={task.title}
                      onClick={(event) => {
                        event.stopPropagation();
                        onTaskClick(task);
                      }}
                      className="block w-full cursor-pointer truncate rounded-md bg-white px-2 py-1.5 text-left text-xs text-zinc-700 shadow-sm transition hover:bg-zinc-100"
                    >
                      {task.completed && "✓ "}
                      {task.title}
                    </button>
                  ))}

                  {item.tasks.length > 2 && (
                    <p className="px-1 text-xs text-zinc-500">
                      + ще {item.tasks.length - 2}...
                    </p>
                  )}
                </>
              ) : (
                <p className="py-1.5 text-xs text-zinc-400">—</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyTasks;
