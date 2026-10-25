import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import TemplateCard from "../components/templates/TemplateCard";
import SelectSoldierModal from "../components/templates/SelectSoldierModal";
import DocumentGenerator from "../components/documents/DocumentGenerator";

import {
  documentTemplates,
  type DocumentTemplate,
} from "../config/documentTemplates";

import type { Soldier } from "../types/soldier";

const categories = [
  { id: "all", label: "Усі" },
  { id: "leave", label: "Відпустки" },
  { id: "finance", label: "Фінансові" },
  { id: "training", label: "Навчання" },
];

const ITEMS_PER_PAGE = 6;

const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<DocumentTemplate | null>(null);

  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTemplates = documentTemplates.filter((template) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      template.title.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedTemplates = filteredTemplates.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleCreate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setSelectedSoldier(null);
  };

  const handleSelectSoldier = (soldier: Soldier) => {
    setSelectedSoldier(soldier);
  };

  const handleClose = () => {
    setSelectedTemplate(null);
    setSelectedSoldier(null);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-semibold text-zinc-900">
          Шаблони документів
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Створення документів на основі готових шаблонів
        </p>
      </div>

      <div className="mb-3 flex shrink-0 items-center justify-between gap-6">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Пошук шаблону..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-zinc-400"
          />
        </div>

        <p className="shrink-0 text-sm text-zinc-500">
          Доступно шаблонів:{" "}
          <span className="font-medium text-zinc-900">
            {filteredTemplates.length}
          </span>
        </p>
      </div>

      <div className="mb-4 flex shrink-0 items-center gap-2">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSelectedCategory(category.id);
                setCurrentPage(1);
              }}
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {filteredTemplates.length > 0 ? (
        <>
          <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onCreate={handleCreate}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-4 flex shrink-0 items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                title="Попередня сторінка"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  const isActive = page === currentPage;

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 cursor-pointer rounded-lg px-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-zinc-800 text-white"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40"
                title="Наступна сторінка"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-12 text-center">
            <p className="font-medium text-zinc-700">Шаблонів не знайдено</p>

            <p className="mt-1 text-sm text-zinc-500">
              Спробуйте змінити пошуковий запит або категорію.
            </p>
          </div>
        </div>
      )}

      {selectedTemplate && !selectedSoldier && (
        <SelectSoldierModal
          onClose={handleClose}
          onSelect={handleSelectSoldier}
        />
      )}

      {selectedTemplate && selectedSoldier && (
        <DocumentGenerator
          template={selectedTemplate}
          soldier={selectedSoldier}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default TemplatesPage;
