type Props = {
  cause: string;
  impact: string;
  recommendation: string;
};

export default function IncidentSummary({
  cause,
  impact,
  recommendation,
}: Props) {

  return (
    <div className="font-mono text-sm">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-400 tracking-wide font-semibold">
          INCIDENT SUMMARY
        </h3>

        <span className="text-xs text-zinc-600">
          AI ANALYSIS
        </span>
      </div>

      <div className="space-y-3 text-zinc-300">

        <div>
          <span className="text-zinc-500">Root Cause:</span>
          <p className="mt-1">{cause}</p>
        </div>

        <div>
          <span className="text-zinc-500">Impact:</span>
          <p className="mt-1">{impact}</p>
        </div>

        <div>
          <span className="text-zinc-500">Recommended Action:</span>
          <p className="mt-1 text-yellow-400">
            {recommendation}
          </p>
        </div>

      </div>

    </div>
  );
}