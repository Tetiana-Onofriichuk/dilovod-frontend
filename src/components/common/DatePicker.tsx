import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const DatePicker = ({ value, onChange, required = false }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [inputValue, setInputValue] = useState(() => {
    if (!value) return "";

    const [year, month, day] = value.split("-");

    return `${day}.${month}.${year}`;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;

  const [viewDate, setViewDate] = useState(selectedDate ?? new Date());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      const scrollContainer = calendarRef.current?.closest(".overflow-y-auto");

      scrollContainer?.scrollBy({
        top: 160,
        behavior: "smooth",
      });
    });
  }, [isOpen]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.replace(/\D/g, "").slice(0, 8);

    if (input.length > 4) {
      input = `${input.slice(0, 2)}.${input.slice(2, 4)}.${input.slice(4)}`;
    } else if (input.length > 2) {
      input = `${input.slice(0, 2)}.${input.slice(2)}`;
    }

    setInputValue(input);

    const match = input.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    if (!match) {
      return;
    }

    const [, day, month, year] = match;

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const isValid =
      date.getFullYear() === Number(year) &&
      date.getMonth() === Number(month) - 1 &&
      date.getDate() === Number(day);

    if (!isValid) {
      return;
    }

    onChange(`${year}-${month}-${day}`);
    setViewDate(date);
  };

  const handleSelectDate = (day: number) => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const formattedMonth = String(month + 1).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    const newValue = `${year}-${formattedMonth}-${formattedDay}`;

    onChange(newValue);
    setInputValue(`${formattedDay}.${formattedMonth}.${year}`);

    setIsOpen(false);
  };

  const previousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const selectToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);
    setInputValue(`${day}.${month}.${year}`);

    setViewDate(today);
    setIsOpen(false);
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const isSelected = (day: number) => {
    if (!selectedDate) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="ДД.ММ.РРРР"
          inputMode="numeric"
          required={required}
          className="w-full rounded-lg border border-zinc-300 px-4 py-3 pr-12 outline-none transition focus:border-zinc-500"
        />

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Відкрити календар"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-[#1c2530]"
        >
          <CalendarDays size={20} />
        </button>
      </div>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute right-0 top-full z-50 mt-2 w-[300px] rounded-xl border border-zinc-200 bg-white p-4 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={previousMonth}
              aria-label="Попередній місяць"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-[#1c2530]"
            >
              <ChevronLeft size={19} />
            </button>

            <p className="font-semibold text-[#1c2530]">
              {months[month]} {year}
            </p>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Наступний місяць"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 hover:text-[#1c2530]"
            >
              <ChevronRight size={19} />
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7">
            {weekDays.map((day) => (
              <div
                key={day}
                className="flex h-8 items-center justify-center text-xs font-semibold text-zinc-400"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {Array.from({ length: startOffset }).map((_, index) => (
              <div key={`empty-${index}`} className="h-9" />
            ))}

            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleSelectDate(day)}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm transition ${
                  isSelected(day)
                    ? "bg-[#1c2530] font-semibold text-white"
                    : isToday(day)
                      ? "bg-zinc-100 font-semibold text-[#1c2530]"
                      : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-3 border-t border-zinc-200 pt-3">
            <button
              type="button"
              onClick={selectToday}
              className="cursor-pointer text-sm font-medium text-[#1c2530] transition hover:text-zinc-500"
            >
              Сьогодні
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
