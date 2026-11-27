/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Two dev servers sharing one build folder overwrite each other's builds,
  // which sends the page into an endless reload. The preview server in
  // .claude/launch.json sets this so it can run next to a plain `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

module.exports = nextConfig;
