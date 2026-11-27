import { FiCheck, FiX } from "react-icons/fi";
import { Choices } from "../../lib/flashcards/quiz";
import { FOCUS_RING } from "../../lib/styles";
import { StudyCard } from "../../types/flashcard";
import { CardContent } from "./CardContent";
import { Header } from "./Flashcard";

/** Nothing picked yet, or the reader asked to see the answer. */
export const UNANSWERED = null;
export const GAVE_UP = -1;

interface Props {
  card: StudyCard;
  choices: Choices;
  known: boolean;
  /** Index of the option picked, UNANSWERED, or GAVE_UP. */
  picked: number | null;
  onPick: (index: number, isCorrect: boolean) => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export const QuizCard = ({ card, choices, known, picked, onPick }: Props) => {
  const { options, correct } = choices;
  const answered = picked !== UNANSWERED;

  const feedback = !answered
    ? null
    : picked === correct
      ? { good: true, text: "Correct! Marked as known." }
      : picked === GAVE_UP
        ? {
            good: false,
            text: "Here's the answer. This card stays in “still learning”.",
          }
        : {
            good: false,
            text: "Not quite. The right answer is highlighted. This card stays in “still learning”.",
          };

  return (
    <section
      aria-label="Question"
      className={`flex min-h-[20rem] flex-col rounded-lg border bg-white dark:bg-[#10161a] p-6 sm:p-8 ${
        feedback
          ? feedback.good
            ? "border-primary"
            : "border-red-300 dark:border-red-900"
          : "border-teal-100 dark:border-teal-900"
      }`}
    >
      <Header side="Question" card={card} known={known} />
      <div className="py-6 text-xl sm:text-2xl font-bold leading-snug text-black dark:text-white">
        <CardContent text={card.front} />
      </div>

      <ol aria-label="Answers" className="flex flex-col gap-2.5">
        {options.map((option, i) => {
          const isCorrect = i === correct;
          const isPicked = i === picked;
          const state = !answered
            ? "idle"
            : isCorrect
              ? "correct"
              : isPicked
                ? "wrong"
                : "other";

          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered}
                onClick={() => onPick(i, isCorrect)}
                title={answered ? undefined : `Answer ${LETTERS[i]} (${i + 1})`}
                className={`flex w-full items-start gap-3 rounded-lg border p-3 sm:p-4 text-left text-base
                leading-relaxed duration-300 ${FOCUS_RING} disabled:cursor-default ${
                  state === "idle"
                    ? "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 md:hover:border-primary md:hover:bg-primary/5"
                    : state === "correct"
                      ? "border-primary bg-primary/10 text-black dark:text-white"
                      : state === "wrong"
                        ? "border-red-500 bg-red-500/10 text-black dark:text-white"
                        : "border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-500 opacity-60"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    state === "correct"
                      ? "bg-primary text-white dark:text-black"
                      : state === "wrong"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {state === "correct" ? (
                    <FiCheck />
                  ) : state === "wrong" ? (
                    <FiX />
                  ) : (
                    LETTERS[i]
                  )}
                </span>
                <span className="min-w-0 flex-1 pt-0.5">
                  <CardContent text={option} />
                </span>
                {state === "correct" || state === "wrong" ? (
                  <span className="sr-only">
                    {state === "correct" ? "(right answer)" : "(your answer)"}
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <p
        role="status"
        aria-live="polite"
        className={`mt-5 text-sm ${
          feedback
            ? feedback.good
              ? "font-semibold text-primary"
              : "font-semibold text-red-600 dark:text-red-400"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {feedback ? (
          feedback.text
        ) : (
          <>
            <span className="sm:hidden">
              Tap the answer you think is right.
            </span>
            <span className="hidden sm:inline">
              Click the answer you think is right, or press 1–{options.length}.
            </span>
          </>
        )}
      </p>
    </section>
  );
};
