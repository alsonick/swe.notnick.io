import { Lecture, StudyCard } from "../../types/flashcard";
import { introduction, containers, docker } from "./week-1";
import { buildSystems, apis, cicd } from "./week-2";
import { testing, tdd } from "./week-3-testing";
import { designPrinciples } from "./week-3-design";
import { advancedGit, idesDebugging, architecturalPatterns } from "./week-4";
import { frameworks, iac, webTechnologies } from "./week-5-6";

// The order the lectures were given in. The Kubernetes lecture (week 5) is
// left out on purpose.
export const LECTURES: Lecture[] = [
  introduction,
  containers,
  docker,
  buildSystems,
  apis,
  cicd,
  testing,
  tdd,
  designPrinciples,
  advancedGit,
  idesDebugging,
  architecturalPatterns,
  frameworks,
  iac,
  webTechnologies,
];

export const ALL_CARDS: StudyCard[] = LECTURES.flatMap((lecture, index) =>
  lecture.cards.map((card, cardIndex) => ({
    ...card,
    id: `${lecture.slug}/${cardIndex}`,
    lectureSlug: lecture.slug,
    lectureTitle: lecture.title,
    lectureNumber: index + 1,
    week: lecture.week,
  }))
);

export const lectureNumber = (slug: string) =>
  LECTURES.findIndex((lecture) => lecture.slug === slug) + 1;
