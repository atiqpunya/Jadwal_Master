'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';
import { SiteShell } from '@/components/SiteShell';
import { FaqAccordion, type FaqItem } from '@/components/FaqAccordion';
import { FinalCta } from '@/components/FinalCta';

const BILLING_FAQS: FaqItem[] = [
  {
    question: 'Is Free really free forever?',
    answer:
      'Yes. Up to 40 staff members can build and generate class-by-class timetables with starter rules free forever, with no credit card required.',
  },
  {
    question: 'What counts as a staff member?',
    answer:
      'Any teacher or active scheduling staff profile included in your school timetable counts toward your staff allowance. Archived teachers do not count.',
  },
  {
    question: 'How can I pay?',
    answer:
      'Pay online by credit or debit card on Yearly or Quarterly plans, or request an official school invoice and wire transfer on annual plans.',
  },
  {
    question: 'Can I change or cancel my plan?',
    answer:
      'Yes. Upgrade, adjust staff counts, or cancel anytime with no penalty. If you cancel, you retain full access through the end of your current billing period.',
  },
  {
    question: 'Do you offer setup help?',
    answer:
      'Yes. Add Onboarding ($99) to Pro for guided account setup and a live team training session, or choose Max for guided master-timetable onboarding included.',
  },
];

interface MatrixGroup {
  category: string;
  rows: Array<{
    feature: string;
    free: string | boolean;
    pro: string | boolean;
    max: string | boolean;
  }>;
}

const COMPARE_MATRIX: MatrixGroup[] = [
  {
    category: 'SIZE',
    rows: [
      {
        feature: 'Staff members',
        free: 'Up to 40 staff members',
        pro: '40 staff members included, add more as you grow',
        max: 'Custom',
      },
      {
        feature: 'Students',
        free: '–',
        pro: '–',
        max: 'Custom',
      },
    ],
  },
  {
    category: 'SET UP',
    rows: [
      { feature: 'Staff, classes, subjects and rooms', free: true, pro: true, max: true },
      {
        feature: 'Org units: divisions, departments, campuses or a group of schools',
        free: '–',
        pro: true,
        max: true,
      },
      { feature: 'Bell schedules, fortnightly and day or week cycles', free: true, pro: true, max: true },
      { feature: 'Teaching Plan, imported from Excel or CSV', free: true, pro: true, max: true },
    ],
  },
  {
    category: 'GENERATE',
    rows: [
      { feature: 'Generations', free: '10 a day', pro: 'Unlimited', max: 'Unlimited' },
      { feature: 'Rules', free: 'Starter rules', pro: 'Every rule', max: 'Every rule' },
      { feature: 'Teacher time off and Rather Not times', free: '–', pro: true, max: true },
    ],
  },
  {
    category: 'YOUR TIMETABLE',
    rows: [
      { feature: 'Drag-and-drop editor, every view', free: true, pro: true, max: true },
      { feature: 'Quality report, teacher workload, free/busy', free: true, pro: true, max: true },
      { feature: 'PDF and Excel downloads', free: '–', pro: true, max: true },
    ],
  },
  {
    category: 'PUBLISH AND SHARE',
    rows: [
      { feature: 'Publish to everyone, and the staff app', free: '–', pro: true, max: true },
      { feature: 'Share via email and schedule links', free: '–', pro: true, max: true },
    ],
  },
  {
    category: 'RUN THE DAY',
    rows: [
      { feature: 'Calendar', free: '–', pro: true, max: true },
      { feature: 'Absence, cover and leave', free: '–', pro: true, max: true },
      { feature: 'Reports', free: '–', pro: true, max: true },
    ],
  },
  {
    category: 'STUDENTS',
    rows: [
      { feature: 'Class by class timetables', free: true, pro: true, max: true },
      { feature: 'Teaching by student choice: courses, choices, sections', free: '–', pro: '–', max: true },
      { feature: 'A timetable for every student', free: '–', pro: '–', max: true },
    ],
  },
  {
    category: 'AI AGENT AND INTEGRATIONS',
    rows: [
      { feature: 'AI Agent', free: '–', pro: '50 credits a year', max: '500 credits a year' },
      { feature: 'Integrations, the API and custom roles', free: '–', pro: true, max: true },
    ],
  },
  {
    category: 'SUPPORT',
    rows: [
      { feature: 'Email support', free: true, pro: true, max: true },
      { feature: 'WhatsApp support', free: '–', pro: true, max: true },
      { feature: 'Video Call Support', free: '–', pro: 'Limited', max: 'Priority' },
      { feature: 'Onboarding', free: '–', pro: 'Added at checkout', max: 'Guided setup included' },
    ],
  },
];

