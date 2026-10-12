import { FileText } from "lucide-react";

import Modal from "../common/Modal";

import {
  documentTemplates,
  type DocumentTemplate,
} from "../../config/documentTemplates";

import type { Soldier } from "../../types/soldier";

type CreateDocumentModalProps = {
  soldier: Soldier;
  onClose: () => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
};

const CreateDocumentModal = ({
  soldier,
  onClose,
  onSelectTemplate,
}: CreateDocumentModalProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="Створити документ">
      <div className="mb-5">
        <p className="text-sm text-zinc-500">Військовослужбовець</p>

        <p className="mt-1 font-semibold text-zinc-900">
          {soldier.lastName} {soldier.firstName} {soldier.patronymic}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          {soldier.rank} · {soldier.position}
        </p>
      </div>

      <p className="mb-3 text-sm font-medium text-zinc-700">
        Оберіть тип документа
      </p>

      <div className="max-h-[390px] space-y-3 overflow-y-auto pr-2">
        {documentTemplates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelectTemplate(template)}
            className="flex w-full cursor-pointer items-center gap-4 rounded-lg border border-zinc-200 p-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
              <FileText size={20} className="text-zinc-700" />
            </div>

            <div className="min-w-0">
              <p className="font-medium text-zinc-900">{template.title}</p>

              <p className="mt-1 text-sm text-zinc-500">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default CreateDocumentModal;
