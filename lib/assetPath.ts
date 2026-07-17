/**
 * Prefixes a public/ asset path with the deploy basePath.
 *
 * Files in public/ are NOT basePath-prefixed by Next (only next/image and
 * next/link get that automatically). On the GitHub Pages project page a raw
 * `/videos/x.mp4` resolves to the domain root and 404s. This rebuilds it as
 * `/buna-bet-landing/videos/x.mp4`.
 *
 * The prefix comes from NEXT_PUBLIC_BASE_PATH, set once in next.config.mjs, so
 * moving to a custom domain (basePath "") makes this a no-op with no edits here.
 *
 * @param path root-relative path beginning with "/", e.g. "/videos/cherries.mp4"
 */
export function assetPath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
