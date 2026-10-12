import { useState } from "react";

import TemplateCard from "../components/templates/TemplateCard";
import SelectSoldierModal from "../components/templates/SelectSoldierModal";
import DocumentGenerator from "../components/documents/DocumentGenerator";

import {
  documentTemplates,
  type DocumentTemplate,
} from "../config/documentTemplates";

import type { Soldier } from "../types/soldier";

const TemplatesPage = () => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<DocumentTemplate | null>(null);

  const [selectedSoldier, setSelectedSoldier] = useState<Soldier | null>(null);

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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900">
          Шаблони документів
        </h1>

        <p className="mt-2 text-zinc-500">
          Створення документів на основі готових шаблонів
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          Доступно шаблонів:{" "}
          <span className="font-medium text-zinc-900">
            {documentTemplates.length}
          </span>
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {documentTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onCreate={handleCreate}
          />
        ))}
      </div>

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
