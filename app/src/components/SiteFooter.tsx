'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';
import { BrandMark } from './BrandMark';

const PRODUCT_LINKS = [
  { label: 'Features', href: '/features/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Integrations', href: '/#integrations' },
  { label: 'Download apps', href: '/features/#platform' },
  { label: 'Online generator', href: '/features/#timetable' },
  { label: 'Timetable maker', href: '/features/#timetable' },
  { label: 'AI generator', href: '/features/#ai-agent' },
  { label: 'Class schedule maker', href: '/features/#student-scheduling' },
];

const COMPARE_LINKS = [
  { label: 'ascTimetables', href: '/features/#comparison' },
  { label: 'PrimeTimetable', href: '/features/#comparison' },
  { label: 'TimeTabler', href: '/features/#comparison' },
  { label: 'FET', href: '/features/#comparison' },
  { label: 'Untis', href: '/features/#comparison' },
  { label: 'Lantiv', href: '/features/#comparison' },
  { label: 'Skolaris', href: '/features/#comparison' },
];

const RESOURCE_LINKS = [
  { label: 'About us', href: '/contact/' },
  { label: 'Blog', href: '/features/' },
  { label: 'Help centre', href: '/contact/' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Support', href: '/contact/' },
  { label: 'API documentation', href: '/features/#platform' },
  { label: 'llms.txt', href: '/features/' },
  { label: 'llms-full.txt', href: '/features/' },
];

export function SiteFooter() {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  return (
    <footer className="bg-[#111214]">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="grid gap-12 pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-10">
          <div>
            <div className="inline-block">
              <BrandMark variant="dark" showIcon={false} size="sm" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Conflict-free timetables in minutes, then substitutes, leave and
              calendars for the rest of the year. Used by 50,000+ institutes.
            </p>
            <a
              href="mailto:hello@timetablemaster.com"
              className="mt-6 inline-block text-sm font-semibold text-white underline decoration-white/25 underline-offset-[5px] transition-colors hover:decoration-white"
            >
              hello@timetablemaster.com
            </a>
            <ul className="mt-8 flex items-center gap-5">
              <li>
                <Link prefetch={false}
                  href="/contact/"
                  aria-label="LinkedIn"
                  className="block text-white/45 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link prefetch={false}
                  href="/contact/"
                  aria-label="X"
                  className="block text-white/45 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M20.64 3H17.3l-4.16 5.33L9.5 3H3l6.73 9.6L3 21h3.34l4.47-5.72L14.5 21H21l-7.03-10L20.64 3z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link prefetch={false}
                  href="/contact/"
                  aria-label="Facebook"
                  className="block text-white/45 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  >
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link prefetch={false}
                  href="/contact/"
                  aria-label="Instagram"
                  className="block text-white/45 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                    className="h-[18px] w-[18px]"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          <nav aria-label="Product">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              PRODUCT
            </h3>
            <ul className="mt-4">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link prefetch={false}
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Compare">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              COMPARE
            </h3>
            <ul className="mt-4">
              {COMPARE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link prefetch={false}
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <h3 className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              RESOURCES
            </h3>
            <ul className="mt-4">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link prefetch={false}
                    href={item.href}
                    className="inline-block py-1.5 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © 2026 SuperSphere Labs LLP. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link prefetch={false}
              href="/contact/"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link prefetch={false}
              href="/contact/"
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={() => setCookieModalOpen(true)}
              className="text-sm text-white/40 transition-colors hover:text-white"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      {cookieModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-[#111214]">Cookie Settings</h3>
            <p className="mt-2 text-sm text-[#565A62]">
              We use necessary cookies to keep TimetableMaster running smoothly and optional
              analytical cookies to improve usability.
            </p>
            <div className="mt-5 space-y-3">
              <label className="flex items-center justify-between text-sm text-[#111214]">
                <span>Essential Cookies</span>
                <input type="checkbox" checked disabled className="h-4 w-4 rounded accent-[#4F46E5]" />
              </label>
              <label className="flex items-center justify-between text-sm text-[#111214]">
                <span>Analytics &amp; Performance</span>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#4F46E5]"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCookieModalOpen(false)}
                className="rounded-full border border-[#D5D9DF] px-4 py-2 text-sm font-semibold text-[#111214] hover:border-[#111214]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setCookieModalOpen(false)}
                className="rounded-full bg-[#4F46E5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#4338CA]"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
