import { FOCUS_RING } from "../../lib/styles";
import { ThemeToggle } from "./ThemeToggle";

// Next.js
import { useRouter } from "next/router";
import Link from "next/link";

const ITEMS = [
  { text: "/", to: "/", label: "Home" },
  { text: "cards", to: "/flashcards", label: "Flashcards" },
];

export const Nav = () => {
  const router = useRouter();

  const isCurrent = (to: string) =>
    to === "/" ? router.pathname === "/" : router.pathname.startsWith(to);

  return (
    <nav
      aria-label="Main"
      className="liquid-glass fixed top-8 z-50 flex h-14 w-[95%] sm:w-[40rem] md:w-[48rem] items-center justify-between
      rounded-lg px-4 sm:px-6"
    >
      <div className="flex items-center gap-2 sm:gap-4">
        {ITEMS.map((item) => {
          const current = isCurrent(item.to);
          // Like notnick.io, "/" stays highlighted on every page, but only the
          // page actually open is announced as current.
          const highlighted = item.to === "/" || current;
          return (
            <Link
              key={item.to}
              href={item.to}
              title={item.label}
              aria-label={item.label}
              aria-current={current ? "page" : undefined}
              className={`rounded-lg border p-2 text-base text-gray-600 dark:text-gray-300 duration-300
              hover:bg-gray-100 dark:hover:bg-gray-800 ${FOCUS_RING} ${
                highlighted
                  ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                  : "border-transparent"
              }`}
            >
              {item.to === "/" ? (
                <span className="inline-block duration-150 md:hover:scale-110">
                  {item.text}
                </span>
              ) : (
                item.text
              )}
            </Link>
          );
        })}
      </div>
      <ThemeToggle />
    </nav>
  );
};
