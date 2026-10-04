import Modal from "../common/Modal";

type AddSoldierModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddSoldierModal = ({ isOpen, onClose }: AddSoldierModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Додати військовослужбовця">
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Прізвище
          </label>
          <input
            type="text"
            autoFocus
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Імʼя
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            По батькові
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Звання
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">
            Посада
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Взвод
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">
              Відділення
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 outline-none transition focus:border-zinc-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Скасувати
          </button>

          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-[#1c2530] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#273342]"
          >
            Додати
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSoldierModal;
