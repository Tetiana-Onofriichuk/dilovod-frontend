import { useRef, useState } from "react";

type TruncatedTextProps = {
  text: string;
};

const TruncatedText = ({ text }: TruncatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleMouseEnter = () => {
    const element = textRef.current;

    if (!element) return;

    setIsTruncated(element.scrollHeight > element.clientHeight);
  };

  const handleMouseLeave = () => {
    setIsTruncated(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={textRef} className="line-clamp-2 break-words">
        {text}
      </div>

      {isTruncated && (
        <div className="pointer-events-none absolute left-0 top-full z-30 mt-1 w-max max-w-80 rounded-md bg-zinc-900 px-3 py-2 text-sm text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default TruncatedText;
