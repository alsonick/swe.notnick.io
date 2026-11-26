import { useCallback, useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { LectureList } from "../../components/flashcards/LectureList";
import { Heading, Tag, Text } from "../../components/ui/Typography";
import { ALL_CARDS, LECTURES, lectureNumber } from "../../lib/flashcards";
import { useKnownCards, useStudyPrefs } from "../../lib/progress";
import { Study } from "../../components/flashcards/Study";
import { Layout } from "../../components/layout/Layout";
import { BORDER, FOCUS_RING } from "../../lib/styles";
import { MODULE } from "../../lib/constants";

// Next.js
import type { NextPage } from "next";
import { useRouter } from "next/router";

const DECK_LIST_ID = "lectures";

const Flashcards: NextPage = () => {
  const router = useRouter();
  const { known, setKnown, forget, loaded: knownLoaded } = useKnownCards();
  const { prefs, updatePrefs, loaded: prefsLoaded } = useStudyPrefs();
  // The prerendered HTML can't know the ?lecture= query, and router.isReady
  // differs between that HTML and the client's first render, so the study
  // view waits until the page has mounted and the query is known.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // The chosen deck lives in the URL (?lecture=apis), so it can be shared
  // and survives a reload. Anything unrecognised means every lecture.
  const queried =
    typeof router.query.lecture === "string" ? router.query.lecture : null;
  const lecture = LECTURES.find((l) => l.slug === queried) ?? null;

  const cards = useMemo(
    () =>
      lecture ? ALL_CARDS.filter((c) => c.lectureSlug === lecture.slug) : ALL_CARDS,
    [lecture]
  );

  const select = useCallback(
    (slug: string | null) => {
      router.replace(
        { pathname: router.pathname, query: slug ? { lecture: slug } : {} },
        undefined,
        { shallow: true, scroll: false }
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  return (
    <Layout>
      <header className="mb-8 flex flex-col gap-3">
        <Heading as="h1">Flashcards</Heading>
        <Text>
          {ALL_CARDS.length} cards from the first {LECTURES.length} lectures of{" "}
          {MODULE}. Flip a card, then mark whether you got it. Your progress
          is saved in this browser.
        </Text>
      </header>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Tag>{lecture ? `Lecture ${lectureNumber(lecture.slug)}` : "All"}</Tag>
          <h2 className="truncate text-lg font-bold text-black dark:text-white">
            {lecture ? lecture.title : "All lectures"}
          </h2>
        </div>
        <a
          href={`#${DECK_LIST_ID}`}
          className={`inline-flex items-center gap-1 rounded text-sm font-bold text-primary hover:underline ${FOCUS_RING}`}
        >
          Change lecture <FiChevronDown />
        </a>
      </div>

      {/* Keyed by deck so switching lectures starts a fresh round. */}
      {mounted && router.isReady ? (
        <Study
          key={lecture?.slug ?? "all"}
          cards={cards}
          known={known}
          setKnown={setKnown}
          forget={forget}
          prefs={prefs}
          updatePrefs={updatePrefs}
          ready={knownLoaded && prefsLoaded}
        />
      ) : (
        <div
          aria-hidden
          className={`min-h-[20rem] animate-pulse rounded-lg border ${BORDER} bg-gray-50 dark:bg-[#10161a]`}
        />
      )}

      <section
        id={DECK_LIST_ID}
        aria-labelledby={`${DECK_LIST_ID}-heading`}
        className={`mt-14 scroll-mt-28 border-t ${BORDER} pt-8`}
      >
        <Heading as="h2" className="mb-2 !text-2xl sm:!text-3xl">
          <span id={`${DECK_LIST_ID}-heading`}>Lectures</span>
        </Heading>
        <Text className="mb-6">
          Pick a lecture to study just its cards.
        </Text>
        <LectureList
          selected={lecture?.slug ?? null}
          known={known}
          onSelect={select}
        />
      </section>
    </Layout>
  );
};

export default Flashcards;
