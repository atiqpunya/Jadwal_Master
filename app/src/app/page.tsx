import React from 'react';
import Link from '@/components/Link';
import { SiteShell } from '@/components/SiteShell';
import {
  HeroPlatformShowcase,
  TimetableGridVisual,
  CoverAssignVisual,
} from '@/components/ProductVisuals';
import { SchoolMarquee } from '@/components/SchoolMarquee';
import { ProductTourSection } from '@/components/ProductTourSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FaqAccordion, type FaqItem } from '@/components/FaqAccordion';
import { ContactFormSection } from '@/components/ContactFormSection';
import { FinalCta } from '@/components/FinalCta';

const HOME_FAQS: FaqItem[] = [
  {
    question: 'Is TimetableMaster free to use?',
    answer:
      'Yes. The Free plan is free forever, with no credit card: for up to 40 staff members, set up your staff, classes and subjects, generate your timetable with the starter rules. Pro adds PDF and Excel downloads, advanced rules, publishing and sharing, the calendar with cover and leave, reports and the AI Agent; Max adds timetables built around what students choose.',
  },
  {
    question: 'Do I need to install anything on my computer?',
    answer:
      'No. TimetableMaster is a web-based, cloud-hosted solution. There is no limit on the number of devices you can use; simply log in from any internet-connected device.',
  },
  {
    question: 'How secure is my data?',
    answer:
      'We prioritise data security and privacy. TimetableMaster uses secure protocols and encryption to protect your scheduling information from unauthorised access or breaches.',
  },
  {
    question: 'Can I make manual adjustments?',
    answer:
      'Yes. Our drag-and-drop editor makes it easy to move classes around, and the system provides intelligent suggestions for the best possible layout.',
  },
  {
    question: 'Can I export or print my timetables?',
    answer:
      'Yes. You can export generated timetables as PDF or Excel, or print them directly for distribution to staff and students.',
  },
  {
    question: 'Can TimetableMaster generate student-level schedules?',
    answer:
      'Yes. Students select their preferred courses, and our system automatically creates optimal class sections, assigns qualified teachers, allocates rooms, and generates individual conflict-free schedules.',
  },
  {
    question: 'Is substitution available on TimetableMaster?',
    answer:
      'Yes. Our system suggests the best possible substitutes when a teacher is on leave. It also keeps track of substitutions, making it easy to reconcile changes later.',
  },
  {
    question: 'Can I use TimetableMaster for colleges?',
    answer:
      'Absolutely. TimetableMaster is versatile enough for schools, colleges, universities, and training centres.',
  },
  {
    question: 'Can I add other people from my institute to my account?',
    answer:
      'Yes. You can invite as many staff members as you need. Each person gets their own login and role, allowing them to collaborate on or view timetables in real time.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'Yes. Cancel whenever you like, with no penalty or cancellation fee: your plan does not renew, and you keep it to the end of the term you paid for.',
  },
];

const REST_OF_YEAR_ITEMS = [
  {
    title: 'Leave management',
    desc: 'Full-day and half-day requests, approvals, balances by leave type, and an audit trail. Approved leave opens exactly the right periods for cover.',
  },
  {
    title: 'Multi-user collaboration',
    desc: 'Your whole scheduling team edits the same timetable, with version conflict detection instead of emailed spreadsheets.',
  },
  {
    title: 'Mobile apps',
    href: '/features/#platform',
    desc: 'iOS and Android. Teachers and students get today’s schedule, room changes and cover duties in their pocket.',
  },
  {
    title: 'Cloud based',
    desc: 'Nothing to install, nothing to back up. Log in from any device on any campus. Encrypted at rest and in transit.',
  },
  {
    title: 'Role-based access',
    desc: 'Admins, schedulers, heads of department, teachers and students each see exactly what they should, and nothing more.',
  },
  {
    title: 'School calendar',
    desc: 'Holidays, exams, events and activities alongside the timetable, with live availability for every class, room and teacher.',
  },
];

const CONNECTORS = [
  'PowerSchool',
  'Veracross',
  'ManageBac',
  'iSAMS',
  'Schoolbase',
  'Google',
  'Outlook',
  'CSV / Excel',
];

