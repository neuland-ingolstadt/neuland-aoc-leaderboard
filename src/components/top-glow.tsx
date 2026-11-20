// Soft, organic glow along the top edge: several overlapping blobs in
// slightly different greens that drift slowly.
const BLOBS = [
  {
    left: "-8%",
    width: "55%",
    height: "88%",
    color: "var(--accent)",
    alpha: 26,
    delay: "0s",
  },
  {
    left: "22%",
    width: "45%",
    height: "70%",
    color: "oklch(0.8 0.14 185)",
    alpha: 18,
    delay: "-6s",
  },
  {
    left: "48%",
    width: "50%",
    height: "95%",
    color: "var(--accent)",
    alpha: 22,
    delay: "-12s",
  },
  {
    left: "70%",
    width: "45%",
    height: "72%",
    color: "oklch(0.86 0.17 125)",
    alpha: 16,
    delay: "-3s",
  },
  {
    left: "36%",
    width: "28%",
    height: "52%",
    color: "var(--accent)",
    alpha: 14,
    delay: "-9s",
  },
];

export function TopGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
    >
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="top-glow-blob absolute -top-1/2"
          style={{
            left: blob.left,
            width: blob.width,
            height: blob.height,
            animationDelay: blob.delay,
            background: `radial-gradient(closest-side, color-mix(in oklch, ${blob.color} ${blob.alpha}%, transparent), transparent)`,
          }}
        />
      ))}
    </div>
  );
}
