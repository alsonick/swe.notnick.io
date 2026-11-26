// Class strings shared by several components, copied from notnick.io so the
// two sites look and feel the same.

export const FOCUS_RING =
  "outline-none focus-visible:ring-4 ring-primary focus-visible:ring-offset-2 dark:ring-offset-black";

export const PRIMARY_BUTTON = `inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-base
  font-semibold text-white dark:text-black duration-300 md:hover:opacity-90 ${FOCUS_RING}
  disabled:opacity-50 disabled:cursor-not-allowed`;

export const SECONDARY_BUTTON = `inline-flex h-10 items-center justify-center rounded-lg border border-teal-100
  dark:border-teal-900 px-5 text-base font-semibold text-gray-600 dark:text-gray-300 duration-300
  md:hover:border-primary md:hover:text-black md:dark:hover:text-white ${FOCUS_RING}
  disabled:opacity-50 disabled:cursor-not-allowed`;

export const SQUARE_BUTTON = `flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-300
  dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-black dark:text-white duration-300
  md:hover:bg-gray-200 md:dark:hover:bg-gray-900 ${FOCUS_RING} disabled:opacity-40 disabled:cursor-not-allowed`;

export const ICON = "text-xl ml-2 md:group-hover:scale-110 transition-transform duration-200 ease-out";

export const BORDER = "border-teal-100 dark:border-teal-900";
