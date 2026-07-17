"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Web3Forms integration.
 *
 * Setup, once:
 *   1. Go to https://web3forms.com and enter the inbox that should receive
 *      submissions (hello@bunabet.com). No account or password needed.
 *   2. They email you an access key. Copy it.
 *   3. Put it in `.env.local` at the project root:
 *        NEXT_PUBLIC_FORM_ENDPOINT=your-access-key-here
 *   4. Add the same variable in the Vercel dashboard under
 *      Settings > Environment Variables before deploying.
 *
 * Note on the name: this holds Web3Forms' *access key*, not a URL. The
 * variable is named NEXT_PUBLIC_FORM_ENDPOINT to match the agreed project
 * spec. The POST target itself is the constant below. Swapping to Formspree
 * later means posting the key-less body straight to their endpoint URL
 * instead.
 *
 * The key is safe to expose client-side. That is how Web3Forms is designed:
 * it is a submission token, not a secret. Spam is handled by the honeypot
 * below plus their own filtering.
 */
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

const CONTACT_EMAIL = "hello@bunabet.com";

const EVENT_TYPES = [
  { value: "market", label: "Market" },
  { value: "private", label: "Private event" },
  { value: "office", label: "Office" },
  { value: "other", label: "Other" },
];

type InquiryType = "wholesale" | "cart";
type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";

