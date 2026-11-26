# swe.notnick.io

Flashcards for **COMP6003 Software Engineering Practice**, written from the slides of the first 15 lectures (the Kubernetes lecture is left out). The design follows [notnick.io](https://notnick.io).

## Getting started

**Prerequisites:** Node.js 22.12+ and Yarn.

```bash
yarn install
yarn dev
```

Open [http://localhost:3000/flashcards](http://localhost:3000/flashcards).

## Adding or editing cards

Cards live in `lib/flashcards/`, one file per week, and the deck order is set in `lib/flashcards/index.ts`. Card text supports `**bold**`, `` `code` ``, fenced code blocks, and `- ` / `1. ` lists.

Progress ("Got it" / "Still learning") is stored in the browser's localStorage under the card's id (`<lecture-slug>/<index>`), so adding cards to the end of a lecture keeps everyone's progress, while reordering a lecture's cards shifts it.

## Stack

- [Next.js](https://nextjs.org/) (pages router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
