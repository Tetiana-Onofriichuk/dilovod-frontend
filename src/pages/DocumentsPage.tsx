import { useEffect, useState } from "react";
import { Download, FileText, Search, Trash2 } from "lucide-react";

import { downloadDocument, getDocuments } from "../services/documentsApi";
import type { Document } from "../types/document";
import DeleteDocumentModal from "../components/documents/DeleteDocumentModal";

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingDocument, setDeletingDocument] = useState<Document | null>(
    null,
  );

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error("Помилка завантаження документів:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const filteredDocuments = documents.filter((document) =>
    document.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-semibold text-zinc-900">Документи</h2>

        <p className="mt-1 text-sm text-zinc-500">Архів створених документів</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-200 px-5 py-4">
          <h3 className="font-semibold text-zinc-900">Всі документи</h3>

          <div className="relative w-full max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Пошук за назвою документа..."
              className="w-full rounded-lg border border-zinc-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="px-5 py-8 text-center text-sm text-zinc-500">
            Завантаження...
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 text-zinc-500">
            <FileText size={32} />

            <p className="mt-2 text-sm">Документів поки немає</p>
          </div>
        ) : (
          <div className="min-h-0">
            <div className="grid grid-cols-[minmax(280px,1.4fr)_minmax(280px,1.4fr)_160px_100px] items-center gap-6 border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-500">
              <span>Документ</span>
              <span>Військовослужбовець</span>
              <span>Дата створення</span>
              <span className="text-center">Дії</span>
            </div>

            <div className="max-h-[calc(100vh-260px)] overflow-y-auto divide-y divide-zinc-100">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="grid grid-cols-[minmax(280px,1.4fr)_minmax(280px,1.4fr)_160px_100px] items-center gap-6 px-5 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                      <FileText size={18} />
                    </div>

                    <p className="truncate font-medium text-zinc-900">
                      {document.title}
                    </p>
                  </div>

                  <p className="text-sm text-zinc-600">
                    {document.soldiers
                      .map(
                        (soldier) =>
                          `${soldier.lastName} ${soldier.firstName} ${soldier.patronymic}`,
                      )
                      .join(", ") || "Військовослужбовець не вказаний"}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {new Date(document.createdAt).toLocaleDateString("uk-UA")}
                  </p>

                  <div className="flex justify-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        downloadDocument(document.id, document.fileName)
                      }
                      title="Завантажити документ"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <Download size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingDocument(document)}
                      title="Видалити документ"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {deletingDocument && (
        <DeleteDocumentModal
          document={deletingDocument}
          onClose={() => setDeletingDocument(null)}
          onDocumentDeleted={(id) => {
            setDocuments((prev) =>
              prev.filter((document) => document.id !== id),
            );

            setDeletingDocument(null);
          }}
        />
      )}
    </div>
  );
};

export default DocumentsPage;
