type Props = {
  mode: "incident" | "investigating" | "stable";
};

export default function IncidentModeBanner({ mode }: Props) {

  const config = {
    incident: {
      label: "INCIDENT ACTIVE",
      color: "text-red-400",
      dot: "bg-red-500",
      border: "border-red-500/30",
    },
    investigating: {
      label: "INVESTIGATING",
      color: "text-yellow-400",
      dot: "bg-yellow-400",
      border: "border-yellow-400/30",
    },
    stable: {
      label: "ALL SYSTEMS STABLE",
      color: "text-green-400",
      dot: "bg-green-500",
      border: "border-green-500/30",
    },
  };

  const current = config[mode];

  return (
    <div className={`
      flex items-center justify-between
      border ${current.border}
      rounded-md
      px-4 py-2
      font-mono text-xs tracking-wide
      bg-black/40
    `}>

      {/* LEFT */}
      <div className="flex items-center gap-2">

        {/* Status Dot */}
        <div className={`
          w-2 h-2 rounded-full
          ${current.dot}
          animate-pulse
        `} />

        <span className={current.color}>
          {current.label}
        </span>

      </div>

      {/* RIGHT */}
      <span className="text-zinc-600">
        LIVE STATUS
      </span>

    </div>
  );
}