function PlanBullet() {
  return (
    <span
      aria-hidden="true"
      className="mr-2.5 mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F46E5]"
    />
  );
}

function EnterpriseBullet() {
  return (
    <span
      aria-hidden="true"
      className="mr-2.5 mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C74F0]"
    />
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1.5 inline-block h-3 w-3 shrink-0 text-[#8A8F98]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function OnboardingCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5 shrink-0 text-[#4F46E5]"
      aria-hidden="true"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<'yearly' | 'quarterly'>('yearly');

  const renderCellValue = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto h-3.5 w-3.5 text-[#4F46E5]"
          aria-label="Included"
        >
          <path d="M4 10.5l4 4 8-9" />
        </svg>
      ) : (
        <span className="text-xs text-[#b0b5bd]">–</span>
      );
    }
    if (val === '–') {
      return <span className="text-xs text-[#b0b5bd]">–</span>;
    }
    return <span className="text-[11px] font-semibold leading-tight text-[#111214] sm:text-xs">{val}</span>;
  };

  return (
    <SiteShell>
      <main>
        {/* Header Hero */}
        <section className="relative overflow-hidden border-b border-[#E4E6EA] bg-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: '460px',
              background:
                'radial-gradient(50% 55% at 15% 0%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(45% 50% at 88% 5%, rgba(234,88,12,0.08) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[1180px] px-5 pb-12 pt-14 sm:px-8 sm:pb-14 sm:pt-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565A62]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                Pricing
              </span>
              <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#111214] sm:text-[3.5rem]">
                Simple pricing for schools, colleges and universities.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#565A62]">
                Build and generate your timetable free, for as long as you like. Choose Pro
                when you run your day on it, and Max when students choose their courses.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 pb-14 pt-14 sm:px-8 sm:pb-16 sm:pt-16 lg:pb-[83.5px] lg:pt-[83.5px]">
            <p className="mb-6 text-center text-sm text-[#8A8F98]">
              Prices for Indonesia in US dollars.
            </p>

            {/* Billing Toggle */}
            <div className="mb-8 flex justify-center">
              <div role="radiogroup" aria-label="Billing frequency" className="inline-flex gap-1 rounded-full border border-[#E4E6EA] bg-white p-1">
                <button
                  type="button"
                  role="radio"
                  aria-checked={billing === 'yearly'}
                  onClick={() => setBilling('yearly')}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    billing === 'yearly'
                      ? 'bg-[#4F46E5] text-white'
                      : 'text-[#565A62] hover:text-[#111214]'
                  }`}
                >
                  Yearly
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={billing === 'quarterly'}
                  onClick={() => setBilling('quarterly')}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    billing === 'quarterly'
                      ? 'bg-[#4F46E5] text-white'
                      : 'text-[#565A62] hover:text-[#111214]'
                  }`}
                >
                  Quarterly
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Free */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#E4E6EA] bg-white p-6 sm:p-7">
                <div className="flex flex-grow flex-col">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#4F46E5]" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v2.879a2.5 2.5 0 0 0 .732 1.767l6.5 6.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-6.5-6.5A2.5 2.5 0 0 0 8.38 3H5.5ZM6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-[#111214]">
                      Free
                    </h2>
                  </div>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-[#565A62]">
                    Build and generate your timetable. Free for as long as you like.
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                      $0
                    </span>
                    <span className="rounded-full bg-[#F5F6F8] px-2.5 py-0.5 text-xs font-medium text-[#8A8F98]">
                      forever
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8A8F98]">
                    For up to 40 staff members
                  </p>

                  <ul className="mb-6 mt-6 flex-grow space-y-2.5 text-sm text-[#565A62]">
                    <li className="flex items-start">
                      <PlanBullet />
                      <span>Up to 40 staff members</span>
                    </li>
                    <li className="flex items-start">
                      <PlanBullet />
                      <span>
                        <strong className="font-semibold text-[#111214]">
                          Starter rules:
                        </strong>{' '}
                        no free periods for classes, and subjects spread
                        across the week
                      </span>
                    </li>
                    <li className="flex items-start">
                      <PlanBullet />
                      <span>Generate up to 10 times a day</span>
                    </li>
                    <li className="flex items-start">
                      <PlanBullet />
                      <span>Class by class timetables</span>
                    </li>
                    <li className="flex items-start">
                      <PlanBullet />
                      <span>Drag-and-drop editor in every view</span>
                    </li>
                  </ul>

                  <div className="mb-6 border-t border-[#E4E6EA] pt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8F98]">
                      NOT ON FREE
                    </p>
                    <ul className="space-y-2 text-xs text-[#8A8F98]">
                      <li className="flex items-center"><LockIcon /> PDF and Excel downloads</li>
                      <li className="flex items-center"><LockIcon /> Advanced rules and time off</li>
                      <li className="flex items-center"><LockIcon /> Publishing and sharing</li>
                      <li className="flex items-center"><LockIcon /> The calendar, absence, cover and leave</li>
                      <li className="flex items-center"><LockIcon /> Org units</li>
                      <li className="flex items-center"><LockIcon /> Teaching by student choice</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <Link prefetch={false}
                    href="/signup/"
                    className="block w-full rounded-full bg-[#4F46E5] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                  >
                    Start Free
                  </Link>
                  <p className="mt-3 text-center text-xs text-[#8A8F98]">
                    No credit card required
                  </p>
                </div>
              </div>

              {/* Pro */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#E4E6EA] bg-white p-6 sm:p-7">
                <div className="flex flex-grow flex-col">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#4F46E5]" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-[#111214]">
                      Pro
                    </h2>
                  </div>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-[#565A62]">
                    Run every day on your timetable, priced by your number of staff
                    members.
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                      {billing === 'yearly' ? '$199' : '$59'}
                    </span>
                    <span className="text-sm text-[#8A8F98]">
                      {billing === 'yearly' ? '/year' : '/quarter'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#565A62]">
                    40 staff members included. Add more as you grow.
                  </p>

                  <div className="mt-6 flex flex-grow flex-col">
                    <div className="mb-2.5 text-sm font-semibold text-[#111214]">
                      Everything in Free, plus:
                    </div>
                    <ul className="mb-6 flex-grow space-y-2.5 text-sm text-[#565A62]">
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>Unlimited generation</span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Advanced rules:
                          </strong>{' '}
                          teacher time off, Rather Not times, daily limits, gaps and
                          buildings
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Publishing and sharing:
                          </strong>{' '}
                          publish, share via email, schedule links and the staff app
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          The calendar, with absence, cover and leave, and automatic
                          cover suggestions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>Reports</span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          Integrations (Veracross, PowerSchool, ManageBac, SchoolBase,
                          iSAMS), the API and custom roles
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Org units:
                          </strong>{' '}
                          organise your institution into divisions, departments and
                          campuses, or run a group of schools, with managers who see
                          only their part
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>AI Agent with 50 AI credits a year</span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>Standard support</span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>Onboarding with our team, added at checkout</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <Link prefetch={false}
                    href="/signup/?plan=pro"
                    className="block w-full rounded-full bg-[#4F46E5] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                  >
                    Choose Pro
                  </Link>
                </div>
              </div>

              {/* Max */}
              <div className="flex flex-col justify-between rounded-2xl border border-[#E4E6EA] bg-white p-6 sm:p-7">
                <div className="flex flex-grow flex-col">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-[#4F46E5]" aria-hidden="true">
                      <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="font-display text-lg font-bold tracking-[-0.02em] text-[#111214]">
                      Max
                    </h2>
                  </div>
                  <p className="mb-6 mt-3 text-sm leading-relaxed text-[#565A62]">
                    Everything in Pro, with our team beside you, and timetables built
                    around what students choose.
                  </p>
                  <p className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#111214] sm:text-4xl">
                    Talk to Us
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#565A62]">
                    Priced for your institution with our team.
                  </p>

                  <div className="mt-6 flex flex-grow flex-col">
                    <div className="mb-2.5 text-sm font-semibold text-[#111214]">
                      Everything in Pro, plus:
                    </div>
                    <ul className="mb-6 flex-grow space-y-2.5 text-sm text-[#565A62]">
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Premium support:
                          </strong>{' '}
                          a dedicated relationship manager, priority help and video
                          calls with our scheduling experts
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Guided setup:
                          </strong>{' '}
                          we bring your existing data in, help you set up your rules
                          and build your first master timetable, and run workshops for your staff
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            Teaching by student choice:
                          </strong>{' '}
                          courses, student choices imported from a file, choice rules
                          and Make Sections
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          A timetable for every student; Generate can move students
                          between sections so more lessons fit
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            IB, A-levels and electives:
                          </strong>{' '}
                          HL and SL taught together
                        </span>
                      </li>
                      <li className="flex items-start">
                        <PlanBullet />
                        <span>
                          <strong className="font-semibold text-[#111214]">
                            AI Agent with 500 AI credits a year:
                          </strong>{' '}
                          check feasibility, troubleshoot what will not fit, analyse
                          your timetable and plan changes you approve
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <Link prefetch={false}
                    href="/contact/"
                    className="block w-full rounded-full bg-[#4F46E5] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-[#565A62]">
              Already on TimetableMaster?{' '}
              <Link prefetch={false}
                href="/signup/"
                className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration"
              >
                Upgrade in the app
              </Link>
            </p>

            {/* Enterprise */}
            <div className="mt-8 rounded-2xl bg-[#111214] p-7 text-white sm:p-9">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4Zm3 1h2v2H7V5Zm4 0h2v2h-2V5ZM7 8h2v2H7V8Zm4 0h2v2h-2V8Zm-4 3h2v2H7v-2Zm4 0h2v2h-2v-2Z" clipRule="evenodd" />
                    </svg>
                    <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                      Enterprise
                    </h2>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
                    For groups of institutions, universities, multi-campus setups, and
                    ERP or LMS companies.
                  </p>
                </div>
                <Link prefetch={false}
                  href="/contact/"
                  className="inline-block w-fit self-start whitespace-nowrap rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#111214] transition-colors hover:bg-[#EAECEF]"
                >
                  Request a Demo
                </Link>
              </div>
              <div className="mt-7">
                <p className="col-span-full border-t border-white/10 pt-6 text-sm font-semibold text-white">
                  Everything in Max, plus:
                </p>
                <div className="mt-3 grid gap-2 text-sm text-white/65 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-start"><EnterpriseBullet /><span>Multi-campus groups</span></div>
                  <div className="flex items-start"><EnterpriseBullet /><span>Custom ERP and LMS integrations</span></div>
                  <div className="flex items-start"><EnterpriseBullet /><span>Single sign-on, on request</span></div>
                  <div className="flex items-start"><EnterpriseBullet /><span>SLA uptime guarantee</span></div>
                  <div className="flex items-start"><EnterpriseBullet /><span>Onboarding and training for your staff</span></div>
                  <div className="flex items-start"><EnterpriseBullet /><span>Custom terms</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Onboarding */}
        <section className="border-t border-[#E4E6EA] bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-12 sm:px-8 sm:py-[72px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                SERVICES
              </span>
              <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
                Onboarding
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[#565A62]">
                Our team helps you get started with Pro.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#E4E6EA] bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-[-0.02em] text-[#111214]">
                    Onboarding
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#565A62]">
                    Our team helps you get started with Pro.
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#111214]">
                  $99
                </p>
              </div>
              <div className="mt-6 border-t border-[#E4E6EA] pt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8F98]">
                  WHAT&apos;S INCLUDED
                </p>
                <ul className="space-y-2.5 text-sm text-[#3A3D44]">
                  <li className="flex items-center gap-2.5">
                    <OnboardingCheckIcon />
                    <span>We set up your account with you</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <OnboardingCheckIcon />
                    <span>A 60-minute training session for your team</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <OnboardingCheckIcon />
                    <span>A 45-minute follow-up to answer your questions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="mt-6 text-center text-sm text-[#565A62]">
                Add it when you upgrade, or{' '}
                <Link prefetch={false} href="/contact/" className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration">
                  talk to us
                </Link>
                .
              </p>
              <p className="mt-3 text-center text-sm text-[#565A62]">
                Need more help? Premium Support and Managed Scheduling, arranged with
                our team.{' '}
                <Link prefetch={false} href="/contact/" className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration">
                  Talk to Us
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Compare Plans Matrix */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-10 lg:pb-28 lg:pt-16">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                COMPARE PLANS
              </span>
              <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
                What each plan includes
              </h2>
            </div>

            <div className="mt-10 overflow-x-auto rounded-xl border border-[#E4E6EA] bg-white">
              <div className="min-w-[585px] divide-y divide-[#E4E6EA]">
                <div className="grid grid-cols-[240px_115px_115px_115px] bg-[#F9FAFB] px-5 py-3.5 sm:grid-cols-2 lg:grid-cols-[minmax(250px,2.45fr)_3fr]">
                  <div className="text-xs font-semibold text-[#565A62]">
                    Feature
                  </div>
                  <div className="text-center text-sm font-bold text-[#111214] sm:hidden">Free</div>
                  <div className="text-center text-sm font-bold text-[#111214] sm:hidden">Pro</div>
                  <div className="text-center text-sm font-bold text-[#111214] sm:hidden">Max</div>
                  <div className="hidden grid-cols-3 sm:grid">
                    <div className="text-center text-sm font-bold text-[#111214]">Free</div>
                    <div className="text-center text-sm font-bold text-[#111214]">Pro</div>
                    <div className="text-center text-sm font-bold text-[#111214]">Max</div>
                  </div>
                </div>

                {COMPARE_MATRIX.map((group) => (
                  <div key={group.category} className="divide-y divide-[#E4E6EA]">
                    <div className="bg-[#F5F6F8]/70 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A8F98]">
                      {group.category}
                    </div>
                    {group.rows.map((row) => (
                      <div
                        key={row.feature}
                        className="grid grid-cols-[240px_115px_115px_115px] items-center px-5 py-[16.175px] sm:grid-cols-2 sm:py-[15px] lg:grid-cols-[minmax(250px,2.45fr)_3fr] lg:py-3.5"
                      >
                        <div className="pr-4 text-sm text-[#3A3D44]">{row.feature}</div>
                        <div className="px-2 text-center sm:hidden">{renderCellValue(row.free)}</div>
                        <div className="px-2 text-center sm:hidden">{renderCellValue(row.pro)}</div>
                        <div className="px-2 text-center sm:hidden">{renderCellValue(row.max)}</div>
                        <div className="hidden grid-cols-3 items-center sm:grid">
                          <div className="px-2 text-center">{renderCellValue(row.free)}</div>
                          <div className="px-2 text-center">{renderCellValue(row.pro)}</div>
                          <div className="px-2 text-center">{renderCellValue(row.max)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Billing FAQ */}
        <section id="billing-faq" className="bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-24 sm:px-8 sm:py-[113.5px] lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                  />
                  QUESTIONS
                </span>
                <h2 className="font-display mt-4 text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.4rem]">
                  Billing, plans and the fine print
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#565A62]">
                  Not sure which plan fits?{' '}
                  <Link prefetch={false}
                    href="/contact/"
                    className="font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[5px] hover:decoration-[#111214]"
                  >
                    Tell us about your school
                  </Link>{' '}
                  and we will point you at the right one.
                </p>
              </div>

              <FaqAccordion items={BILLING_FAQS} />
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </SiteShell>
  );
}
