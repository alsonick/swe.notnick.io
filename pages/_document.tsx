import { Html, Head, Main, NextScript } from "next/document";

// Runs before the page paints, so a reader who chose light mode never sees a
// flash of the dark default. Dark is the default, like notnick.io.
const THEME_SCRIPT = `try{if(localStorage.getItem("theme")==="light")document.documentElement.classList.remove("dark")}catch(e){}`;

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </Head>
      <body className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-150 ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
