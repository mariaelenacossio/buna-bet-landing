import BunaBadge from "./BunaBadge";
import Reveal from "./Reveal";

/**
 * PLACEHOLDER PHOTOGRAPHY.
 *
 * These are tinted blocks, not images. Swap each one for the final brand
 * photography using next/image:
 *
 *   <Image src="/gallery/abol-bag.jpg" alt={item.alt} fill sizes="..."
 *          className="object-cover" />
 *
 * The `alt` strings below are written for the real photo each tile stands in
 * for, so they carry straight over. Keep the aspect ratios as they are: they
 * reserve layout space and stop the grid shifting once real images load.
 */
const TILES = [
  {
    id: "abol-bag",
    alt: "A kraft bag of Abol roast with the Buna Bet badge on the front, on a linen surface.",
    caption: "Abol, 340g",
    span: "sm:col-span-2 sm:row-span-2",
    aspect: "aspect-square",
    tint: "from-cherry/30 to-basalt",
  },
  {
    id: "cart-market",
    alt: "The Buna Bet coffee cart set up at an outdoor Vancouver market, steam rising from the jebena.",
    caption: "Cart, market day",
    span: "",
    aspect: "aspect-[4/3]",
    tint: "from-forest/40 to-basalt",
  },
  {
    id: "jebena-pour",
    alt: "Coffee being poured from a clay jebena into small handleless cups.",
    caption: "The pour",
    span: "",
    aspect: "aspect-[4/3]",
    tint: "from-qibe/25 to-basalt",
  },
  {
    id: "green-beans",
    alt: "Green coffee beans in a shallow roasting pan before the roast.",
    caption: "Before the roast",
    span: "",
    aspect: "aspect-[4/3]",
    tint: "from-forest/25 to-basalt",
  },
  {
    id: "sticker-sheet",
    alt: "A sheet of Buna Bet stickers showing the circular interlace badge in cherry red.",
    caption: "Badge, in cherry",
    span: "",
    aspect: "aspect-[4/3]",
    tint: "from-cherry/20 to-basalt",
  },
];

export default function Gallery() {
  return (
    <section
      className="bg-sand py-24 sm:py-32"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="eyebrow text-cherry">Gallery</p>
          <h2
            id="gallery-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-semibold italic tracking-tight text-charcoal sm:text-5xl"
          >
            Bags, cart, and the pot it all runs through
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.id} delay={i * 0.06} className={tile.span}>
              <figure className="h-full">
                <div
                  className={`relative ${tile.aspect} h-full w-full overflow-hidden rounded-sm border border-charcoal/12 bg-gradient-to-br ${tile.tint}`}
                >
                  {/* Remove this badge watermark when the real photo goes in. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center"
                  >
                    <BunaBadge className="h-14 w-14 text-sand/20" />
                  </div>
                  <span className="eyebrow absolute bottom-3 left-3 text-sand/40">
                    Photo to come
                  </span>
                </div>
                <figcaption className="eyebrow mt-3 text-charcoal/55">
                  {tile.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
