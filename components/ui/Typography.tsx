interface HeadingProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
}

/** Same scale at every level, like notnick.io: pick `as` from the outline. */
export const Heading = (props: HeadingProps) => {
  const Tag = props.as ?? "h2";
  return (
    <Tag
      className={`text-3xl sm:text-4xl font-bold text-black dark:text-white ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </Tag>
  );
};

export const Text = (props: { className?: string; children: React.ReactNode }) => (
  <p
    className={`text-base text-gray-600 dark:text-gray-300 ${props.className ?? ""}`}
  >
    {props.children}
  </p>
);

// Uppercased with CSS so screen readers read the words as written.
export const Label = (props: { children: React.ReactNode; id?: string }) => (
  <span
    id={props.id}
    className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300"
  >
    {props.children}
  </span>
);

/** The green pill from notnick.io's post cards. */
export const Tag = (props: { children: React.ReactNode }) => (
  <span className="flex w-fit items-center whitespace-nowrap rounded-full bg-primary px-3 py-1 text-sm font-bold text-white dark:text-black">
    {props.children}
  </span>
);

export const Kbd = (props: { children: React.ReactNode }) => (
  <kbd
    className="inline-flex min-w-[1.5rem] items-center justify-center rounded border border-gray-300
    dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 font-sans text-xs font-semibold
    text-black dark:text-white"
  >
    {props.children}
  </kbd>
);
