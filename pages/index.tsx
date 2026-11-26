import { FiArrowRight } from "react-icons/fi";
import { Heading, Tag, Text } from "../components/ui/Typography";
import { ALL_CARDS, LECTURES } from "../lib/flashcards";
import { Layout } from "../components/layout/Layout";
import { BORDER, PRIMARY_BUTTON } from "../lib/styles";

// Next.js
import type { NextPage } from "next";
import Link from "next/link";

const weeks = Array.from(new Set(LECTURES.map((l) => l.week)));

const Home: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-col gap-5">
        <Tag>COMP6003</Tag>
        <Heading as="h1">Software Engineering Practice</Heading>
        <Text>
          Revise the module one card at a time. {ALL_CARDS.length} flashcards
          written from the slides of the first {LECTURES.length} lectures, from
          Scrum and Docker through to frameworks, IaC and the web.
        </Text>
        <Link href="/flashcards" className={`${PRIMARY_BUTTON} group w-fit`}>
          Start practising
          <FiArrowRight className="ml-2 duration-300 md:group-hover:translate-x-1" />
        </Link>
      </section>

      <section className={`mt-14 border-t ${BORDER} pt-8`}>
        <h2 className="mb-6 text-2xl sm:text-3xl font-bold text-black dark:text-white">
          What&apos;s covered
        </h2>
        <div className="flex flex-col gap-8">
          {weeks.map((week) => (
            <div key={week} className="flex flex-col gap-3">
              <span className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">
                Week {week}
              </span>
              <ul className="flex flex-col">
                {LECTURES.filter((l) => l.week === week).map((lecture) => (
                  <li key={lecture.slug} className={`border-b ${BORDER} last:border-b-0`}>
                    <Link
                      href={`/flashcards?lecture=${lecture.slug}`}
                      className="group flex items-center justify-between gap-4 rounded py-3 outline-none
                      focus-visible:ring-4 ring-primary"
                    >
                      <span className="font-semibold text-black dark:text-white underline md:group-hover:no-underline">
                        {lecture.title}
                      </span>
                      <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                        {lecture.cards.length} cards
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
