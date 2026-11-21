// Box for a chart that has no data yet. Lines are separated by "\n".
export function EmptyState({ text }: { text: string }) {
  return (
    <div className="border px-4 py-8 text-center text-sm text-muted-foreground">
      {text.split("\n").map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}
