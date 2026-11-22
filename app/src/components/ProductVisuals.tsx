'use client';

import React from 'react';

export function TimetableGridVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(60% 60% at 15% 10%, rgba(234,88,12,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 90% 15%, rgba(79,70,229,0.14) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 70% 100%, rgba(219,39,119,0.10) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/lesson-placement.jpg"
        aria-label="The AI filling a weekly timetable while honouring every constraint"
      >
        <source src="/videos/sections/lesson-placement.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function CoverAssignVisual({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(60% 60% at 85% 8%, rgba(220,38,38,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 10% 25%, rgba(202,138,4,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 40% 100%, rgba(5,150,105,0.12) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/cover-assignment.jpg"
        aria-label="A teacher marked absent and the best available substitute assigned"
      >
        <source src="/videos/sections/cover-assignment.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function LeaveRequestsVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(58% 58% at 12% 12%, rgba(202,138,4,0.14) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 88% 30%, rgba(5,150,105,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 60% 100%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/leave-approval.jpg"
        aria-label="A leave request approved and the freed periods opened for cover"
      >
        <source src="/videos/sections/leave-approval.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function SchoolCalendarVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(60% 60% at 15% 10%, rgba(234,88,12,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 90% 15%, rgba(79,70,229,0.14) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 70% 100%, rgba(219,39,119,0.10) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/calendar-events.jpg"
        aria-label="School calendar and events"
      >
        <source src="/videos/sections/calendar-events.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function StudentChoiceVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(60% 60% at 85% 8%, rgba(220,38,38,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 10% 25%, rgba(202,138,4,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 40% 100%, rgba(5,150,105,0.12) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/student-sections.jpg"
        aria-label="Individual schedules from course selection"
      >
        <source src="/videos/sections/student-sections.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function AiAgentVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 rounded-[24px] sm:-inset-6 sm:rounded-[28px]"
        style={{
          background:
            'radial-gradient(58% 58% at 12% 12%, rgba(202,138,4,0.14) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 55% at 88% 30%, rgba(5,150,105,0.12) 0%, rgba(255,255,255,0) 70%), radial-gradient(60% 60% at 60% 100%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%)',
        }}
      />
      <video
        className="relative block h-auto w-full"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/videos/sections/agent-chat.jpg"
        aria-label="An assistant that knows your schedule"
      >
        <source src="/videos/sections/agent-chat.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export function HeroPlatformShowcase() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -top-6 bottom-0 rounded-[32px] sm:-inset-x-10 sm:-top-10"
        style={{
          background:
            'radial-gradient(55% 60% at 20% 0%, rgba(79,70,229,0.22) 0%, rgba(255,255,255,0) 70%), radial-gradient(50% 55% at 80% 10%, rgba(219,39,119,0.16) 0%, rgba(255,255,255,0) 70%), radial-gradient(45% 50% at 50% 40%, rgba(234,88,12,0.12) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(6px)',
        }}
      />
      <div
        className="relative rounded-t-2xl p-[1.5px] shadow-[0_-1px_60px_-20px_rgba(20,18,15,0.35)]"
        style={{
          background:
            'linear-gradient(160deg, #A5B4FC 0%, #F0ABD0 28%, #FBBF89 52%, #E4E6EA 78%, #E4E6EA 100%)',
        }}
      >
        <div className="overflow-hidden rounded-t-[15px] bg-white">
          <video
            className="block h-auto w-full aspect-[1021/574] object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-animation-poster.jpg"
            aria-label="How TimetableMaster builds timetables, covers absences, tracks leave, shares schedules and keeps your team in sync"
          >
            <source src="/videos/TimetableMaster-Platform-Animation.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
