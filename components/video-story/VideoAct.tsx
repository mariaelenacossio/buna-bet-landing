"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { StoryAct } from "@/lib/videoStoryData";
import LazyVideo from "./LazyVideo";

/**
 * One pinned, scroll-linked act.
 *
 * The outer section is tall (a bit over 2x viewport) to give scroll travel.
 * A sticky child pins the video full-screen while that travel is consumed.
 * Every animated value is driven by this act's own useScroll progress, so
 * acts do not share a global listener.
 */
export default function VideoAct({ act }: { act: StoryAct }) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Text: rise and fade in over the first third, hold, fall and fade out over
  // the last. The hold keeps it readable through the middle of the act.
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.14, 0.3, 0.68, 0.86, 1],
    [0, 0, 1, 1, 0, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.14, 0.3, 0.68, 0.86],
    [48, 0, 0, -48]
  );

  // Barely-there parallax: a slow zoom across the act so the loop does not
  // read as static. object-cover means scaling only ever zooms in, no edges.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      aria-labelledby={`act-${act.id}-heading`}
      className="relative h-[220vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-basalt">
        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
          <LazyVideo src={act.video} className="h-full w-full object-cover" />
        </motion.div>

        {/* Legibility gradient: light at top, deep basalt at the bottom. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,21,18,0.1) 0%, rgba(26,21,18,0.4) 55%, rgba(26,21,18,0.85) 100%)",
          }}
        />

        {/* Large quiet numeral, bottom-right. Fades with the act's text. */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: textOpacity }}
          className="pointer-events-none absolute bottom-6 right-6 font-mono text-6xl font-medium tabular-nums text-sand/15 sm:bottom-10 sm:right-10 sm:text-8xl"
        >
          {act.tag}
        </motion.span>

        <div className="relative flex h-full items-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="mx-auto w-full max-w-6xl px-6"
          >
            <div className="max-w-xl">
              <p className="eyebrow text-qibe">
                {act.numeral}. {act.label}
              </p>
              <h2
                id={`act-${act.id}-heading`}
                className="mt-5 font-display text-4xl font-semibold italic leading-tight tracking-tight text-sand sm:text-6xl"
              >
                {act.headline}
              </h2>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-sand/85">
                {act.body}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
