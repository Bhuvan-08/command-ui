type Props = {
  mode: "incident" | "investigating" | "stable";
};

export default function IncidentModeBanner({ mode }: Props) {
  const config = {
    incident: {
      color: "bg-red-500",
      text: "INCIDENT MODE",
    },
    investigating: {
      color: "bg-yellow-500",
      text: "INVESTIGATING",
    },
    stable: {
      color: "bg-green-500",
      text: "SYSTEM STABLE",
    },
  };

  const current = config[mode];

  return (
    <div
      className={`${current.color} text-black font-bold px-4 py-2 rounded-lg mb-4`}
    >
      {current.text}
    </div>
  );
}
