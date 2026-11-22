'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';
import {
  LeaveRequestsVisual,
  SchoolCalendarVisual,
  StudentChoiceVisual,
  AiAgentVisual,
} from './ProductVisuals';

interface TourTab {
  id: 'leave' | 'calendar' | 'student-choice' | 'ai-agent';
  label: string;
  heading: string;
  description: string;
}

const TABS: TourTab[] = [
  {
    id: 'leave',
    label: 'Leave',
    heading: 'Leave requests that flow straight into cover',
    description:
      'Staff request full or half days, approvers act in one click, and approved leave opens exactly the right periods for substitution.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    heading: 'One calendar for the whole campus',
    description:
      'Holidays, exams, events and activities live beside the timetable, so you can see which classes, rooms and teachers are free on any day.',
  },
  {
    id: 'student-choice',
    label: 'Student choice',
    heading: 'Individual schedules built from student choices',
    description:
      'Collect course selections, auto-create sections, assign faculty and rooms, and generate a conflict-free schedule for every student.',
  },
  {
    id: 'ai-agent',
    label: 'AI agent',
    heading: 'An assistant that knows your schedule',
    description:
      'Ask in plain language, get strategy suggestions when a timetable will not fit, and let the agent make the changes for you.',
  },
];

export function ProductTourSection() {
  const [activeId, setActiveId] = useState<TourTab['id']>('leave');
  const activeTab = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section id="product-tour" className="bg-[#F5F6F8]">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
              Product tour
            </span>
            <h2 className="font-display mt-4 max-w-lg text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#111214] sm:text-[2.6rem]">
              See it working, before you sign up
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Product areas"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 scrollbar-hide sm:mx-0 sm:px-0"
          >
            {TABS.map((tab) => {
              const selected = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(tab.id)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? 'border-[#111214] bg-[#111214] text-white'
                      : 'border-[#DDE0E5] text-[#565A62] hover:border-[#111214] hover:text-[#111214]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" className="mt-12">
          <div className="max-w-2xl">
            <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-[#111214] sm:text-2xl">
              {activeTab.heading}
            </h3>
            <p className="mt-3 text-[17px] leading-relaxed text-[#565A62]">
              {activeTab.description}
            </p>
          </div>

          <div className="mt-9 min-w-0">
            {activeTab.id === 'leave' && <LeaveRequestsVisual />}
            {activeTab.id === 'calendar' && <SchoolCalendarVisual />}
            {activeTab.id === 'student-choice' && <StudentChoiceVisual />}
            {activeTab.id === 'ai-agent' && <AiAgentVisual />}
          </div>

          <Link prefetch={false}
            href="/features/"
            className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#111214] underline decoration-[#CCD1D8] underline-offset-[6px] hover:decoration-[#111214]"
          >
            Explore all features
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
  );
}
