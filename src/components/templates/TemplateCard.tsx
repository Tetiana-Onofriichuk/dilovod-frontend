import { FileText, ArrowRight } from "lucide-react";

import type { DocumentTemplate } from "../../config/documentTemplates";

type TemplateCardProps = {
  template: DocumentTemplate;
  onCreate: (template: DocumentTemplate) => void;
};

const TemplateCard = ({ template, onCreate }: TemplateCardProps) => {
  return (
    <article className="flex min-h-[170px] flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-300 hover:shadow-md">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
        <FileText size={18} className="text-zinc-700" />
      </div>

      <h2 className="text-sm font-semibold leading-5 text-zinc-900">
        {template.title}
      </h2>

      <p className="mt-1.5 flex-1 text-sm leading-[18px] text-zinc-500">
        {template.description}
      </p>

      <button
        type="button"
        onClick={() => onCreate(template)}
        className="mt-3 flex cursor-pointer items-center gap-2 self-start text-sm font-medium text-zinc-700 transition hover:text-zinc-950"
      >
        Створити
        <ArrowRight size={15} />
      </button>
    </article>
  );
};

export default TemplateCard;
