// The December snow from notnick.io (its Halloween pumpkins are left out).

const CONTAINER_ID = "decorations";
// Keep in sync with the `#decorations` opacity transition in globals.css.
const FADE_MS = 700;

// Same storage keys as notnick.io's Christmas decorations.
const ENABLED_KEY = "decorations-christmas";
const HINT_KEY = "decorations-hint-christmas";
const HINT_SEEN_KEY = "decorations-hint-seen-christmas";

const SNOW_COLOURS = [
  "radial-gradient(circle at top left, #dcf2fd, #60b4f2)",
  "#dbf2fd",
  "#d8f8ff",
  "#b8ddfa",
];

/**
 * Snow through December. `?decoration=christmas` previews it out of season.
 */
export const isChristmasSeason = (date: Date, override: unknown) =>
  override === "christmas" || date.getMonth() + 1 === 12;

/** macOS gets Control+D; everywhere else Ctrl+D is the browser's bookmark key. */
export const isMacPlatform = () =>
  /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);

export const readDecorationsEnabled = () => {
  try {
    return window.localStorage.getItem(ENABLED_KEY) !== "off";
  } catch {
    return true;
  }
};

export const saveDecorationsEnabled = (enabled: boolean) => {
  try {
    if (enabled) window.localStorage.removeItem(ENABLED_KEY);
    else window.localStorage.setItem(ENABLED_KEY, "off");
  } catch {
    // Storage unavailable: the choice only holds for this page view.
  }
};

/**
 * The shortcut tip shows once per visit until the reader asks never to see it
 * again (or uses the shortcut, which shows they already know it).
 */
export const shouldShowDecorationsHint = () => {
  try {
    return (
      window.localStorage.getItem(HINT_KEY) !== "hide" &&
      window.sessionStorage.getItem(HINT_SEEN_KEY) === null
    );
  } catch {
    return false;
  }
};

export const markDecorationsHintSeen = () => {
  try {
    window.sessionStorage.setItem(HINT_SEEN_KEY, "1");
  } catch {}
};

export const hideDecorationsHintForGood = () => {
  try {
    window.localStorage.setItem(HINT_KEY, "hide");
  } catch {}
};

const randomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// Every flake falls on the same keyframes; these give each its own column,
// pace, drift and size.
const snowflake = () => {
  const piece = document.createElement("span");
  const size = `${randomInRange(2, 10).toFixed(1)}px`;
  piece.className = "snowflake";
  piece.style.animationDuration = `${randomInRange(10, 30).toFixed(1)}s`;
  // A negative delay starts each flake part-way down, so the screen is already
  // full rather than waiting for the first ones to fall in.
  piece.style.animationDelay = `-${randomInRange(0, 30).toFixed(1)}s`;
  piece.style.setProperty("--x", `${randomInRange(0, 100).toFixed(2)}vw`);
  piece.style.setProperty("--drift", `${randomInRange(-10, 10).toFixed(2)}vw`);
  piece.style.setProperty("--spin", "0deg");
  piece.style.width = size;
  piece.style.height = size;
  piece.style.background =
    SNOW_COLOURS[Math.floor(Math.random() * SNOW_COLOURS.length)];
  piece.style.opacity = randomInRange(0.3, 1).toFixed(2);
  return piece;
};

const build = () => {
  const container = document.createElement("div");
  container.id = CONTAINER_ID;
  container.setAttribute("aria-hidden", "true");

  // Fewer on a narrow screen, where the full set would crowd out the text.
  const count = Math.min(200, Math.max(60, Math.round(window.innerWidth / 8)));
  for (let i = 0; i < count; i++) container.appendChild(snowflake());

  return container;
};

let hideTimer: ReturnType<typeof setTimeout> | undefined;

/** Fades the snow in, building it the first time. */
export const showDecoration = () => {
  clearTimeout(hideTimer);

  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = build();
    container.dataset.hidden = "";
    document.body.appendChild(container);
  }

  container.style.display = "";
  // Flush the hidden state first, or the browser skips straight to visible.
  void container.offsetWidth;
  delete container.dataset.hidden;
};

/** Fades the snow out, then takes it out of rendering so it costs nothing. */
export const hideDecoration = () => {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) return;

  container.dataset.hidden = "";
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    container.style.display = "none";
  }, FADE_MS);
};
