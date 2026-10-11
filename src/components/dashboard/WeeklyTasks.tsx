import { useNavigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const days = [
  {
    day: "Пн",
    date: "12",
    tasks: ["Підготувати документи"],
  },
  {
    day: "Вт",
    date: "13",
    tasks: [],
  },
  {
    day: "Ср",
    date: "14",
    tasks: ["Перевірити рапорти", "Оновити дані"],
  },
  {
    day: "Чт",
    date: "15",
    tasks: [],
  },
  {
    day: "Пт",
    date: "16",
    tasks: ["Підготувати звіт"],
  },
  {
    day: "Сб",
    date: "17",
    tasks: [],
  },
  {
    day: "Нд",
    date: "18",
    tasks: [],
  },
];

const WeeklyTasks = () => {
  const navigate = useNavigate();
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
            key={item.day}
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
                item.tasks.slice(0, 2).map((task) => (
                  <div
                    key={task}
                    title={task}
                    className="truncate rounded-md bg-white px-2 py-1.5 text-xs text-zinc-700 shadow-sm"
                  >
                    {task}
                  </div>
                ))
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
