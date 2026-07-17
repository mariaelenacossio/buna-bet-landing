import BunaBadge from "./BunaBadge";

export default function Hero() {
  return (
    <section className="weave-grain-dark relative overflow-hidden bg-basalt text-sand">
      {/* Warm bloom behind the badge. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-cherry/20 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
        <BunaBadge className="h-24 w-24 text-qibe sm:h-28 sm:w-28" />

        <h1 className="mt-10 font-display text-5xl font-semibold italic tracking-tight sm:text-7xl">
          Buna Bet
        </h1>

        <p
          lang="am"
          className="mt-4 font-ethiopic text-2xl text-qibe sm:text-3xl"
        >
          ቡና ቤት
        </p>
        <p className="eyebrow mt-3 text-sand/70">The coffee place</p>

        <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-sand/90 sm:text-xl">
          Ethiopian coffee in Vancouver. Wholesale beans and a mobile cart, both
          built around the buna ceremony.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="focus-ring-dark inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-sm bg-cherry px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-transform duration-200 ease-brand hover:scale-[1.02] active:scale-[0.98]"
          >
            Get a quote
          </a>
          <a
            href="#offer"
            className="focus-ring-dark inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-sm border border-sand/25 px-8 py-3 font-mono text-xs uppercase tracking-[0.18em] text-sand transition-colors duration-200 ease-brand hover:border-qibe hover:text-qibe"
          >
            What we do
          </a>
        </div>

        <p className="eyebrow absolute bottom-8 left-1/2 -translate-x-1/2 text-sand/45">
          Vancouver, BC
        </p>
      </div>
    </section>
  );
}
