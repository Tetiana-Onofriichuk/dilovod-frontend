import type { Soldier } from "../../types/soldier";

type SoldiersTableProps = {
  soldiers: Soldier[];
};

const SoldiersTable = ({ soldiers }: SoldiersTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-600">
          <tr>
            <th className="px-4 py-3 font-medium">ПІБ</th>
            <th className="px-4 py-3 font-medium">Звання</th>
            <th className="px-4 py-3 font-medium">Посада</th>
            <th className="px-4 py-3 font-medium">Взвод</th>
            <th className="px-4 py-3 font-medium">Відділення</th>
            <th className="px-4 py-3 text-center font-medium">Дії</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-200">
          {soldiers.map((soldier) => (
            <tr key={soldier.id} className="transition hover:bg-zinc-50">
              <td className="px-4 py-4 font-medium text-zinc-900">
                {soldier.lastName} {soldier.firstName} {soldier.patronymic}
              </td>

              <td className="px-4 py-4 text-zinc-600">{soldier.rank}</td>

              <td className="px-4 py-4 text-zinc-600">{soldier.position}</td>

              <td className="px-4 py-4 text-zinc-600">{soldier.platoon}</td>

              <td className="px-4 py-4 text-zinc-600">{soldier.squad}</td>

              <td className="px-4 py-4 text-center">
                <button
                  type="button"
                  className="cursor-pointer text-zinc-500 transition hover:text-zinc-900"
                >
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoldiersTable;
