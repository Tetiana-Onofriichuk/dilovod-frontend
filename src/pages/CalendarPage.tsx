import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ukLocale from "@fullcalendar/core/locales/uk";
import { CalendarDays } from "lucide-react";
import "./CalendarPage.css";

const CalendarPage = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <CalendarDays size={28} className="text-zinc-700" />

          <h2 className="text-2xl font-semibold text-zinc-900">Календар</h2>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          Планування та контроль завдань
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ukLocale}
          firstDay={1}
          height="auto"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
        />
      </section>
    </div>
  );
};

export default CalendarPage;
