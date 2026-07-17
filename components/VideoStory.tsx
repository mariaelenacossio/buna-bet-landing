"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { STORY_ACTS, type StoryAct } from "@/lib/videoStoryData";
import VideoAct from "./video-story/VideoAct";
import LazyVideo from "./video-story/LazyVideo";

/**
 * Scroll-driven video story: an intro, three acts, and a coda.
 *
 * Rendering strategy is progressive enhancement. The stacked layout is the
 * baseline: it is what renders on the server, on mobile, and under
 * prefers-reduced-motion. The pinned-parallax layout is layered on only for a
 * mounted desktop client that allows motion. That way the accessible version
 * is the default and can never be the thing that breaks, and pinned
 * scroll-hijacking never reaches a mobile browser or a reduced-motion user.
 */
export default function VideoStory() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Baseline until proven otherwise. Desktop + motion-ok gets the pinned build.
  const pinned = mounted && !reduceMotion && !isMobile;

  return (
    <section
      aria-labelledby="story-intro-heading"
      className="weave-grain-dark bg-basalt text-sand"
    >
      <StoryIntro />

      {pinned ? (
        STORY_ACTS.map((act) => <VideoAct key={act.id} act={act} />)
      ) : (
        <div>
          {STORY_ACTS.map((act) => (
            <StackedAct key={act.id} act={act} still={!!reduceMotion} />
          ))}
        </div>
      )}

      <StoryCoda />
    </section>
  );
}

function StoryIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="eyebrow text-qibe">A story in three pours</p>
      <p className="mt-4 text-sm text-sand/60">From the highlands to your cup</p>

      <h2
        id="story-intro-heading"
        className="mt-6 font-display text-4xl font-semibold tracking-tight text-sand sm:text-6xl"
      >
        The story of <span className="italic">buna.</span>
      </h2>

      <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-sand/80">
        Scroll slowly. Three scenes, three depths: cherry, ember, and pour.
      </p>

      <span
        className={`eyebrow mt-12 text-sand/50 ${
          reduceMotion ? "" : "motion-safe:animate-bounce"
        }`}
      >
        Scroll &darr;
      </span>
    </div>
  );
}

/**
 * Non-pinned act for mobile and reduced motion. A full-width video (playing on
 * mobile, a still first frame under reduced motion) with the text over a
 * matching gradient. Same heading hierarchy as the pinned version.
 */
function StackedAct({ act, still }: { act: StoryAct; still: boolean }) {
  return (
    <section
      aria-labelledby={`act-${act.id}-heading`}
      className="relative min-h-[85svh] overflow-hidden"
    >
      <div className="absolute inset-0">
        <LazyVideo
          src={act.video}
          still={still}
          className="h-full w-full object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,21,18,0.1) 0%, rgba(26,21,18,0.45) 55%, rgba(26,21,18,0.85) 100%)",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-6 font-mono text-6xl font-medium tabular-nums text-sand/15 sm:text-7xl"
      >
        {act.tag}
      </span>

      <div className="relative flex min-h-[85svh] items-end">
        <div className="w-full px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-xl">
              <p className="eyebrow text-qibe">
                {act.numeral}. {act.label}
              </p>
              <h2
                id={`act-${act.id}-heading`}
                className="mt-4 font-display text-3xl font-semibold italic leading-tight tracking-tight text-sand sm:text-5xl"
              >
                {act.headline}
              </h2>
              <p className="mt-4 max-w-prose text-base leading-relaxed text-sand/85">
                {act.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCoda() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
      <h2 className="font-display text-3xl font-semibold italic tracking-tight text-sand sm:text-5xl">
        Every cup is a small ceremony.
      </h2>
      <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-sand/80">
        Grown slowly. Roasted by hand. Poured with care. That is Abol.
      </p>
      <p className="eyebrow mt-12 text-qibe">
        Buna Bet &middot; First pour, always welcome
      </p>
    </div>
  );
}
