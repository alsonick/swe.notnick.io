import { FiCheckCircle } from "react-icons/fi";
import { StudyCard } from "../../types/flashcard";
import { Label } from "../ui/Typography";
import { CardContent } from "./CardContent";

interface Props {
  card: StudyCard;
  flipped: boolean;
  known: boolean;
  onFlip: () => void;
}

const FACE = `flip-face flex min-h-[20rem] flex-col rounded-lg border bg-white dark:bg-[#10161a]
  p-6 sm:p-8 duration-300`;

export const Header = (props: { side: string; card: StudyCard; known: boolean }) => (
  <div className="flex items-center justify-between gap-4">
    <Label>{props.side}</Label>
    <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
      {props.known ? (
        <span className="flex items-center gap-1 text-primary">
          <FiCheckCircle /> Known
        </span>
      ) : null}
      <span className="truncate" title={props.card.lectureTitle}>
        L{props.card.lectureNumber} · {props.card.lectureTitle}
      </span>
    </div>
  </div>
);

export const Flashcard = ({ card, flipped, known, onFlip }: Props) => {
  return (
    // Clicking anywhere on the card turns it over. Keyboard and screen reader
    // users get the same action from the "Show answer" button below the card,
    // which is why the card itself isn't focusable.
    <div className="flip-scene cursor-pointer select-text" onClick={onFlip}>
      <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
        <section
          aria-hidden={flipped}
          aria-label="Question"
          className={`${FACE} flip-face-front border-teal-100 dark:border-teal-900 md:hover:border-primary`}
        >
          <Header side="Question" card={card} known={known} />
          <div className="flex flex-1 items-center py-8 text-xl sm:text-2xl font-bold leading-snug text-black dark:text-white">
            <CardContent text={card.front} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="sm:hidden">Tap the card to see the answer.</span>
            <span className="hidden sm:inline">
              Click the card or press Space to see the answer.
            </span>
          </p>
        </section>
        <section
          aria-hidden={!flipped}
          aria-label="Answer"
          className={`${FACE} flip-face-back border-primary`}
        >
          <Header side="Answer" card={card} known={known} />
          <div className="flex flex-1 items-center py-8 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            <CardContent text={card.back} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Did you get it? Mark it below to track your progress.
          </p>
        </section>
      </div>
    </div>
  );
};
