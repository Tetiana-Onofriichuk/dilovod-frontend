import type { Soldier } from "../../types/soldier";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TruncatedText from "../common/TruncatedText";
import { Link } from "react-router-dom";

type SoldiersTableProps = {
  soldiers: Soldier[];
  onEdit: (soldier: Soldier) => void;
  onDelete: (soldier: Soldier) => void;
  onCreateDocument: (soldier: Soldier) => void;
};

const SoldiersTable = ({
  soldiers,
  onEdit,
  onDelete,
  onCreateDocument,
}: SoldiersTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openMenuId === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenuId]);
  return (
    <div className=" rounded-lg border border-zinc-200">
      <table className="w-full table-fixed text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-600">
          <tr>
            <th className="w-[22%] px-4 py-3 font-medium">ПІБ</th>
            <th className="w-[12%] px-4 py-3 font-medium">Телефон</th>
            <th className="w-[10%] px-4 py-3 font-medium">Звання</th>
            <th className="w-[16%] px-4 py-3 font-medium">Посада</th>
            <th className="w-[16%] px-4 py-3 font-medium">Взвод</th>
            <th className="w-[16%] px-4 py-3 font-medium">Відділення</th>
            <th className="w-[8%] px-4 py-3 text-center font-medium">Дії</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {soldiers.map((soldier) => (
            <tr key={soldier.id} className="transition hover:bg-zinc-50">
              <td className="px-4 py-4 font-medium">
                <Link
                  to={`/soldiers/${soldier.id}`}
                  className="text-zinc-900 transition hover:text-[#1c2530] hover:underline"
                >
                  {soldier.lastName} {soldier.firstName} {soldier.patronymic}
                </Link>
              </td>
              <td className="px-4 py-4 text-zinc-600">{soldier.phone}</td>

              <td className="px-4 py-4 text-zinc-600">{soldier.rank}</td>

              <td className="px-4 py-4 text-zinc-600">{soldier.position}</td>
              <td className="px-4 py-4 text-zinc-600">
                <TruncatedText text={soldier.platoon} />
              </td>

              <td className="px-4 py-4 text-zinc-600">
                <TruncatedText text={soldier.squad} />
              </td>

              <td className="px-4 py-4 text-center">
                <div
                  ref={openMenuId === soldier.id ? menuRef : null}
                  className="relative inline-block"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === soldier.id ? null : soldier.id,
                      )
                    }
                    className="cursor-pointer rounded-md px-2 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    •••
                  </button>

                  {openMenuId === soldier.id && (
                    <div className="absolute right-0 top-full z-20 mt-1 w-52 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 text-left shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          onCreateDocument(soldier);
                          setOpenMenuId(null);
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100"
                      >
                        <FileText size={17} />
                        Створити документ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onEdit(soldier);
                          setOpenMenuId(null);
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 transition hover:bg-zinc-100"
                      >
                        <Pencil size={17} />
                        Редагувати
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDelete(soldier);
                          setOpenMenuId(null);
                        }}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={17} />
                        Видалити
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoldiersTable;