export default function HomePage() {
  return (
    <SiteShell>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-[#E4E6EA] bg-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            height: '560px',
            background:
              'radial-gradient(50% 55% at 12% 0%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(45% 50% at 88% 5%, rgba(234,88,12,0.08) 0%, rgba(255,255,255,0) 70%), radial-gradient(40% 45% at 50% 0%, rgba(219,39,119,0.05) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-[1180px] px-5 pt-16 sm:px-8 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <a
              href="#product-tour"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565A62] transition-colors hover:text-[#111214]"
            >
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
              />
              The AI-powered scheduling platform for schools, colleges and universities
            </a>
            <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111214] sm:text-[3.5rem] lg:text-[4rem]">
              Timetables that hold up
              <br className="hidden sm:block" /> for the whole year.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#565A62]">
              An AI-powered timetable generator that builds a conflict-free schedule
              in minutes, then runs the year from the same place: substitutes, staff
              leave, calendars and mobile access for every teacher.
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
                href="/contact/"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#D5D9DF] px-7 py-3.5 text-base font-semibold text-[#111214] transition-colors hover:border-[#111214] sm:w-auto"
              >
                Book a demo
              </Link>
            </div>
            <p className="mt-4 text-sm text-[#8A8F98]">
              Free forever. No installation, no credit card.
            </p>
          </div>

          <HeroPlatformShowcase />
        </div>
      </section>

      {/* 2. Marquee */}
      <SchoolMarquee />

      {/* 3. Metrics */}
      <section className="border-b border-[#E4E6EA] bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <dl className="grid grid-cols-2 divide-y divide-[#E4E6EA] sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            <div className="px-2 py-8 sm:px-8 sm:py-10">
              <dt className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                50,000+
              </dt>
              <dd className="mt-1.5 text-sm text-[#8A8F98]">institutes worldwide</dd>
            </div>
            <div className="px-2 py-8 sm:px-8 sm:py-10">
              <dt className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                500K+
              </dt>
              <dd className="mt-1.5 text-sm text-[#8A8F98]">staff members managed</dd>
            </div>
            <div className="px-2 py-8 sm:px-8 sm:py-10">
              <dt className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                100+
              </dt>
              <dd className="mt-1.5 text-sm text-[#8A8F98]">countries</dd>
            </div>
            <div className="px-2 py-8 sm:px-8 sm:py-10">
              <dt className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                99.9%
              </dt>
              <dd className="mt-1.5 text-sm text-[#8A8F98]">uptime guarantee</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 4. Core Features */}
      <section id="features" className="bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <div className="grid items-center gap-10 border-b border-[#E4E6EA] py-20 md:py-[87px] lg:grid-cols-[0.82fr_1.18fr] lg:gap-14 lg:py-28">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                Build timetables
              </span>
              <h2 className="font-display mt-4 max-w-lg text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#111214] sm:text-[2.4rem]">
                AI scheduling that respects every constraint you actually have
              </h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#565A62]">
                Teacher availability, room capacity, building transitions, workload
                limits, fixed placements. Define them once and the AI places every
                lesson around them, then tells you precisely what would not fit and
                why.
              </p>
              <dl className="mt-8 max-w-lg divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Conflict-free
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    across teachers, rooms and classes
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Drag and drop
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    edits stay locked through regeneration
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Multi-week
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    fortnightly and cyclic bell schedules
                  </dd>
                </div>
              </dl>
              <Link prefetch={false}
                href="/features/"
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[6px] transition-colors hover:decoration-[#111214]"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="min-w-0">
              <TimetableGridVisual />
            </div>
          </div>

          <div className="grid items-center gap-10 border-b border-[#E4E6EA] py-20 md:py-[87px] lg:grid-cols-[1.18fr_0.82fr] lg:gap-14 lg:py-28">
            <div className="lg:order-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                Manage substitutes
              </span>
              <h2 className="font-display mt-4 max-w-lg text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#111214] sm:text-[2.4rem]">
                Absences covered before the first bell
              </h2>
              <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[#565A62]">
                Mark a teacher out and get a ranked shortlist of who can take each
                period, scored on subject familiarity, free time and how much cover
                they have already carried this week. One click assigns and notifies.
              </p>
              <dl className="mt-8 max-w-lg divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Ranked cover
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    by familiarity, load and availability
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Your rules
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    eligibility policies you configure
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-40 flex-shrink-0 text-sm font-semibold text-[#111214]">
                    Full history
                  </dt>
                  <dd className="text-sm text-[#565A62]">
                    reconcile substitutions at term end
                  </dd>
                </div>
              </dl>
              <Link prefetch={false}
                href="/features/#substitute"
                className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[6px] transition-colors hover:decoration-[#111214]"
              >
                Learn more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="min-w-0 lg:order-1">
              <CoverAssignVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Product Tour */}
      <ProductTourSection />

      {/* 6. The parts nobody warns you about */}
      <section className="bg-[#F5F6F8] py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                And the rest of the year
              </span>
              <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
                The parts nobody warns you about
              </h2>
              <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-[#565A62]">
                Generating the timetable is one week of work. Keeping it true for the
                next forty is the rest of it.
              </p>
            </div>

            <dl className="divide-y divide-[#DDE0E5] border-t border-[#DDE0E5]">
              {REST_OF_YEAR_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-1.5 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8"
                >
                  <dt className="font-display text-base font-bold tracking-[-0.015em] text-[#111214]">
                    {item.href ? (
                      <Link prefetch={false}
                        href={item.href}
                        className="underline decoration-[#CCD1D8] underline-offset-[5px] hover:decoration-[#111214]"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-[#565A62]">
                    {item.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 7. Connectors */}
      <section id="integrations" className="border-b border-[#E4E6EA] bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 border-b border-[#E4E6EA] pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                Connectors
              </span>
              <h2 className="font-display mt-4 max-w-xl text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#111214] sm:text-[2.4rem]">
                Built on the roster you already maintain
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#565A62]">
              Pull staff, classes and enrolments from your LMS or SIS and push
              finished schedules back out. No re-keying, no timetable built on last
              term’s data.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-px overflow-hidden border-b border-[#E4E6EA] bg-[#E4E6EA] sm:grid-cols-3 lg:grid-cols-4">
            {CONNECTORS.map((name) => (
              <li
                key={name}
                className="font-display flex items-center justify-center bg-white px-4 py-10 text-center text-[15px] font-bold tracking-[-0.01em] text-[#3A3D44] transition-colors hover:bg-[#F5F6F8]"
              >
                {name}
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <Link prefetch={false}
              href="/contact/"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[6px] transition-colors hover:decoration-[#111214]"
            >
              Ask about your system
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. How it works */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
            How it works
          </span>
          <h2 className="font-display mt-4 max-w-xl text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
            Live in three steps, not three months
          </h2>
          <ol className="mt-12 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
            <li className="grid items-baseline gap-3 py-9 sm:grid-cols-[6rem_16rem_1fr] sm:gap-8">
              <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#CCD1D8]">
                01
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#111214]">
                Set up your school
              </h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#565A62]">
                Bell schedule, subjects, teachers, classes and rooms. Type them in, or
                import the lot from your LMS in a single pass.
              </p>
            </li>
            <li className="grid items-baseline gap-3 py-9 sm:grid-cols-[6rem_16rem_1fr] sm:gap-8">
              <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#CCD1D8]">
                02
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#111214]">
                Generate
              </h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#565A62]">
                The AI places every lesson around your constraints in about a minute,
                and reports exactly what it could not fit and which rule blocked it.
              </p>
            </li>
            <li className="grid items-baseline gap-3 py-9 sm:grid-cols-[6rem_16rem_1fr] sm:gap-8">
              <span className="font-display text-3xl font-extrabold tracking-[-0.04em] text-[#CCD1D8]">
                03
              </span>
              <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#111214]">
                Publish and run the year
              </h3>
              <p className="max-w-xl text-[15px] leading-relaxed text-[#565A62]">
                Push to web and mobile, then handle leave, cover, events and edits from
                the same timetable, all year.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. FAQ */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                Questions
              </span>
              <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
                Before you ask
              </h2>
              <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-[#565A62]">
                Still stuck?{' '}
                <Link prefetch={false}
                  href="/contact/"
                  className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:decoration-[#111214]"
                >
                  Talk to our team
                </Link>{' '}
                or browse the{' '}
                <Link prefetch={false}
                  href="/faq"
                  className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:decoration-[#111214]"
                >
                  full FAQ
                </Link>
                .
              </p>
            </div>

            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>
      </section>

      {/* 11. Contact */}
      <ContactFormSection variant="home" />

      {/* 12. Final CTA */}
      <FinalCta />
    </SiteShell>
  );
}
