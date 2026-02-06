type Props = {
  command: string;
};

export default function CommandBubble({ command }: Props) {

  return (
    <div className="font-mono text-sm text-green-400 flex items-center gap-2">

      <span className="text-green-500">{">"}</span>

      <span className="tracking-wide">
        {command}
      </span>

    </div>
  );
}
