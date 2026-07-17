/**
 * PLACEHOLDER MARK.
 *
 * A circular badge built from a geometric interlace, approximating the
 * banded diamond/cross motifs of habesha kemis tibeb weaving. This is a
 * stand-in until the real logo file arrives. When it does, replace the
 * innards of this component (or swap in an <Image>/imported SVG) and every
 * usage across the page updates at once.
 *
 * Strokes use `currentColor`, so colour is set by the parent's text colour.
 * Keep it on cherry over light surfaces and qibe over basalt.
 */

type BunaBadgeProps = {
  className?: string;
  /** Decorative by default. Pass a title to expose it to screen readers. */
  title?: string;
};

const RING_DIAMOND_COUNT = 12;
const RING_RADIUS = 42.5;

export default function BunaBadge({ className, title }: BunaBadgeProps) {
  const diamonds = Array.from({ length: RING_DIAMOND_COUNT }, (_, i) => {
    const angle = (i * 360) / RING_DIAMOND_COUNT;
    const radians = (angle * Math.PI) / 180;
    return {
      key: i,
      x: 50 + RING_RADIUS * Math.cos(radians),
      y: 50 + RING_RADIUS * Math.sin(radians),
    };
  });

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}

      {/* Outer and inner rings frame the woven band. */}
      <circle cx="50" cy="50" r="47" />
      <circle cx="50" cy="50" r="38" />

      {/* Banded diamonds: the repeating tibeb motif. */}
      {diamonds.map(({ key, x, y }) => (
        <rect
          key={key}
          x={-2.6}
          y={-2.6}
          width={5.2}
          height={5.2}
          transform={`translate(${x.toFixed(3)} ${y.toFixed(3)}) rotate(45)`}
        />
      ))}

      {/* Centre interlace: two squares offset 45deg, read as an over-under weave. */}
      <rect x="34" y="34" width="32" height="32" />
      <rect
        x="34"
        y="34"
        width="32"
        height="32"
        transform="rotate(45 50 50)"
        opacity="0.55"
      />
      <circle cx="50" cy="50" r="21" />
      <circle cx="50" cy="50" r="11" opacity="0.55" />

      {/* Four cardinal ties, anchoring the centre to the band. */}
      <path d="M50 29V21M50 79v-8M29 50h-8M79 50h-8" />
    </svg>
  );
}
