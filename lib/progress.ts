import { useCallback, useEffect, useState } from "react";

// Progress lives in localStorage only: no accounts, nothing leaves the browser.
// Every read and write is wrapped, since storage can be unavailable (private
// mode, quota) and the cards should still work for the visit.

const KNOWN_KEY = "swe-flashcards:known";
const PREFS_KEY = "swe-flashcards:prefs";

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Nothing to do: progress just won't survive a reload.
  }
};

/** Ids of the cards the reader has marked "Got it". */
export const useKnownCards = () => {
  const [known, setKnownState] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Loaded after mount so the server render and first client render match.
  useEffect(() => {
    setKnownState(new Set(read<string[]>(KNOWN_KEY, [])));
    setLoaded(true);
  }, []);

  const update = useCallback((change: (next: Set<string>) => void) => {
    setKnownState((current) => {
      const next = new Set(current);
      change(next);
      write(KNOWN_KEY, Array.from(next));
      return next;
    });
  }, []);

  const setKnown = useCallback(
    (id: string, isKnown: boolean) =>
      update((next) => (isKnown ? next.add(id) : next.delete(id))),
    [update]
  );

  const forget = useCallback(
    (ids: string[]) => update((next) => ids.forEach((id) => next.delete(id))),
    [update]
  );

  return { known, setKnown, forget, loaded };
};

export interface StudyPrefs {
  shuffle: boolean;
  /** Leave cards marked "Got it" out of each new round. */
  skipKnown: boolean;
  /** Answer by picking from options instead of flipping the card. */
  multipleChoice: boolean;
}

const DEFAULT_PREFS: StudyPrefs = {
  shuffle: false,
  skipKnown: true,
  multipleChoice: true,
};

export const useStudyPrefs = () => {
  const [prefs, setPrefs] = useState<StudyPrefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPrefs({ ...DEFAULT_PREFS, ...read<Partial<StudyPrefs>>(PREFS_KEY, {}) });
    setLoaded(true);
  }, []);

  const updatePrefs = useCallback((change: Partial<StudyPrefs>) => {
    setPrefs((current) => {
      const next = { ...current, ...change };
      write(PREFS_KEY, next);
      return next;
    });
  }, []);

  return { prefs, updatePrefs, loaded };
};

/** Fisher–Yates, returning a new array. */
export const shuffled = <T,>(items: T[]): T[] => {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
