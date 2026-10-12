import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type StatCardProps = {
  title: string;
  value: number;
  linkText: string;
  icon: LucideIcon;
  to?: string;
  statusText?: string;
};

const StatCard = ({
  title,
  value,
  linkText,
  icon: Icon,
  to,
  statusText,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
          <Icon size={21} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-600">{title}</p>

          <div className="mt-0.5 flex items-center gap-2">
            <p className="text-2xl font-semibold text-zinc-900">{value}</p>

            {statusText && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                {statusText}
              </span>
            )}
          </div>

          {to && (
            <Link
              to={to}
              className="mt-2 flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              {linkText}
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
