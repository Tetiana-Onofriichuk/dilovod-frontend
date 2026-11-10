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
    <div className="flex min-h-[145px] flex-col rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm [@media(min-height:820px)]:min-h-[155px] [@media(min-height:820px)]:px-6">
      <div className="flex items-start gap-3 [@media(min-height:820px)]:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 [@media(min-height:820px)]:h-10 [@media(min-height:820px)]:w-10">
          <Icon
            size={21}
            className="[@media(min-height:820px)]:h-[21px] [@media(min-height:820px)]:w-[21px]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-700 [@media(min-height:820px)]:text-base">
            {title}
          </p>

          <div className="mt-0.5 flex items-center gap-2 [@media(min-height:820px)]:mt-1">
            <p className="text-xl font-semibold text-zinc-900">{value}</p>

            {statusText && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                {statusText}
              </span>
            )}
          </div>
        </div>
      </div>

      {to && (
        <div className="mt-auto pt-3 pl-13 [@media(min-height:820px)]:pl-15">
          <Link
            to={to}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
          >
            {linkText}
            <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default StatCard;