// Deliberately permissive. Real validation is the inbox bouncing.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("wholesale");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Set after mount: computing "today" during SSR risks a hydration mismatch
  // when the server and the visitor are on different sides of midnight.
  //
  // Built from local date parts, not toISOString(). ISO strings are UTC, which
  // west of Greenwich rolls over to tomorrow during the local evening: in
  // Vancouver that would block today's date from 5pm onward.
  useEffect(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setMinDate(
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    );
  }, []);

  const isCart = inquiryType === "cart";

  function validate(data: FormData) {
    const next: Partial<Record<FieldName, string>> = {};

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) next.name = "Add your name so we know who we are replying to.";
    if (!email) {
      next.email = "We need an email address to send the quote to.";
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = "That email is missing something. Check for a typo.";
    }
    if (!message) {
      next.message = isCart
        ? "Tell us roughly what the event is and we can quote it."
        : "Tell us what you are after and we can quote it.";
    }

    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const nextErrors = validate(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Send focus to the first field that failed, in DOM order.
      const firstInvalid = (["name", "email", "message"] as FieldName[]).find(
        (field) => nextErrors[field]
      );
      if (firstInvalid) {
        form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    if (!ACCESS_KEY) {
      setSubmitError(
        "The form is not connected yet. Email us directly and we will pick it up."
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const inquiryLabel = isCart ? "Coffee Cart Booking" : "Wholesale Beans";
    const payload: Record<string, unknown> = {
      access_key: ACCESS_KEY,
      subject: `Buna Bet: ${inquiryLabel} inquiry`,
      from_name: "Buna Bet website",
      botcheck: data.get("botcheck") ?? "",
      name: data.get("name"),
      email: data.get("email"),
      inquiry_type: inquiryLabel,
      message: data.get("message"),
    };

    if (isCart) {
      payload.event_date = data.get("eventDate") || "Not given";
      payload.event_type = data.get("eventType") || "Not given";
      payload.guest_count = data.get("guestCount") || "Not given";
      payload.location = data.get("location") || "Not given";
    }

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setSubmitError(
        "That did not go through. Try again, or email us directly and we will pick it up."
      );
    }
  }

  // Move focus to the confirmation so screen reader users land on the outcome.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <section
        id="book"
        className="scroll-mt-16 bg-paper py-24 sm:py-32"
        aria-labelledby="book-heading"
      >
        <div className="mx-auto max-w-2xl px-6">
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            className="focus-ring rounded-sm border border-forest/30 bg-sand p-10 text-center sm:p-14"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mx-auto h-11 w-11 text-forest"
            >
              <circle cx="12" cy="12" r="9.5" />
              <path d="m8 12.3 2.7 2.7L16 9.5" />
            </svg>
            <h2
              id="book-heading"
              className="mt-6 font-display text-3xl font-semibold italic text-charcoal"
            >
              Got it
            </h2>
            <p className="mt-3 text-base leading-relaxed text-charcoal/80">
              Thanks. We will get back to you within 1 to 2 business days.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="focus-ring mt-8 cursor-pointer font-mono text-xs uppercase tracking-[0.18em] text-cherry underline-offset-4 transition-colors duration-200 ease-brand hover:text-charcoal hover:underline"
            >
              Send another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="book"
      className="scroll-mt-16 bg-paper py-24 sm:py-32"
      aria-labelledby="book-heading"
    >
      <div className="mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="eyebrow text-cherry">Book / get a quote</p>
          <h2
            id="book-heading"
            className="mt-4 font-display text-3xl font-semibold italic tracking-tight text-charcoal sm:text-5xl"
          >
            Tell us what you need
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-charcoal/75">
            One form for both. A real person reads every one of these, so skip
            the formalities and just say what you are after.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 space-y-8"
          >
            {/* Honeypot. Hidden from people, catches naive bots. */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Inquiry type: a real radio group, styled as a segmented control,
                so it stays keyboard and screen reader native. */}
            <fieldset>
              <legend className="eyebrow text-charcoal/60">
                What is this about?
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {(
                  [
                    { value: "wholesale", label: "Wholesale Beans" },
                    { value: "cart", label: "Coffee Cart Booking" },
                  ] as const
                ).map((option) => (
                  <label
                    key={option.value}
                    className={`focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-cherry flex min-h-[48px] cursor-pointer items-center justify-center rounded-sm border px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 ease-brand ${
                      inquiryType === option.value
                        ? "border-cherry bg-cherry text-paper"
                        : "border-charcoal/20 bg-sand text-charcoal/70 hover:border-cherry/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="inquiryType"
                      value={option.value}
                      checked={inquiryType === option.value}
                      onChange={() => setInquiryType(option.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field
              label="Name"
              name="name"
              type="text"
              autoComplete="name"
              required
              error={errors.name}
            />

            <Field
              label="Email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              error={errors.email}
            />

            {/* Cart-only fields. Progressive disclosure: wholesale enquiries
                never see them, so the default form stays short. */}
            {isCart && (
              <fieldset className="space-y-8 rounded-sm border border-charcoal/12 bg-sand p-6">
                <legend className="eyebrow px-2 text-charcoal/60">
                  About the event
                </legend>

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Event date"
                    name="eventDate"
                    type="date"
                    min={minDate}
                    hint="Rough is fine"
                  />

                  <div>
                    <label
                      htmlFor="eventType"
                      className="block font-mono text-xs uppercase tracking-[0.14em] text-charcoal/70"
                    >
                      Event type
                    </label>
                    <select
                      id="eventType"
                      name="eventType"
                      defaultValue=""
                      className="focus-ring mt-2 min-h-[48px] w-full cursor-pointer rounded-sm border border-charcoal/25 bg-paper px-3 py-2.5 text-base text-charcoal transition-colors duration-200 ease-brand hover:border-charcoal/40"
                    >
                      <option value="">Choose one</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Guest count"
                    name="guestCount"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    hint="A ballpark helps us quote"
                  />

                  <Field
                    label="Location / city"
                    name="location"
                    type="text"
                    autoComplete="address-level2"
                    hint="Vancouver, Burnaby, further out"
                  />
                </div>
              </fieldset>
            )}

            <Field
              label="Message"
              name="message"
              multiline
              required
              error={errors.message}
              hint={
                isCart
                  ? "What the event is, and anything we should know about the space."
                  : "Rough volume, how often, and what you are pouring now."
              }
            />

            {submitError && (
              <p
                role="alert"
                className="rounded-sm border border-cherry/40 bg-cherry/5 px-4 py-3 text-sm leading-relaxed text-cherry"
              >
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ring inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-3 rounded-sm bg-cherry px-8 py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-paper transition-all duration-200 ease-brand hover:bg-cherry/90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {status === "submitting" && (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    opacity="0.3"
                  />
                  <path
                    d="M21 12a9 9 0 0 0-9-9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
              {status === "submitting" ? "Sending" : "Send inquiry"}
            </button>
          </form>

          {/* Lower-friction escape hatch for anyone who would rather not fill
              in a form. */}
          <p className="mt-8 text-sm leading-relaxed text-charcoal/65">
            Or just email us directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="focus-ring cursor-pointer text-cherry underline underline-offset-4 transition-colors duration-200 ease-brand hover:text-charcoal"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          {/*
            SCHEDULING WIDGET SLOT.
            Booking review is manual for now, which is the right call at this
            size: every cart request needs a human to check the date anyway.
            If that stops scaling, a Calendly/Cal.com embed drops in here,
            below the mailto line, as a third option rather than a replacement
            for the form.
          */}
        </Reveal>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  multiline?: boolean;
  min?: string | number;
  inputMode?: "email" | "numeric" | "text";
  autoComplete?: string;
};

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  hint,
  multiline,
  min,
  inputMode,
  autoComplete,
}: FieldProps) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const shared = {
    id: name,
    name,
    required,
    autoComplete,
    inputMode,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
    className: `focus-ring mt-2 w-full rounded-sm border bg-paper px-3.5 py-3 text-base text-charcoal transition-colors duration-200 ease-brand placeholder:text-charcoal/35 ${
      error
        ? "border-cherry"
        : "border-charcoal/25 hover:border-charcoal/40"
    }`,
  };

  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-xs uppercase tracking-[0.14em] text-charcoal/70"
      >
        {label}
        {required && (
          <span className="ml-1 text-cherry" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={`${shared.className} min-h-[8rem] resize-y`} />
      ) : (
        <input {...shared} type={type} min={min} className={`${shared.className} min-h-[48px]`} />
      )}

      {hint && (
        <p id={hintId} className="mt-2 text-xs leading-relaxed text-charcoal/50">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-sm leading-relaxed text-cherry"
        >
          {error}
        </p>
      )}
    </div>
  );
}
