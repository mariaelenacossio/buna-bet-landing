import type { Config } from "tailwindcss";

/**
 * Brand tokens live here and in app/globals.css (as CSS custom properties).
 * Both read the same hex values. To re-skin, change them in both places.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        basalt: "#1A1512",
        cherry: "#A23B2E",
        qibe: "#C89B3C",
        forest: "#2F4A3C",
        sand: "#EDE3D0",
        charcoal: "#241C16",
        paper: "#F7F1E4",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
        // Fraunces and IBM Plex ship no Ethiopic glyphs. Amharic text must use this.
        ethiopic: ["var(--font-noto-ethiopic)", "serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        // One shared easing so every transition on the page keeps the same rhythm.
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
