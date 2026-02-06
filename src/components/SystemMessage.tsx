type Props = {
  message: string;
  variant?: "info" | "success" | "warning";
};

export default function SystemMessage({
  message,
  variant = "info",
}: Props) {

  const colors = {
    info: "text-blue-400",
    success: "text-green-400",
    warning: "text-yellow-400",
  };

  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="font-mono text-sm flex items-start gap-4">

      {/* Timestamp — visually quieter */}
      <span className="text-zinc-600 text-xs w-[55px] shrink-0 mt-[2px]">
        {time}
      </span>

      {/* Dot + message grouped */}
      <div className="flex items-start gap-2">

        <span className={`${colors[variant]} mt-[6px]`}>
          ●
        </span>

        <span className="text-zinc-300 leading-relaxed">
          {message}
        </span>

      </div>

    </div>
  );
}
