import Reveal from "./Reveal";

// The three rounds of the ceremony, poured from the same grounds in order.
const ROUNDS = [
  {
    amharic: "አቦል",
    name: "Abol",
    order: "First",
    note: "The strongest pour. Everything the beans have to give.",
  },
  {
    amharic: "ቶና",
    name: "Tona",
    order: "Second",
    note: "Lighter. The conversation has usually started by now.",
  },
  {
    amharic: "በረካ",
    name: "Baraka",
    order: "Third",
    note: "The blessing. Nobody leaves before it is poured.",
  },
];

export default function Story() {
  return (
    <section className="bg-sand py-24 sm:py-32" aria-labelledby="story-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-cherry">The ceremony</p>
          <h2
            id="story-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-semibold italic tracking-tight text-charcoal sm:text-5xl"
          >
            Three rounds, one pot, nobody in a hurry
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-charcoal/80">
            Buna is poured three times: abol, tona, baraka. Same grounds each
            round, a little lighter every time, and the third one is the reason
            people stay. We named the roast after the first pour because that is
            the one you remember.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-6 sm:grid-cols-3">
          {ROUNDS.map((round, i) => (
            <Reveal as="li" key={round.name} delay={i * 0.08}>
              <div className="h-full rounded-sm border border-charcoal/12 bg-paper p-7 transition-colors duration-200 ease-brand hover:border-cherry/40">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    lang="am"
                    className="font-ethiopic text-2xl text-cherry"
                    aria-hidden="true"
                  >
                    {round.amharic}
                  </span>
                  <span className="eyebrow text-charcoal/45">
                    {round.order}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold italic text-charcoal">
                  {round.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-charcoal/75">
                  {round.note}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
