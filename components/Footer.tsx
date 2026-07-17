import BunaBadge from "./BunaBadge";

const CONTACT_EMAIL = "hello@bunabet.com";

// PLACEHOLDER social links. Swap the `href` values once the accounts exist.
// If one of these never happens, delete the entry rather than shipping a
// link to nowhere.
const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const NAV = [
  { label: "What we offer", href: "#offer" },
  { label: "Abol", href: "#abol" },
  { label: "Get a quote", href: "#book" },
];

export default function Footer() {
  return (
    <footer className="weave-grain-dark bg-basalt text-sand">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <BunaBadge
                className="h-11 w-11 text-qibe"
                title="Buna Bet badge"
              />
              <div>
                <p className="font-display text-xl font-semibold italic">
                  Buna Bet
                </p>
                <p lang="am" className="font-ethiopic text-sm text-qibe">
                  ቡና ቤት
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/65">
              Ethiopian coffee in Vancouver. Wholesale beans and a mobile cart,
              built around the buna ceremony.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow text-sand/45">Pages</h2>
            <ul className="mt-2">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="focus-ring-dark inline-flex min-h-[44px] cursor-pointer items-center text-sm text-sand/75 transition-colors duration-200 ease-brand hover:text-qibe"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-sand/45">Find us</h2>
            <ul className="mt-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="focus-ring-dark inline-flex min-h-[44px] cursor-pointer items-center text-sm text-sand/75 transition-colors duration-200 ease-brand hover:text-qibe"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="focus-ring-dark inline-flex min-h-[44px] cursor-pointer items-center text-sm text-sand/75 transition-colors duration-200 ease-brand hover:text-qibe"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-sand/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-sand/40">Vancouver, BC</p>
          <p className="eyebrow text-sand/40">
            &copy; {new Date().getFullYear()} Buna Bet
          </p>
        </div>
      </div>
    </footer>
  );
}
