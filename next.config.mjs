/**
 * Static export for GitHub Pages.
 *
 * The site deploys to a PROJECT page: mariaelenacossio.github.io/buna-bet-landing
 * so every route and asset needs the repo name as a prefix.
 *
 * IF YOU MOVE TO A CUSTOM DOMAIN (or a username.github.io root repo):
 * delete basePath and assetPrefix below, and add a CNAME file to public/ with
 * the bare domain. Leaving them in place on a custom domain serves the site at
 * example.com/buna-bet-landing/ and every asset 404s at the root.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a fully static site to out/. No Node server at runtime.
  output: "export",

  // GitHub Pages is a plain file host and cannot run Next's image optimizer.
  // Nothing uses next/image yet; this is set so the gallery photos work when
  // they land. Local images (/gallery/*.jpg) are fine unoptimized. A remote
  // src would need the loader configured, or it will fail at build.
  images: { unoptimized: true },

  basePath: "/buna-bet-landing",
  assetPrefix: "/buna-bet-landing",

  // Pages serves /about as /about/index.html, so emit directories not .html files.
  trailingSlash: true,
};

export default nextConfig;
