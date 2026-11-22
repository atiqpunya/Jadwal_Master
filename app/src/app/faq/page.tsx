'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';
import { SiteShell } from '@/components/SiteShell';
import { FaqAccordion, type FaqItem } from '@/components/FaqAccordion';
import { FinalCta } from '@/components/FinalCta';

const ALL_FAQS: Array<FaqItem & { category: string }> = [
  {
    category: 'Getting Started',
    question: 'Is TimetableMaster free to use?',
    answer:
      'Yes. The Free plan is free forever, with no credit card: for up to 40 staff members, set up your staff, classes and subjects, generate your timetable with the starter rules up to 10 times a day, and edit it by drag and drop. Upgrade to Pro when you want unlimited generations, every rule, PDF and Excel downloads, publishing and sharing, the calendar, absence, cover, leave, reports, integrations, org units and the AI Agent. Choose Max for student choice, IB, A-levels and electives, and guided setup with our team.',
  },
  {
    category: 'Getting Started',
    question: 'Do I need to install anything on my computer?',
    answer:
      'No. TimetableMaster is 100% cloud-based and works in any modern browser on Windows, Mac, Linux, Chromebook, iOS and Android. Nothing to install or back up.',
  },
  {
    category: 'Getting Started',
    question: 'How long does it take to build our first timetable?',
    answer:
      'Most schools import their staff, classes and teaching plan from Excel or CSV and generate their first conflict-free master timetable in under an hour.',
  },
  {
    category: 'Scheduling & Rules',
    question: 'Can I make manual adjustments?',
    answer:
      'Yes. Drag and drop any lesson in class, teacher, or room views with instant conflict checks. Manual edits stay locked automatically if you regenerate the rest of the timetable.',
  },
  {
    category: 'Scheduling & Rules',
    question: 'Does TimetableMaster support fortnightly cycles, double periods, and multiple campuses?',
    answer:
      'Yes. Configure 5-day, 6-day, 10-day fortnightly cycles, custom bell schedules per division, double/triple lab blocks, room capacities, building travel time, and teacher time-off constraints.',
  },
  {
    category: 'Scheduling & Rules',
    question: 'Can it handle IB, A-levels, and individual student course choices?',
    answer:
      'Yes. On Max, import student choices, auto-create balanced sections (including HL and SL taught together), and generate individual conflict-free timetables for every student.',
  },
  {
    category: 'Daily Operations',
    question: 'How do leave requests and substitute cover work together?',
    answer:
      'Staff submit full-day or half-day leave requests. Once approved, their periods open automatically in the Substitutes view with a ranked list of available teachers scored by subject familiarity, free periods, and weekly cover load.',
  },
  {
    category: 'Daily Operations',
    question: 'Can I export or print my timetables?',
    answer:
      'Yes. Export clean PDF and Excel/CSV timetables for classes, teachers, rooms, and master schedules, or publish live links and the staff app so changes appear immediately.',
  },
  {
    category: 'Security & Billing',
    question: 'How secure is my data?',
    answer:
      'All school data is encrypted in transit (TLS) and at rest, backed up continuously, and protected by role-based access control and GDPR-compliant data practices.',
  },
  {
    category: 'Security & Billing',
    question: 'Can we integrate with ManageBac, PowerSchool, Veracross, or iSAMS?',
    answer:
      'Yes. Pro, Max and Enterprise include built-in connectors for Veracross, PowerSchool, ManageBac, SchoolBase and iSAMS, plus our REST API and CSV/Excel import.',
  },
];

export default function FaqPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Getting Started', 'Scheduling & Rules', 'Daily Operations', 'Security & Billing'];

  const filtered = ALL_FAQS.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesQ =
      !query.trim() ||
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <SiteShell>
      <main>
        <section className="border-b border-[#E4E6EA] bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565A62]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                HELP CENTRE
              </span>
              <h1 className="font-display mt-5 text-[2.25rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#111214] sm:text-[3.25rem]">
                Frequently asked questions
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#565A62]">
                Everything you need to know about building timetables, managing cover, and running TimetableMaster at your school.
              </p>

              <div className="mt-8">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions (e.g. substitute, IB, export, pricing)..."
                  aria-label="Search FAQ"
                  className="w-full rounded-full border border-[#D5D9DF] bg-white px-5 py-3 text-sm text-[#111214] placeholder:text-[#8A8F98] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                />
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                      category === cat
                        ? 'border-[#111214] bg-[#111214] text-white'
                        : 'border-[#DDE0E5] bg-white text-[#565A62] hover:border-[#111214] hover:text-[#111214]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[820px] px-5 py-16 sm:px-8 sm:py-20">
            {filtered.length > 0 ? (
              <FaqAccordion items={filtered} />
            ) : (
              <div className="rounded-xl border border-[#DDE0E5] bg-white p-8 text-center">
                <p className="text-sm font-medium text-[#111214]">No matching questions found.</p>
                <p className="mt-1 text-sm text-[#565A62]">
                  Try another search term or{' '}
                  <Link href="/contact/" className="font-semibold text-[#4F46E5] underline">
                    contact our team directly
                  </Link>
                  .
                </p>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#DDE0E5] bg-white p-6">
              <div>
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Want to try all 6 modules live?
                </h2>
                <p className="mt-1 text-sm text-[#565A62]">
                  Open the interactive TimetableMaster workspace with preloaded school data.
                </p>
              </div>
              <Link
                href="/workspace/"
                className="rounded-full bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
              >
                Open Workspace →
              </Link>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </SiteShell>
  );
}
