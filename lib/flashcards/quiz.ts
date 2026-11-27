import { StudyCard } from "../../types/flashcard";
import { ALL_CARDS } from ".";

// Multiple choice uses other cards' answers as the wrong options, so no card
// needs hand-written distractors.

export const OPTION_COUNT = 4;

export interface Choices {
  options: string[];
  /** Index of the right answer in `options`. */
  correct: number;
}

/** A small seeded PRNG, so a card's options stay put between visits. */
const seeded = (key: string) => {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  }
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hasCode = (text: string) => text.includes("```");

export const choicesFor = (card: StudyCard): Choices => {
  const random = seeded(card.id);
  const wanted = OPTION_COUNT - 1;
  const seen = new Set([card.back]);

  const candidates = (pool: StudyCard[]) =>
    pool.filter((other) => {
      if (seen.has(other.back)) return false;
      seen.add(other.back);
      return true;
    });

  // Answers from the same lecture make the closest wrong options; the rest of
  // the deck only tops up a lecture too small to fill them.
  let pool = candidates(
    ALL_CARDS.filter(
      (c) => c.lectureSlug === card.lectureSlug && c.id !== card.id
    )
  );
  if (pool.length < wanted) {
    pool = pool.concat(candidates(ALL_CARDS.filter((c) => c.id !== card.id)));
  }

  // Prefer answers of a similar length and shape, so the right one doesn't
  // stand out as the longest or the only one with code in it.
  const length = card.back.length;
  const distance = (text: string) =>
    Math.abs(Math.log((text.length + 20) / (length + 20))) +
    (hasCode(text) === hasCode(card.back) ? 0 : 2);
  const nearest = pool
    .map((c) => ({ text: c.back, d: distance(c.back) + random() * 0.3 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, wanted * 2);

  const distractors: string[] = [];
  while (distractors.length < wanted && nearest.length) {
    const [pick] = nearest.splice(Math.floor(random() * nearest.length), 1);
    distractors.push(pick.text);
  }

  const correct = Math.floor(random() * (distractors.length + 1));
  const options = distractors.slice();
  options.splice(correct, 0, card.back);
  return { options, correct };
};
