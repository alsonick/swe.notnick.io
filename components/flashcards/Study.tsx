import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiEye,
  FiHelpCircle,
  FiList,
  FiRefreshCw,
  FiRotateCcw,
  FiShuffle,
  FiSkipForward,
  FiX,
} from "react-icons/fi";
import {
  PRIMARY_BUTTON,
  SECONDARY_BUTTON,
  SQUARE_BUTTON,
  BORDER,
  FOCUS_RING,
} from "../../lib/styles";
import { StudyPrefs, shuffled } from "../../lib/progress";
import { choicesFor } from "../../lib/flashcards/quiz";
import { StudyCard } from "../../types/flashcard";
import { Kbd, Text } from "../ui/Typography";
import { Flashcard } from "./Flashcard";
import { GAVE_UP, QuizCard } from "./QuizCard";

interface Props {
  cards: StudyCard[];
  known: Set<string>;
  setKnown: (id: string, isKnown: boolean) => void;
  forget: (ids: string[]) => void;
  prefs: StudyPrefs;
  updatePrefs: (change: Partial<StudyPrefs>) => void;
  /** Progress and preferences have been read from storage. */
  ready: boolean;
}

// Keys only act when nothing that handles them itself has focus, so Space on
// a focused button still presses that button rather than flipping the card.
const ownsKeys = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(target.tagName));

