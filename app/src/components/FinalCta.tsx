import React from 'react';
import Link from '@/components/Link';

export function FinalCta() {
  return (
    <section className="bg-[#111214]">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="font-display max-w-2xl text-[2.25rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[3.25rem]">
            Give timetable week back to your school.
          </h2>
          <div className="lg:pb-2">
            <p className="max-w-sm text-[17px] leading-relaxed text-white/60">
              Join 50,000+ institutes who stopped rebuilding their schedule by hand
              every term.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link prefetch={false}
                href="/signup/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-[#111214] transition-colors hover:bg-[#EAECEF]"
              >
                Start Free
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link prefetch={false}
                href="/contact/"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/60"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/45">
          <li>Free forever</li>
          <li>No installation</li>
          <li>GDPR compliant</li>
          <li>Cancel anytime</li>
        </ul>
      </div>
    </section>
  );
}
