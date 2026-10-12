import { useState, type FormEvent } from "react";

import { createTask, updateTask } from "../../services/tasksApi";
import type { Task } from "../../types/task";
import Modal from "../common/Modal";

type TaskModalProps = {
  isOpen: boolean;
  date: string;
  task?: Task;
  onClose: () => void;
  onCreated?: (task: Task) => void;
  onUpdated?: (task: Task) => void;
  onDelete?: (task: Task) => void;
};

const TaskModal = ({
  isOpen,
  date,
  task,
  onClose,
  onCreated,
  onUpdated,
  onDelete,
}: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");

  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "uk-UA",
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (task) {
        const updatedTask = await updateTask(task.id, {
          title: title.trim(),
          description: description.trim(),
          date,
        });

        onUpdated?.(updatedTask);
        return;
      }

      const newTask = await createTask({
        title: title.trim(),
        description: description.trim(),
        date,
      });

      onCreated?.(newTask);
      onClose();
    } catch (error) {
      console.error(
        task ? "Не вдалося оновити завдання:" : "Не вдалося створити завдання:",
        error,
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Редагувати завдання" : "Додати завдання"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Дата
          </label>

          <div className="rounded-lg border border-zinc-200 bg-zinc-100 px-3 py-2.5 text-sm text-zinc-700">
            {formattedDate}
          </div>
        </div>

        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Назва завдання
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Введіть назву завдання"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label
            htmlFor="task-description"
            className="mb-2 block text-sm font-medium text-zinc-700"
          >
            Опис
          </label>

          <textarea
            id="task-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Додайте опис за потреби"
            rows={4}
            className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none transition focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            {task && (
              <button
                type="button"
                onClick={() => onDelete?.(task)}
                className="cursor-pointer rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Видалити
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
            >
              Скасувати
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              {task ? "Зберегти" : "Додати"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default TaskModal;
