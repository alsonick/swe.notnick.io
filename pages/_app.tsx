import { MAIN_CONTENT_ID } from "../lib/constants";
import { IconContext } from "react-icons";
import "../styles/globals.css";

// Next.js
import { Inter, JetBrains_Mono } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Icons are decorative unless a control says otherwise.
    <IconContext.Provider value={{ attr: { "aria-hidden": "true" } }}>
      <div className={`${inter.className} ${mono.variable}`}>
        <a
          href={`#${MAIN_CONTENT_ID}`}
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000]
          focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-black
          focus:outline-none focus:ring-4 focus:ring-primary dark:focus:bg-black dark:focus:text-white"
        >
          Skip to content
        </a>
        <Component {...pageProps} />
      </div>
    </IconContext.Provider>
  );
}
