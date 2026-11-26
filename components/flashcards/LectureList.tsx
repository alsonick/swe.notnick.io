import { FiCheck, FiLayers } from "react-icons/fi";
import { BORDER, FOCUS_RING } from "../../lib/styles";
import { ALL_CARDS, LECTURES } from "../../lib/flashcards";

interface Props {
  /** A lecture slug, or null for every lecture. */
  selected: string | null;
  known: Set<string>;
  onSelect: (slug: string | null) => void;
}

const Row = (props: {
  active: boolean;
  onClick: () => void;
  eyebrow: React.ReactNode;
  title: string;
  total: number;
  known: number;
}) => {
  const done = props.total > 0 && props.known === props.total;

  return (
    <li>
      <button
        type="button"
        onClick={props.onClick}
        aria-current={props.active ? "true" : undefined}
        className={`group flex w-full flex-col gap-2 rounded-lg border p-4 text-left duration-300 ${FOCUS_RING} ${
          props.active
            ? "border-primary bg-primary/5"
            : `${BORDER} bg-white dark:bg-[#10161a]/50 md:hover:border-primary`
        }`}
      >
        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
          <span>{props.eyebrow}</span>
          <span className={`flex items-center gap-1 ${done ? "text-primary" : ""}`}>
            {done ? <FiCheck /> : null}
            {props.known}/{props.total}
          </span>
        </div>
        <span className="text-lg font-bold text-black dark:text-white underline md:group-hover:no-underline">
          {props.title}
        </span>
        <span
          aria-hidden
          className="h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
        >
          <span
            className="block h-full rounded-full bg-primary duration-500"
            style={{
              width: `${props.total ? (props.known / props.total) * 100 : 0}%`,
            }}
          />
        </span>
      </button>
    </li>
  );
};

export const LectureList = ({ selected, known, onSelect }: Props) => {
  const knownCount = (ids: string[]) => ids.filter((id) => known.has(id)).length;

  return (
    <ul className="flex flex-col gap-3">
      <Row
        active={selected === null}
        onClick={() => onSelect(null)}
        eyebrow={
          <span className="flex items-center gap-1.5">
            <FiLayers /> Every lecture
          </span>
        }
        title="All lectures"
        total={ALL_CARDS.length}
        known={knownCount(ALL_CARDS.map((c) => c.id))}
      />
      {LECTURES.map((lecture, i) => (
        <Row
          key={lecture.slug}
          active={selected === lecture.slug}
          onClick={() => onSelect(lecture.slug)}
          eyebrow={`Lecture ${i + 1} · Week ${lecture.week} · ${lecture.lecturer}`}
          title={lecture.title}
          total={lecture.cards.length}
          known={knownCount(lecture.cards.map((_, j) => `${lecture.slug}/${j}`))}
        />
      ))}
    </ul>
  );
};
