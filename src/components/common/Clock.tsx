import { useEffect, useState } from "react";

const Clock = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const time = now.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = now.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="text-right">
      <p className="text-2xl font-semibold leading-none tabular-nums text-zinc-900">
        {time}
      </p>

      <p className="mt-2 text-sm font-medium text-zinc-500">{date}</p>
    </div>
  );
};

export default Clock;
