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

  return (
    <div className="font-mono text-sm">

      <div className="flex items-start gap-2">

        <span className={`${colors[variant]} mt-[2px]`}>
          ●
        </span>

        <span className="text-zinc-300 leading-relaxed">
          {message}
        </span>

      </div>

    </div>
  );
}