const Toggle = (props: {
  pressed: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-pressed={props.pressed}
    onClick={props.onClick}
    className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-semibold duration-300 ${FOCUS_RING} ${
      props.pressed
        ? "border-primary bg-primary/10 text-black dark:text-white"
        : `${BORDER} text-gray-600 dark:text-gray-300 md:hover:border-primary`
    }`}
  >
    {props.icon}
    {props.children}
  </button>
);

export const Study = (props: Props) => {
  const { cards, known, ready, prefs } = props;

  const byId = useMemo(
    () => new Map(cards.map((card) => [card.id, card])),
    [cards]
  );

  // Read through a ref when a round starts, so marking a card mid-round
  // doesn't reshuffle the round under the reader.
  const knownRef = useRef(known);
  knownRef.current = known;

  const buildRound = useCallback(() => {
    let ids = cards.map((card) => card.id);
    if (prefs.skipKnown) ids = ids.filter((id) => !knownRef.current.has(id));
    return prefs.shuffle ? shuffled(ids) : ids;
  }, [cards, prefs.shuffle, prefs.skipKnown]);

  const [queue, setQueue] = useState<string[]>(() => cards.map((c) => c.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  // The option picked for each card this round, in multiple choice.
  const [picks, setPicks] = useState<Record<string, number>>({});

  const startRound = useCallback(() => {
    setQueue(buildRound());
    setIndex(0);
    setFlipped(false);
    setMarks({});
    setPicks({});
  }, [buildRound]);

  // A new round once storage is read, and whenever shuffle or skip changes.
  useEffect(() => {
    if (ready) startRound();
  }, [ready, startRound]);

  const card = index < queue.length ? byId.get(queue[index]) : undefined;
  const finished = queue.length > 0 && index >= queue.length;
  const knownInDeck = cards.filter((c) => known.has(c.id)).length;
  const quiz = prefs.multipleChoice;
  const choices = useMemo(() => (card ? choicesFor(card) : null), [card]);
  const picked = card && card.id in picks ? picks[card.id] : null;
  const answered = quiz ? picked !== null : flipped;

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const go = useCallback(
    (step: number) => {
      setIndex((i) => Math.min(Math.max(i + step, 0), queue.length));
      setFlipped(false);
    },
    [queue.length]
  );

  const mark = useCallback(
    (isKnown: boolean) => {
      if (!card) return;
      props.setKnown(card.id, isKnown);
      setMarks((m) => ({ ...m, [card.id]: isKnown }));
      go(1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [card, go, props.setKnown]
  );

  // Multiple choice marks the card as soon as it's answered, and waits for
  // "Next" so the reader can see which answer was right.
  const pick = useCallback(
    (option: number, isCorrect: boolean) => {
      if (!card || card.id in picks) return;
      props.setKnown(card.id, isCorrect);
      setMarks((m) => ({ ...m, [card.id]: isCorrect }));
      setPicks((p) => ({ ...p, [card.id]: option }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [card, picks, props.setKnown]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || ownsKeys(e.target) || !card) {
        return;
      }
      if (quiz) {
        const option = Number(e.key) - 1;
        if (
          !answered &&
          choices &&
          option >= 0 &&
          option < choices.options.length
        ) {
          pick(option, option === choices.correct);
        } else if (answered && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowRight") {
          go(1);
        } else if (e.key === "ArrowLeft") {
          go(-1);
        }
        return;
      }
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          flip();
          break;
        case "ArrowRight":
          go(1);
          break;
        case "ArrowLeft":
          go(-1);
          break;
        case "1":
          mark(false);
          break;
        case "2":
          mark(true);
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [card, flip, go, mark, quiz, answered, choices, pick]);

  const resetDeck = () => {
    if (
      window.confirm(
        "Forget which cards you know in this deck? Every card will count as unlearned again."
      )
    ) {
      props.forget(cards.map((c) => c.id));
      // The ref still holds the old set until the next render.
      knownRef.current = new Set();
      startRound();
    }
  };

  const gotIt = Object.values(marks).filter(Boolean).length;
  const learning = Object.values(marks).length - gotIt;
  const percentKnown = cards.length ? (knownInDeck / cards.length) * 100 : 0;

  return (
    <div className="flex flex-col">
      {card ? (
        // Keyed by card, so moving on never animates the old answer away and
        // reveals the next card's answer on the way.
        quiz && choices ? (
          <QuizCard
            key={card.id}
            card={card}
            choices={choices}
            known={known.has(card.id)}
            picked={picked}
            onPick={pick}
          />
        ) : (
          <Flashcard
            key={card.id}
            card={card}
            flipped={flipped}
            known={known.has(card.id)}
            onFlip={flip}
          />
        )
      ) : (
        <div
          className={`flex min-h-[20rem] flex-col items-center justify-center gap-4 rounded-lg border ${BORDER}
          bg-white dark:bg-[#10161a] p-8 text-center`}
        >
          {finished ? (
            <>
              <p className="text-2xl font-bold text-black dark:text-white">
                Round complete 🎉
              </p>
              <Text>
                You went through {queue.length}{" "}
                {queue.length === 1 ? "card" : "cards"}: {gotIt} got it,{" "}
                {learning} still learning
                {queue.length - gotIt - learning > 0
                  ? `, ${queue.length - gotIt - learning} skipped`
                  : ""}
                .
              </Text>
              <button
                type="button"
                onClick={startRound}
                className={PRIMARY_BUTTON}
              >
                {prefs.skipKnown && knownInDeck < cards.length
                  ? "Study the rest"
                  : "Go again"}
                <FiRefreshCw className="ml-2" />
              </button>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-black dark:text-white">
                You know every card here 🎉
              </p>
              <Text>
                All {cards.length} cards in this deck are marked as known.
              </Text>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={() => props.updatePrefs({ skipKnown: false })}
                  className={PRIMARY_BUTTON}
                >
                  Review them anyway <FiEye className="ml-2" />
                </button>
                <button
                  type="button"
                  onClick={resetDeck}
                  className={SECONDARY_BUTTON}
                >
                  Reset progress <FiRotateCcw className="ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous card"
          title="Previous card (←)"
          className={SQUARE_BUTTON}
        >
          <FiArrowLeft className="text-lg" />
        </button>
        {!card ? (
          <div className="flex-1" />
        ) : quiz ? (
          answered ? (
            <button
              type="button"
              onClick={() => go(1)}
              title="Next card (Enter)"
              className={`${PRIMARY_BUTTON} flex-1`}
            >
              Next card
              <FiArrowRight className="ml-2 text-lg" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => pick(GAVE_UP, false)}
              className={`${SECONDARY_BUTTON} flex-1`}
            >
              <FiHelpCircle className="mr-2 text-lg" />I don&apos;t know
            </button>
          )
        ) : flipped ? (
          <>
            <button
              type="button"
              onClick={() => mark(false)}
              title="Still learning (1)"
              className={`${SECONDARY_BUTTON} flex-1 md:hover:border-red-500`}
            >
              <FiX className="mr-2 text-lg text-red-500" />
              Still learning
            </button>
            <button
              type="button"
              onClick={() => mark(true)}
              title="Got it (2)"
              className={`${PRIMARY_BUTTON} flex-1`}
            >
              <FiCheck className="mr-2 text-lg" />
              Got it
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={flip}
            title="Show answer (Space)"
            className={`${PRIMARY_BUTTON} flex-1`}
          >
            Show answer
            <FiEye className="ml-2 text-lg" />
          </button>
        )}
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!card}
          aria-label={!quiz && flipped ? "Skip card" : "Next card"}
          title="Next card (→)"
          className={SQUARE_BUTTON}
        >
          {!quiz && flipped ? (
            <FiSkipForward className="text-lg" />
          ) : (
            <FiArrowRight className="text-lg" />
          )}
        </button>
      </div>

      {/* Progress */}
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-600 dark:text-gray-300">
          <span role="status" aria-live="polite">
            {card
              ? `Card ${index + 1} of ${queue.length}${answered ? ", answer shown" : ""}`
              : finished
                ? "Round complete"
                : "Nothing left to study"}
          </span>
          <span>
            {knownInDeck} of {cards.length} known
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
          role="progressbar"
          aria-label="Cards known in this deck"
          aria-valuemin={0}
          aria-valuemax={cards.length}
          aria-valuenow={knownInDeck}
        >
          <div
            className="h-full rounded-full bg-primary duration-500"
            style={{ width: `${percentKnown}%` }}
          />
        </div>
      </div>

      {/* Options */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Toggle
          pressed={quiz}
          onClick={() => props.updatePrefs({ multipleChoice: !quiz })}
          icon={<FiList />}
        >
          Multiple choice
        </Toggle>
        <Toggle
          pressed={prefs.shuffle}
          onClick={() => props.updatePrefs({ shuffle: !prefs.shuffle })}
          icon={<FiShuffle />}
        >
          Shuffle
        </Toggle>
        <Toggle
          pressed={prefs.skipKnown}
          onClick={() => props.updatePrefs({ skipKnown: !prefs.skipKnown })}
          icon={<FiSkipForward />}
        >
          Skip known cards
        </Toggle>
        <button
          type="button"
          onClick={startRound}
          className={`inline-flex h-9 items-center gap-2 rounded-lg border ${BORDER} px-3 text-sm font-semibold
          text-gray-600 dark:text-gray-300 duration-300 md:hover:border-primary ${FOCUS_RING}`}
        >
          <FiRefreshCw /> Restart
        </button>
        <button
          type="button"
          onClick={resetDeck}
          disabled={knownInDeck === 0}
          className={`ml-auto inline-flex h-9 items-center gap-2 rounded-lg px-2 text-sm font-semibold
          text-gray-500 dark:text-gray-400 duration-300 md:hover:text-red-500 disabled:opacity-40
          disabled:hover:text-gray-500 ${FOCUS_RING}`}
        >
          <FiRotateCcw /> Reset progress
        </button>
      </div>

      {quiz ? (
        <p className="mt-5 hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Kbd>1</Kbd>–<Kbd>{choices?.options.length ?? 4}</Kbd> answer
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>Enter</Kbd> next card
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>←</Kbd>
            <Kbd>→</Kbd> move
          </span>
        </p>
      ) : (
        <p className="mt-5 hidden sm:flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <Kbd>Space</Kbd> flip
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>←</Kbd>
            <Kbd>→</Kbd> move
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>1</Kbd> still learning
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>2</Kbd> got it
          </span>
        </p>
      )}
    </div>
  );
};
