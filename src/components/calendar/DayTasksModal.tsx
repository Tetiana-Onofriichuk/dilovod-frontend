import Modal from "../common/Modal";
import type { Task } from "../../types/task";
import { Trash2 } from "lucide-react";

type DayTasksModalProps = {
  isOpen: boolean;
  date: string;
  tasks: Task[];
  onClose: () => void;
  onTaskClick: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggleCompleted: (task: Task) => void;
};

const DayTasksModal = ({
  isOpen,
  date,
  tasks,
  onClose,
  onTaskClick,
  onDelete,
  onToggleCompleted,
}: DayTasksModalProps) => {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "uk-UA",
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Завдання на ${formattedDate}`}
    >
      {tasks.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-zinc-500">На цей день завдань немає</p>
        </div>
      ) : (
        <div
          className={`space-y-3 ${
            tasks.length > 3 ? "max-h-[320px] overflow-y-auto pr-2" : ""
          }`}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <button
                type="button"
                onClick={() => onTaskClick(task)}
                className="min-w-0 flex-1 cursor-pointer text-left"
              >
                <p className="font-medium text-zinc-800">{task.title}</p>

                {task.description && (
                  <p className="mt-1 text-sm text-zinc-500">
                    {task.description}
                  </p>
                )}
              </button>

              <div className="flex shrink-0 items-center gap-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleCompleted(task)}
                  onClick={(event) => event.stopPropagation()}
                  aria-label={
                    task.completed
                      ? "Позначити завдання невиконаним"
                      : "Позначити завдання виконаним"
                  }
                  className="h-5 w-5 cursor-pointer accent-zinc-800"
                />

                <button
                  type="button"
                  onClick={() => onDelete(task)}
                  aria-label="Видалити завдання"
                  title="Видалити"
                  className="cursor-pointer rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
};

export default DayTasksModal;
