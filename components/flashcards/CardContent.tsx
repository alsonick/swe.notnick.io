import { Fragment } from "react";

// Renders the small slice of Markdown the card data uses (see types/flashcard.ts).

type Block =
  | { type: "code"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] };

const BULLET = /^- /;
const NUMBERED = /^\d+\. /;

const parse = (source: string): Block[] => {
  const blocks: Block[] = [];

  // Every other piece between ``` fences is code.
  source.split("```").forEach((piece, index) => {
    if (index % 2 === 1) {
      blocks.push({ type: "code", text: piece.replace(/^\n/, "").replace(/\n$/, "") });
      return;
    }

    for (const line of piece.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const listType = BULLET.test(trimmed)
        ? "ul"
        : NUMBERED.test(trimmed)
        ? "ol"
        : null;

      if (!listType) {
        blocks.push({ type: "p", text: trimmed });
        continue;
      }

      const item = trimmed.replace(listType === "ul" ? BULLET : NUMBERED, "");
      const last = blocks[blocks.length - 1];
      if (last && last.type === listType) {
        last.items.push(item);
      } else {
        blocks.push({ type: listType, items: [item] });
      }
    }
  });

  return blocks;
};

const Inline = ({ text }: { text: string }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return (
          <strong key={i} className="font-bold text-black dark:text-white">
            <Inline text={part.slice(2, -2)} />
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code
            key={i}
            className="rounded bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-mono
            text-[0.85em] font-medium text-black dark:text-white [overflow-wrap:anywhere]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <Fragment key={i}>{part}</Fragment>;
    })}
  </>
);

export const CardContent = ({ text }: { text: string }) => (
  <div className="card-content flex w-full flex-col gap-3">
    {parse(text).map((block, i) => {
      switch (block.type) {
        case "code":
          return (
            <pre
              key={i}
              className="rounded-lg bg-[#f6f8fa] dark:bg-[#1e293b] px-4 py-3 text-left text-sm font-normal
              leading-relaxed text-[#1f2328] dark:text-[#c9d1d9] font-mono"
            >
              <code>{block.text}</code>
            </pre>
          );
        case "ul":
          return (
            <ul key={i} className="flex list-disc flex-col gap-1.5 pl-5 text-left marker:text-primary">
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        case "ol":
          return (
            <ol key={i} className="flex list-decimal flex-col gap-1.5 pl-5 text-left marker:font-bold marker:text-primary">
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ol>
          );
        default:
          return (
            <p key={i}>
              <Inline text={block.text} />
            </p>
          );
      }
    })}
  </div>
);
