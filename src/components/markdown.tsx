import type { ReactNode } from "react";

// Small renderer for the Markdown subset used by the terms of participation: "#"/"##"
// headings, "-" lists, paragraphs, **bold**, *italic* and [text](https://…) links. It avoids
// pulling in a Markdown library for a single page.

const INLINE_PATTERN =
  /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  // a fresh regex per call: the pattern is global and renderInline calls itself for nested text
  const pattern = new RegExp(INLINE_PATTERN);
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, bold, italic, label, href] = match;
    if (bold !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {renderInline(bold)}
        </strong>,
      );
    } else if (italic !== undefined) {
      nodes.push(<em key={match.index}>{renderInline(italic)}</em>);
    } else {
      nodes.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          {label}
        </a>,
      );
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type Block =
  | { type: "h1" | "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "p"; text: string };

function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    const previous = blocks[blocks.length - 1];
    if (trimmed === "") {
      blocks.push({ type: "p", text: "" });
    } else if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
    } else if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.slice(2) });
    } else if (trimmed.startsWith("- ")) {
      if (previous?.type === "list") previous.items.push(trimmed.slice(2));
      else blocks.push({ type: "list", items: [trimmed.slice(2)] });
    } else if (previous?.type === "p" && previous.text !== "") {
      previous.text += " " + trimmed;
    } else if (previous?.type === "p") {
      previous.text = trimmed;
    } else {
      blocks.push({ type: "p", text: trimmed });
    }
  }
  return blocks.filter((block) => block.type !== "p" || block.text !== "");
}

export function Markdown({ source }: { source: string }) {
  return (
    <>
      {parse(source).map((block, i) => {
        switch (block.type) {
          case "h1":
            return (
              <h1
                key={i}
                className="font-plex-mono text-2xl font-semibold break-words sm:text-3xl md:text-4xl"
              >
                {renderInline(block.text)}
              </h1>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="mt-8 text-base font-semibold md:mt-10 md:text-lg"
              >
                {renderInline(block.text)}
              </h2>
            );
          case "list":
            return (
              <ul
                key={i}
                className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-muted-foreground/60 md:text-base"
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p
                key={i}
                className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </>
  );
}
