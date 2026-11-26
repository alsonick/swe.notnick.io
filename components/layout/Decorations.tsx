import {
  hideDecorationsHintForGood,
  shouldShowDecorationsHint,
  markDecorationsHintSeen,
  saveDecorationsEnabled,
  readDecorationsEnabled,
  isChristmasSeason,
  hideDecoration,
  showDecoration,
  isMacPlatform,
} from "../../lib/decorations";
import { useEffect, useRef, useState } from "react";
import { BORDER, FOCUS_RING } from "../../lib/styles";
import { Kbd } from "../ui/Typography";

// Next.js
import { useRouter } from "next/router";

const PRIMARY_BUTTON = `rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white dark:text-black
  duration-300 ${FOCUS_RING}`;

const SECONDARY_BUTTON = `rounded-lg border ${BORDER} px-4 py-2 text-sm font-bold text-gray-600
  dark:text-gray-300 duration-300 hover:border-primary hover:text-black dark:hover:text-white ${FOCUS_RING}`;

// Let the page settle before the tip slides in.
const HINT_DELAY_MS = 1500;
// Matches the card's `duration-300`.
const HINT_EXIT_MS = 300;

type HintState = "hidden" | "entering" | "shown" | "leaving";

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * notnick.io's December snow, a keyboard shortcut to switch it off (and back
 * on) with a fade, and a tip in the bottom-right corner that tells the reader
 * about the shortcut. Mounted once for the whole app.
 */
export const Decorations = () => {
  const { query, isReady } = useRouter();
  const [active, setActive] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [hint, setHint] = useState<HintState>("hidden");
  const [announcement, setAnnouncement] = useState("");
  const enabled = useRef(true);

  // Readers who ask for reduced motion never get the falling overlay.
  useEffect(() => {
    if (!isReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setActive(isChristmasSeason(new Date(), query.decoration));
  }, [isReady, query.decoration]);

  useEffect(() => {
    if (!active) return;

    setIsMac(isMacPlatform());
    enabled.current = readDecorationsEnabled();
    if (!enabled.current) return;

    showDecoration();

    // A touch screen has no keyboard to use the shortcut with.
    const touchOnly = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;
    if (touchOnly || !shouldShowDecorationsHint()) return;

    const timer = setTimeout(() => {
      markDecorationsHintSeen();
      setHint("entering");
    }, HINT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [active]);

  // Flipping to "shown" on the next frame lets the transition play it in.
  useEffect(() => {
    if (hint === "entering") {
      const frame = requestAnimationFrame(() => setHint("shown"));
      return () => cancelAnimationFrame(frame);
    }
    if (hint === "leaving") {
      const timer = setTimeout(() => setHint("hidden"), HINT_EXIT_MS);
      return () => clearTimeout(timer);
    }
  }, [hint]);

  const dismissHint = (forGood: boolean) => {
    if (forGood) hideDecorationsHintForGood();
    setHint((current) => (current === "hidden" ? current : "leaving"));
  };

  // Control+D on macOS. Ctrl+D bookmarks the page in Windows and Linux
  // browsers, so it's Ctrl+Alt+D there. Ignored while typing.
  useEffect(() => {
    if (!active) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code !== "KeyD" || !e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (e.altKey !== !isMac || isEditable(e.target)) return;

      e.preventDefault();
      enabled.current = !enabled.current;
      saveDecorationsEnabled(enabled.current);

      if (enabled.current) showDecoration();
      else hideDecoration();

      setAnnouncement(
        enabled.current ? "Decorations turned on" : "Decorations turned off"
      );
      // They know the shortcut now, so the tip has done its job.
      hideDecorationsHintForGood();
      setHint((current) => (current === "hidden" ? current : "leaving"));
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [active, isMac]);

  if (!active) return null;

  const keys = isMac ? ["Control", "D"] : ["Ctrl", "Alt", "D"];

  return (
    <>
      <p className="sr-only" role="status">
        {announcement}
      </p>
      {hint === "hidden" ? null : (
        <div
          className={`liquid-glass fixed bottom-4 right-4 z-50 w-[min(20rem,calc(100vw-2rem))]
          rounded-lg p-4 duration-300 ${
            hint === "shown"
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          aria-label="Seasonal decorations tip"
          role="region"
        >
          <p className="text-sm font-bold text-black dark:text-white">
            Not a fan of the snow? ❄️
          </p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Press{" "}
            {keys.map((key, i) => (
              <span key={key}>
                {i > 0 ? " + " : null}
                <Kbd>{key}</Kbd>
              </span>
            ))}{" "}
            to turn the decorations off, and again to bring them back.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => dismissHint(false)}
              title="Close this tip."
              className={PRIMARY_BUTTON}
            >
              Got it
            </button>
            <button
              type="button"
              onClick={() => dismissHint(true)}
              title="Never show this tip again."
              className={SECONDARY_BUTTON}
            >
              Don&apos;t show again
            </button>
          </div>
        </div>
      )}
    </>
  );
};
