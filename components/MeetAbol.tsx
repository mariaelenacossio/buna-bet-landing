import BunaBadge from "./BunaBadge";
import Reveal from "./Reveal";

/**
 * PLACEHOLDER ORIGIN DATA.
 *
 * Yirgacheffe is a stand-in until the real sourcing details are confirmed.
 * Every field below is a placeholder. Swap the values here and the section
 * updates; nothing else hardcodes them.
 */
const ABOL_SPECS = [
  { label: "Origin", value: "Yirgacheffe, Ethiopia" }, // PLACEHOLDER
  { label: "Process", value: "Washed" }, // PLACEHOLDER
  { label: "Altitude", value: "1,900 to 2,200 m" }, // PLACEHOLDER
  { label: "Roast", value: "Medium" }, // PLACEHOLDER
];

const TASTING_NOTES = ["Bergamot", "Stone fruit", "Dark honey"]; // PLACEHOLDER

export default function MeetAbol() {
  return (
    <section
      id="abol"
      className="weave-grain-dark scroll-mt-16 bg-basalt py-24 text-sand sm:py-32"
      aria-labelledby="abol-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* PLACEHOLDER PRODUCT SHOT.
              Replace this block with the packaging photography when it lands.
              Keep the aspect-square wrapper so the layout does not shift. */}
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-sm border border-sand/12 bg-gradient-to-br from-cherry/25 via-basalt to-forest/30">
              <div
                aria-hidden="true"
                className="absolute inset-0 grid place-items-center"
              >
                <BunaBadge className="h-2/5 w-2/5 text-qibe/45" />
              </div>
              <p className="eyebrow absolute bottom-5 left-5 text-sand/50">
                Product shot to come
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow text-qibe">The signature roast</p>

            <div className="mt-4 flex items-baseline gap-4">
              <h2
                id="abol-heading"
                className="font-display text-4xl font-semibold italic tracking-tight sm:text-6xl"
              >
                Abol
              </h2>
              <span
                lang="am"
                className="font-ethiopic text-2xl text-qibe sm:text-3xl"
              >
                አቦል
              </span>
            </div>

            <p className="mt-6 max-w-prose text-lg leading-relaxed text-sand/85">
              Abol is the first pour of the ceremony and the strongest one. It is
              also the first roast we put our name on, so it had to be the one we
              would drink every morning ourselves.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-sand/15 pt-8">
              {ABOL_SPECS.map((spec) => (
                <div key={spec.label}>
                  <dt className="eyebrow text-sand/50">{spec.label}</dt>
                  <dd className="mt-1.5 font-display text-lg italic text-sand">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <p className="eyebrow text-sand/50">Tasting notes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {TASTING_NOTES.map((note) => (
                  <li
                    key={note}
                    className="rounded-sm border border-qibe/45 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-qibe"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tona and Baraka are reserved names, not live products. Teaser only. */}
            <p className="mt-10 max-w-prose border-l-2 border-cherry pl-5 text-sm leading-relaxed text-sand/65">
              Tona and Baraka come later. Same ceremony, different rounds, and we
              are not roasting them until they are worth the names.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
