import Reveal from "./Reveal";

/**
 * Inline stroke icons, matched to a single visual language: 1.25 stroke,
 * 24px grid, round caps. Keep any additions consistent with that.
 */
function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 8h14l-1.2 12.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8Z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
      <path d="M9.5 13c1.7 1.3 3.3 1.3 5 0" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6h11a3 3 0 0 1 3 3v6H4Z" />
      <path d="M18 9h1.6a1 1 0 0 1 .95.68L21.5 13v2H18" />
      <circle cx="8" cy="18.5" r="1.6" />
      <circle cx="17.5" cy="18.5" r="1.6" />
      <path d="M8 6V3.5M11.5 6V4.5" />
    </svg>
  );
}

const SERVICES = [
  {
    tag: "For cafés",
    title: "Wholesale Beans",
    icon: BagIcon,
    body: "Our Abol roast, sourced direct from the farms that grow it and roasted for rooms that pull a lot of shots. Consistent bags, week after week.",
    points: [
      "Direct trade sourcing",
      "Whole bean or ground to your grinder",
      "Bag sizes and pricing on request",
    ],
    cta: "Ask about wholesale",
  },
  {
    tag: "Mobile",
    title: "Coffee Cart",
    icon: CartIcon,
    body: "The whole setup travels. Markets, private events, offices. We bring the grinder, the jebena, and someone who knows how to use both.",
    points: [
      "Markets and street events",
      "Private events and weddings",
      "Office mornings across Metro Vancouver",
    ],
    cta: "Book the cart",
  },
];

export default function Services() {
  return (
    <section
      id="offer"
      className="scroll-mt-16 bg-paper py-24 sm:py-32"
      aria-labelledby="offer-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-cherry">What we offer</p>
          <h2
            id="offer-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-semibold italic tracking-tight text-charcoal sm:text-5xl"
          >
            Two things, done properly
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col rounded-sm border border-charcoal/12 bg-sand p-8 transition-colors duration-200 ease-brand hover:border-cherry/45 sm:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-9 w-9 text-cherry" />
                    <span className="eyebrow rounded-sm border border-charcoal/15 px-2.5 py-1 text-charcoal/60">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-semibold italic text-charcoal sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal/80">
                    {service.body}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-charcoal/12 pt-6">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-charcoal/75"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-qibe"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#book"
                    className="focus-ring mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.18em] text-cherry transition-colors duration-200 ease-brand hover:text-charcoal"
                  >
                    {service.cta}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 ease-brand group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* A café is explicitly out of scope for this phase. Stated plainly so
            visitors do not turn up somewhere expecting one. */}
        <Reveal delay={0.16}>
          <p className="mt-10 max-w-prose text-sm leading-relaxed text-charcoal/55">
            No café yet. Beans and the cart are what we do right now, and both
            have our full attention.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
