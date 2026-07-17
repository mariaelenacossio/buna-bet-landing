/**
 * Static export for GitHub Pages.
 *
 * The site deploys to a PROJECT page: mariaelenacossio.github.io/buna-bet-landing
 * so every route and asset needs the repo name as a prefix.
 *
 * IF YOU MOVE TO A CUSTOM DOMAIN (or a username.github.io root repo):
 * set basePath to "" below (one line, single source of truth). It flows into
 * basePath, assetPrefix, and NEXT_PUBLIC_BASE_PATH together, and also add a
 * CNAME file to public/ with the bare domain. Leaving a repo-name prefix on a
 * custom domain serves the site at example.com/buna-bet-landing/ and 404s.
 */

// Single source of truth. Empty string = root / custom domain.
const basePath = "/buna-bet-landing";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a fully static site to out/. No Node server at runtime.
  output: "export",

  // GitHub Pages is a plain file host and cannot run Next's image optimizer.
  // Nothing uses next/image yet; this is set so the gallery photos work when
  // they land. Local images (/gallery/*.jpg) are fine unoptimized. A remote
  // src would need the loader configured, or it will fail at build.
  images: { unoptimized: true },

  basePath,
  assetPrefix: basePath,

  // Exposes basePath to client code. next/image and next/link prefix
  // automatically; raw <video>/<img> src to files in public/ do NOT, so
  // components read this via lib/assetPath.ts to build correct URLs.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Pages serves /about as /about/index.html, so emit directories not .html files.
  trailingSlash: true,
};

export default nextConfig;
