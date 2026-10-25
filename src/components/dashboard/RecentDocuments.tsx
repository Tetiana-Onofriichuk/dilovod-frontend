import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

import type { Document } from "../../types/document";

type RecentDocumentsProps = {
  documents: Document[];
};

const documentTypeLabels: Record<string, string> = {
  vacation: "Відпустка",
  "family-leave": "Сімейні обставини",
  "bank-details": "Банківські реквізити",
  "training-with-weapon": "Навчання зі зброєю",
  "training-without-weapon": "Навчання без зброї",
};

const RecentDocuments = ({ documents }: RecentDocumentsProps) => {
  const recentDocuments = documents.slice(0, 4);

  return (
    <section className="mt-3 rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-2">
        <div>
          <h3 className="font-semibold text-zinc-900">Останні документи</h3>

          <p className="mt-0.5 text-xs text-zinc-500">
            Нещодавно створені документи
          </p>
        </div>

        <Link
          to="/documents"
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          Всі документи →
        </Link>
      </div>

      {recentDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-8 text-zinc-500">
          <FileText size={28} />

          <p className="mt-2 text-sm">Документів поки немає</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left">
                <th className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Назва документа
                </th>

                <th className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Тип рапорту
                </th>

                <th className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Військовослужбовець
                </th>

                <th className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Дата створення
                </th>
              </tr>
            </thead>

            <tbody>
              {recentDocuments.map((document) => (
                <tr
                  key={document.id}
                  className="border-b border-zinc-100 last:border-b-0"
                >
                  <td className="px-5 py-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                        <FileText size={16} />
                      </div>

                      <span className="text-sm font-medium text-zinc-800">
                        {document.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-2 text-sm text-zinc-600">
                    {documentTypeLabels[document.type] ?? document.type}
                  </td>

                  <td className="px-5 py-2 text-sm text-zinc-600">
                    {document.soldiers
                      .map(
                        (soldier) =>
                          `${soldier.lastName} ${soldier.firstName} ${soldier.patronymic}`,
                      )
                      .join(", ") || "Військовослужбовець не вказаний"}
                  </td>

                  <td className="whitespace-nowrap px-5 py-2 text-sm text-zinc-500">
                    {new Date(document.createdAt).toLocaleDateString("uk-UA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default RecentDocuments;
