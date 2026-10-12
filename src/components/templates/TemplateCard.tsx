import { FileText, ArrowRight } from "lucide-react";

import type { DocumentTemplate } from "../../config/documentTemplates";

type TemplateCardProps = {
  template: DocumentTemplate;
  onCreate: (template: DocumentTemplate) => void;
};

const TemplateCard = ({ template, onCreate }: TemplateCardProps) => {
  return (
    <article className="flex min-h-[210px] flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
        <FileText size={20} className="text-zinc-700" />
      </div>

      <h2 className="text-base font-semibold text-zinc-900">
        {template.title}
      </h2>

      <p className="mt-2 flex-1 text-sm leading-5 text-zinc-500">
        {template.description}
      </p>

      <button
        type="button"
        onClick={() => onCreate(template)}
        className="mt-5 flex cursor-pointer items-center gap-2 self-start text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
      >
        Створити
        <ArrowRight size={16} />
      </button>
    </article>
  );
};

export default TemplateCard;
