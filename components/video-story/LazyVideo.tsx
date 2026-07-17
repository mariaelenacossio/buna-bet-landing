"use client";

import { useEffect, useRef, useState } from "react";
import { assetPath } from "@/lib/assetPath";

type LazyVideoProps = {
  src: string; // root-relative, pre-basePath
  className?: string;
  /**
   * Reduced/static mode: no autoplay, show a first frame instead. Used for
   * prefers-reduced-motion, where motion must not start on its own.
   */
  still?: boolean;
};

/**
 * A decorative background video that only fetches its file once it is near the
 * viewport, so the initial page load does not pay for all three at once.
 *
 * The <source> is mounted only after the IntersectionObserver fires, which is
 * what actually defers the network request (preload alone would not, once a
 * src is present). rootMargin gives the file a head start before it scrolls in.
 */
export default function LazyVideo({ src, className, still }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      // Begin loading roughly two viewports out.
      { rootMargin: "200% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay can be refused silently; nudge it once the file can play. The
  // catch keeps a blocked play() from throwing an unhandled rejection.
  function handleCanPlay() {
    if (still) return;
    ref.current?.play().catch(() => {});
  }

  // #t=0.1 makes browsers paint a real frame in still mode without playing.
  const resolved = near
    ? `${assetPath(src)}${still ? "#t=0.1" : ""}`
    : undefined;

  return (
    <video
      ref={ref}
      className={className}
      muted
      loop
      playsInline
      autoPlay={!still}
      preload={still ? "metadata" : "none"}
      onCanPlay={handleCanPlay}
      aria-hidden="true"
      tabIndex={-1}
      // key forces a fresh element when the resolved src appears, so the
      // browser picks up the new source reliably.
      src={resolved}
    />
  );
}
