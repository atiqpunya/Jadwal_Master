'use client';

import React, { useState } from 'react';

interface ContactFormSectionProps {
  variant?: 'home' | 'contact-page';
}

export function ContactFormSection({ variant = 'home' }: ContactFormSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      data-ad-place={variant === 'home' ? 'home_contact' : undefined}
      className={variant === 'home' ? 'border-t border-[#E4E6EA] bg-white' : 'bg-white'}
    >
      <div
        className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${
          variant === 'contact-page' ? 'pb-24 pt-16 sm:py-[99px] lg:py-[92.5px]' : 'py-20 sm:py-[128px]'
        }`}
      >
        {variant === 'home' && (
          <div className="max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F46E5] align-middle"
              />
              Get in touch
            </span>
            <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
              Tell us about your schedule
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[#565A62]">
              The more complex it is, the more we want to hear about it. We will
              come back within 24 hours.
            </p>
          </div>
        )}

        <div
          className={`${
            variant === 'home' ? 'mt-14 ' : ''
          }grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16`}
        >
          <div>
            {variant === 'contact-page' && (
              <div className="mb-8">
                <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-[#111214]">
                  Send us a message
                </h2>
                <p className="mt-1.5 text-sm text-[#565A62]">
                  We reply within 24 hours, usually sooner.
                </p>
              </div>
            )}

            {submitted ? (
              <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-6">
                <div className="font-display text-lg font-bold text-[#065F46]">
                  Message received
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#047857]">
                  Thanks, {name}. Our scheduling specialists have your inquiry and
                  will follow up at {email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setCountryCode('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-4 rounded-full bg-[#065F46] px-5 py-2 text-xs font-semibold text-white hover:bg-[#064E3B]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor={`contact-name-${variant}`}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    NAME
                  </label>
                  <input
                    id={`contact-name-${variant}`}
                    type="text"
                    required
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-[#D5D9DF] bg-white px-4 py-3 text-[15px] text-[#111214] transition-colors placeholder:text-[#A9AEB6] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`contact-email-${variant}`}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id={`contact-email-${variant}`}
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#D5D9DF] bg-white px-4 py-3 text-[15px] text-[#111214] transition-colors placeholder:text-[#A9AEB6] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`contact-phone-${variant}`}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    PHONE NUMBER
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <input
                      type="text"
                      aria-label="Country code"
                      placeholder="+1"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full rounded-lg border border-[#D5D9DF] bg-white px-4 py-3 text-[15px] text-[#111214] transition-colors placeholder:text-[#A9AEB6] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                    />
                    <input
                      id={`contact-phone-${variant}`}
                      type="tel"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-[#D5D9DF] bg-white px-4 py-3 text-[15px] text-[#111214] transition-colors placeholder:text-[#A9AEB6] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor={`contact-message-${variant}`}
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id={`contact-message-${variant}`}
                    rows={5}
                    placeholder="Tell us about your school and what you are trying to schedule."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-y rounded-lg border border-[#D5D9DF] bg-white px-4 py-3 text-[15px] text-[#111214] transition-colors placeholder:text-[#A9AEB6] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-full bg-[#4F46E5] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#4338CA]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(`contact-name-${variant}`)?.focus();
              }}
              className="group block rounded-xl bg-[#111214] p-6 transition-colors hover:bg-[#2A2C31]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-white/70"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <h3 className="font-display mt-4 text-lg font-bold tracking-[-0.02em] text-white">
                Book a 30-minute demo
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                See TimetableMaster run against a schedule like yours.
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-white underline decoration-white/30 underline-offset-[6px] group-hover:decoration-white">
                Pick a time
              </span>
            </a>

            <div className="mt-8 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
              <a
                href="mailto:hello@timetablemaster.com"
                className="flex items-center gap-3 py-4 transition-colors hover:text-[#4F46E5]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#8A8F98]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8A8F98]">
                    EMAIL
                  </span>
                  <span className="block truncate text-sm font-semibold text-inherit">
                    hello@timetablemaster.com
                  </span>
                </span>
              </a>

              <a
                href="https://wa.me/919110449907"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-4 transition-colors hover:text-[#4F46E5]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#8A8F98]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                  />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8A8F98]">
                    WHATSAPP
                  </span>
                  <span className="block truncate text-sm font-semibold text-inherit">
                    +91-9110449907
                  </span>
                </span>
              </a>

              <a
                href="tel:+919110449907"
                className="flex items-center gap-3 py-4 transition-colors hover:text-[#4F46E5]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-[#8A8F98]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-[0.14em] text-[#8A8F98]">
                    PHONE
                  </span>
                  <span className="block truncate text-sm font-semibold text-inherit">
                    +91-9110449907
                  </span>
                </span>
              </a>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-[#565A62]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
              We typically respond within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
