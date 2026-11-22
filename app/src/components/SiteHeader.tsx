'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from '@/components/Link';
import { usePathname } from 'next/navigation';
import { BrandMark } from './BrandMark';

const MORE_ITEMS = [
  {
    label: 'Generator Jadwal AI',
    desc: 'Penyusunan jadwal otomatis bebas bentrok dengan segala aturan sekolah',
    href: '/features/#timetable',
  },
  {
    label: 'Guru Piket & Pengganti',
    desc: 'Rekomendasi guru pengganti cerdas dalam 1 klik',
    href: '/features/#substitute',
  },
  {
    label: 'Izin & Cuti Guru',
    desc: 'Persetujuan cuti terhubung otomatis ke guru piket',
    href: '/features/#leave-management',
  },
  {
    label: 'Kalender Sekolah',
    desc: 'Jadwal ujian, hari libur, upacara, dan ketersediaan ruangan',
    href: '/features/#calendar',
  },
  {
    label: 'Pilihan Mapel Siswa',
    desc: 'Jadwal blok peminatan perorangan untuk kurikulum merdeka & IB',
    href: '/features/#student-scheduling',
  },
  {
    label: 'Asisten AI Jadwal',
    desc: 'Tanya jawab dan sesuaikan jadwal dengan bahasa Indonesia sehari-hari',
    href: '/features/#ai-agent',
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMoreOpen(false);
      }
    };
    const handleOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, []);

  const isActive = (route: string) => {
    const normalized = pathname?.replace(/\/$/, '') || '/';
    return normalized === route;
  };

  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-transparent bg-white shadow-none transition-all duration-200"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4 md:px-6">
        <nav className="flex items-center justify-between" aria-label="Main navigation">
          <Link prefetch={false}
            href="/"
            aria-label="TimetableMaster Home"
            className="flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            <BrandMark variant="light" />
          </Link>

          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            <Link prefetch={false} href="/features/" className="group relative">
              <div
                className={`rounded-lg px-3 py-2 text-sm transition-colors duration-200 sm:px-4 sm:text-base ${
                  isActive('/features')
                    ? 'font-medium text-[#4F46E5]'
                    : 'text-[#374151] hover:text-[#4F46E5]'
                }`}
              >
                Fitur
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#4F46E5] transition-transform duration-200 ${
                    isActive('/features') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </div>
            </Link>

            <Link prefetch={false} href="/pricing/" className="group relative">
              <div
                className={`rounded-lg px-3 py-2 text-sm transition-colors duration-200 sm:px-4 sm:text-base ${
                  isActive('/pricing')
                    ? 'font-medium text-[#4F46E5]'
                    : 'text-[#374151] hover:text-[#4F46E5]'
                }`}
              >
                Harga
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#4F46E5] transition-transform duration-200 ${
                    isActive('/pricing') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </div>
            </Link>

            <Link prefetch={false} href="/contact/" className="group relative">
              <div
                className={`rounded-lg px-3 py-2 text-sm transition-colors duration-200 sm:px-4 sm:text-base ${
                  isActive('/contact')
                    ? 'font-medium text-[#4F46E5]'
                    : 'text-[#374151] hover:text-[#4F46E5]'
                }`}
              >
                Kontak
                <span
                  className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[#4F46E5] transition-transform duration-200 ${
                    isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </div>
            </Link>

            <div ref={moreRef} className="relative group">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[#374151] transition-colors duration-200 hover:text-[#4F46E5] sm:gap-2 sm:px-4 sm:text-base"
              >
                Lainnya
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 transform transition-transform duration-200 sm:h-4 sm:w-4 ${
                    moreOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-[340px] rounded-2xl border border-[#E4E6EA] bg-white p-3 shadow-xl">
                  <div className="mb-2 rounded-xl bg-[#EEF2FF] p-3">
                    <Link
                      prefetch={false}
                      href="/workspace/"
                      onClick={() => setMoreOpen(false)}
                      className="block"
                    >
                      <div className="text-sm font-bold text-[#4F46E5]">
                        Buka Aplikasi Jadwal →
                      </div>
                      <div className="mt-0.5 text-xs text-[#3730A3]">
                        Coba AI generator, guru piket, cuti, kalender &amp; asisten AI secara langsung
                      </div>
                    </Link>
                  </div>
                  <div className="space-y-0.5">
                    {MORE_ITEMS.map((item) => (
                      <Link
                        prefetch={false}
                        key={item.label}
                        href={item.href}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-xl px-3 py-2 transition-colors hover:bg-[#F5F6F8]"
                      >
                        <div className="text-sm font-semibold text-[#111214]">{item.label}</div>
                        <div className="text-xs text-[#565A62]">{item.desc}</div>
                      </Link>
                    ))}
                    <Link
                      prefetch={false}
                      href="/faq/"
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-xl border-t border-[#E4E6EA] px-3 py-2 pt-2.5 text-sm font-semibold text-[#111214] hover:bg-[#F5F6F8]"
                    >
                      Pusat Bantuan &amp; Tanya Jawab
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex xl:gap-4">
            <Link prefetch={false} href="/login/">
              <button
                type="button"
                className="px-4 py-2 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900 xl:px-6 xl:text-base"
              >
                Masuk
              </button>
            </Link>
            <Link prefetch={false} href="/signup/">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#4338CA] xl:px-6 xl:text-base"
              >
                Mulai Gratis
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
              </button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            className="rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 sm:p-2 lg:hidden"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-[#111214]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-[#111214]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mt-3 rounded-2xl border border-[#E4E6EA] bg-white p-4 shadow-xl lg:hidden">
            <div className="flex flex-col space-y-1">
              <Link prefetch={false}
                href="/features/"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive('/features')
                    ? 'bg-[#EEF2FF] text-[#4F46E5]'
                    : 'text-[#374151] hover:bg-[#F5F6F8]'
                }`}
              >
                Fitur
              </Link>
              <Link prefetch={false}
                href="/pricing/"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive('/pricing')
                    ? 'bg-[#EEF2FF] text-[#4F46E5]'
                    : 'text-[#374151] hover:bg-[#F5F6F8]'
                }`}
              >
                Harga
              </Link>
              <Link prefetch={false}
                href="/contact/"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
                  isActive('/contact')
                    ? 'bg-[#EEF2FF] text-[#4F46E5]'
                    : 'text-[#374151] hover:bg-[#F5F6F8]'
                }`}
              >
                Kontak
              </Link>

              <div className="border-t border-[#E4E6EA] pt-2">
                <div className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Modul Aplikasi
                </div>
                {MORE_ITEMS.map((item) => (
                  <Link prefetch={false}
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-2 text-sm text-[#374151] hover:bg-[#F5F6F8]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-2 border-t border-[#E4E6EA] pt-3">
                <Link prefetch={false}
                  href="/workspace/"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full bg-[#EEF2FF] px-4 py-2.5 text-center text-sm font-semibold text-[#4F46E5] hover:bg-[#E0E7FF]"
                >
                  Buka Aplikasi Jadwal →
                </Link>
                <Link prefetch={false}
                  href="/login/"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full border border-[#D5D9DF] px-4 py-2.5 text-center text-sm font-semibold text-[#111214] hover:border-[#111214]"
                >
                  Masuk
                </Link>
                <Link prefetch={false}
                  href="/signup/"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-full bg-[#4F46E5] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-[#4338CA]"
                >
                  Mulai Gratis
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
