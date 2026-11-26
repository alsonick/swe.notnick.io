/**
 * Card text supports a small slice of Markdown: **bold**, `code`, fenced
 * code blocks, and lines starting with "- " or "1. " as lists.
 */
export interface Card {
  front: string;
  back: string;
}

export interface Lecture {
  slug: string;
  title: string;
  /** Teaching week of the module the lecture was given in. */
  week: number;
  lecturer: string;
  cards: Card[];
}

/** A card with everything the study view needs to show it on its own. */
export interface StudyCard extends Card {
  /** Stable across deploys as long as the card's position in its lecture is. */
  id: string;
  lectureSlug: string;
  lectureTitle: string;
  lectureNumber: number;
  week: number;
}
