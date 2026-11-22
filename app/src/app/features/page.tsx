import type { Metadata } from 'next';
import React from 'react';
import Link from '@/components/Link';
import { SiteShell } from '@/components/SiteShell';
import {
  TimetableGridVisual,
  CoverAssignVisual,
  LeaveRequestsVisual,
  SchoolCalendarVisual,
  StudentChoiceVisual,
  AiAgentVisual,
} from '@/components/ProductVisuals';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FinalCta } from '@/components/FinalCta';

export const metadata: Metadata = {
  title: 'Features | TimetableMaster',
  description:
    'Explore the powerful features of TimetableMaster - your go-to solution for automated school timetable scheduling.',
};

const MODULE_JUMP_LINKS = [
  { label: 'Timetables', href: '#timetable' },
  { label: 'Substitutes', href: '#substitute' },
  { label: 'Leave', href: '#leave-management' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Student choice', href: '#student-scheduling' },
  { label: 'AI agent', href: '#ai-agent' },
];

const MODULES = [
  {
    id: 'timetable',
    eyebrow: 'TIMETABLES',
    title: 'Class-based timetable generation',
    description:
      'The core module. Our AI-powered timetable generator places every lesson around teacher availability, room capacity, building transitions and workload limits, then hands you a drag-and-drop editor for the last mile.',
    bullets: [
      'Automated conflict resolution',
      'Fixed period assignments',
      'Multi-building support',
      'Class teacher prioritisation',
      'Room group management',
      'Time-off for teachers, classes and rooms',
    ],
    visual: 'timetable' as const,
    reverse: false,
  },
  {
    id: 'substitute',
    eyebrow: 'SUBSTITUTES',
    title: 'Smart cover teacher assignment',
    description:
      'When staff are absent, TimetableMaster ranks who can cover each period on subject familiarity, free time and cover already carried this week, then assigns and notifies in one click.',
    bullets: [
      'Real-time availability tracking',
      'Ranked cover suggestions',
      'Eligibility rules you configure',
      'Workload distribution',
      'Substitution history',
      'Coverage analytics',
    ],
    visual: 'cover' as const,
    reverse: true,
  },
  {
    id: 'leave-management',
    eyebrow: 'LEAVE',
    title: 'Staff absence and leave tracking',
    description:
      'Requests, approvals and balances by leave type, including half-days. Approved leave feeds straight into cover planning, so the two modules never disagree about who is in.',
    bullets: [
      'Full-day and half-day requests',
      'Balance tracking by type',
      'Approval trail',
      'Dashboard analytics',
      'Email notifications',
      'Historical reports',
    ],
    visual: 'leave' as const,
    reverse: false,
  },
  {
    id: 'calendar',
    eyebrow: 'CALENDAR',
    title: 'School calendar and events',
    description:
      'Holidays, exams, events and activities sit alongside the timetable. Because it shares the same data, you can see live availability for every class, room and teacher on any date.',
    bullets: [
      'Event creation and scheduling',
      'Class, room and faculty availability',
      'Holiday management',
      'Exam scheduling',
      'Activity planning',
      'Reminder notifications',
    ],
    visual: 'calendar' as const,
    reverse: true,
  },
  {
    id: 'student-scheduling',
    eyebrow: 'STUDENT CHOICE',
    title: 'Individual schedules from course selection',
    description:
      'For IB schools, colleges and universities. Collect student course preferences, auto-create sections at the right capacity, assign faculty and rooms, and generate a conflict-free schedule per student.',
    bullets: [
      'Student course preferences',
      'Automatic section creation',
      'Capacity management',
      'Faculty workload balancing',
      'Elective handling',
      'Prerequisite validation',
    ],
    visual: 'student' as const,
    reverse: false,
  },
  {
    id: 'ai-agent',
    eyebrow: 'AI AGENT',
    title: 'An assistant that knows your schedule',
    description:
      'Ask questions in plain language, get an explanation when a timetable will not fit, and let the agent carry out changes on your behalf rather than walking you through menus.',
    footnote: '* Subject to availability in your region.',
    bullets: [
      'Natural language interaction',
      'Conflict explanations',
      'Strategy suggestions',
      'Takes actions for you',
      'Available around the clock',
      'Knows your own data',
    ],
    visual: 'ai' as const,
    reverse: true,
  },
];

const PLATFORM_TRUTHS = [
  {
    num: '01',
    title: 'Simple, guided setup',
    desc: 'A step-by-step wizard walks you through bell schedule, subjects, teachers, classes and rooms. Enter it once and every module reuses it.',
  },
  {
    num: '02',
    title: 'AI-powered optimisation',
    desc: 'AI-powered scheduling, not a template. The platform maximises placed lessons first, then improves distribution, spread and consistency across the week.',
  },
  {
    num: '03',
    title: 'Secure cloud platform',
    desc: 'Nothing to install or back up. Encrypted in transit and at rest, with role-based access so each person sees only what they should.',
  },
  {
    num: '04',
    title: 'Sharing and collaboration',
    desc: 'Publish to web and mobile, export to PDF, Excel or CSV, and let your whole scheduling team work on the same timetable with conflict detection.',
  },
  {
    num: '05',
    title: 'Fast edits and regeneration',
    desc: 'Move a lesson by dragging it. Your manual edits lock, so regenerating improves everything else without undoing your decisions.',
  },
  {
    num: '06',
    title: 'Reusable, versioned data',
    desc: 'Roll last year forward instead of starting over. Version history keeps every published timetable recoverable.',
  },
  {
    num: '07',
    title: 'Connectors',
    desc: 'Sync staff, classes and enrolments from ManageBac, PowerSchool, Schoolbase and others, or bulk import from CSV.',
  },
  {
    num: '08',
    title: 'Dedicated support',
    desc: 'Real people who know timetabling. For complex schools we will sit with you through the first build.',
  },
];

const AUDIENCES = [
  {
    title: 'For administrators',
    points: [
      'Cut manual scheduling time to a fraction',
      'One source of truth for staffing',
      'Complete records for audit and payroll',
      'No more chasing cover over WhatsApp',
    ],
  },
  {
    title: 'For teachers',
    points: [
      'Today’s schedule and any cover duty, on your phone',
      'Clear notice when a period changes',
      'Leave requests without paperwork',
      'Workload spread fairly across the team',
    ],
  },
  {
    title: 'For students',
    points: [
      'Personal schedules, including elective choices',
      'Room and teacher changes reflected instantly',
      'No lost periods when staff are absent',
      'A consistent week, every week',
    ],
  },
];

const COMPARISON_ROWS = [
  {
    topic: 'Building the schedule',
    legacy: 'Weeks of spreadsheet work, rebuilt from scratch each year',
    modern: 'Generated in about a minute from data you already entered',
  },
  {
    topic: 'Conflicts',
    legacy: 'Found by eye, often after the timetable is published',
    modern: 'Impossible to publish: the system treats them as hard constraints',
  },
  {
    topic: 'Data entry',
    legacy: 'Re-keyed into every new version and every side spreadsheet',
    modern: 'Entered once, reused by all six modules and rolled forward yearly',
  },
  {
    topic: 'Covering absences',
    legacy: 'A morning scramble across the staffroom and group chats',
    modern: 'Ranked suggestions by familiarity, availability and current load',
  },
  {
    topic: 'Making a change',
    legacy: 'One swap cascades into hours of manual re-checking',
    modern: 'Drag it, your edit locks, everything else re-optimises around it',
  },
  {
    topic: 'Distribution',
    legacy: 'Printed, emailed, and out of date the moment it changes',
    modern: 'Live on web and mobile, with PDF and Excel export when needed',
  },
];

function renderVisual(kind: (typeof MODULES)[number]['visual']) {
  switch (kind) {
    case 'timetable':
      return <TimetableGridVisual />;
    case 'cover':
      return <CoverAssignVisual />;
    case 'leave':
      return <LeaveRequestsVisual />;
    case 'calendar':
      return <SchoolCalendarVisual />;
    case 'student':
      return <StudentChoiceVisual />;
    case 'ai':
      return <AiAgentVisual />;
  }
}

export default function FeaturesPage() {
  return (
    <SiteShell>
      <main>
        {/* Header Hero */}
        <section className="relative overflow-hidden border-b border-[#E4E6EA] bg-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: '480px',
              background:
                'radial-gradient(50% 55% at 15% 0%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(45% 50% at 85% 0%, rgba(234,88,12,0.08) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[1180px] px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565A62]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                AI-Powered Scheduling Platform
              </span>
              <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#111214] sm:text-[3.5rem] lg:text-[3.75rem]">
                Every part of your institution&apos;s timetable, in one place.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#565A62]">
                Six modules that share one set of data. Build the schedule, then run
                leave, cover, calendars and student choice on top of it without
                re-entering anything.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link prefetch={false}
                  href="/signup/"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4F46E5] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#4338CA] sm:w-auto"
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
                  href="/pricing/"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#D5D9DF] px-7 py-3.5 text-base font-semibold text-[#111214] transition-colors hover:border-[#111214] sm:w-auto"
                >
                  View pricing
                </Link>
              </div>
            </div>

            {/* Jump Navigation */}
            <nav className="mt-14 overflow-x-auto px-5 sm:px-0" aria-label="Modules navigation">
              <ul className="flex min-w-max justify-center gap-2 sm:min-w-0 sm:flex-wrap">
                {MODULE_JUMP_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block rounded-full border border-[#DDE0E5] bg-white px-4 py-2 text-sm font-semibold text-[#565A62] transition-colors hover:border-[#111214] hover:text-[#111214]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {/* Modules List */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
            {MODULES.map((mod) => (
              <div
                key={mod.id}
                id={mod.id}
                className="grid scroll-mt-24 items-center gap-10 border-b border-[#E4E6EA] py-20 lg:grid-cols-2 lg:gap-14 lg:py-[132.5px]"
              >
                <div className={mod.reverse ? 'lg:order-2' : ''}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                    />
                    {mod.eyebrow}
                  </span>
                  <h2 className="font-display mt-4 max-w-lg text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#111214] sm:text-[2.4rem]">
                    {mod.title}
                  </h2>
                  <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#565A62]">
                    {mod.description}
                  </p>
                  {mod.footnote && (
                    <p className="mt-2 text-xs text-[#8A8F98]">{mod.footnote}</p>
                  )}

                  <ul className="mt-8 grid max-w-lg grid-cols-1 gap-x-8 border-t border-[#E4E6EA] sm:grid-cols-2">
                    {mod.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="border-b border-[#E4E6EA] py-3 text-sm font-medium text-[#3A3D44]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`min-w-0 ${mod.reverse ? 'lg:order-1' : ''}`}>
                  {renderVisual(mod.visual)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* True of every module */}
        <section id="platform" className="bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                  />
                  Across the platform
                </span>
                <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
                  True of every module
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-[#565A62]">
                  The modules differ. These do not.
                </p>
              </div>

              <ol className="divide-y divide-[#DDE0E5] border-t border-[#DDE0E5]">
                {PLATFORM_TRUTHS.map((item) => (
                  <li
                    key={item.num}
                    className="grid gap-2 py-6 sm:grid-cols-[3rem_13rem_1fr] sm:gap-6"
                  >
                    <span className="font-display text-sm font-bold text-[#4F46E5]">
                      {item.num}
                    </span>
                    <h3 className="font-display text-base font-bold tracking-[-0.015em] text-[#111214]">
                      {item.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#565A62]">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* One timetable, three audiences */}
        <section className="border-b border-[#E4E6EA] bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 md:py-24 lg:py-28">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
              />
              Who it serves
            </span>
            <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
              One timetable, three audiences
            </h2>

            <div className="mt-14 grid divide-y divide-[#E4E6EA] md:grid-cols-3 md:divide-x md:divide-y-0">
              {AUDIENCES.map((aud) => (
                <div key={aud.title} className="py-10 first:pt-2 last:pb-2 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[#111214]">
                    {aud.title}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {aud.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#565A62]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4F46E5]"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
              />
              The difference
            </span>
            <h2 className="font-display mt-4 max-w-xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
              Against how most schools do it today
            </h2>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#DDE0E5]">
                    <th className="w-1/4 pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8F98]">
                      <span className="sr-only">Dimension</span>
                    </th>
                    <th className="w-[37.5%] pb-4 pr-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8F98]">
                      Spreadsheets and desktop tools
                    </th>
                    <th className="w-[37.5%] pb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4F46E5]">
                      TimetableMaster
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DDE0E5]">
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.topic}>
                      <th
                        scope="row"
                        className="font-display py-7 pr-6 align-top text-sm font-bold text-[#111214] md:py-9 lg:py-7"
                      >
                        {row.topic}
                      </th>
                      <td className="py-7 pr-6 align-top text-sm leading-relaxed text-[#8A8F98] md:py-9 lg:py-7">
                        {row.legacy}
                      </td>
                      <td className="py-7 align-top text-sm font-medium leading-relaxed text-[#111214] md:py-9 lg:py-7">
                        {row.modern}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <FinalCta />
      </main>
    </SiteShell>
  );
}
