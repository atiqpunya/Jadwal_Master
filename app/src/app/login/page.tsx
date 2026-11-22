'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) return;
    try {
      localStorage.setItem('tm_user', JSON.stringify({ email: email.trim() }));
    } catch {
      // Ignore storage errors
    }
    setDone(true);
    if (typeof window !== 'undefined') {
      window.location.href = '/workspace/';
    }
  };

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* Left Brand Panel (Desktop only) */}
      <div
        className="relative hidden flex-col justify-between overflow-hidden bg-[#1E1B4B] p-12 text-white lg:flex"
        style={{
          backgroundImage:
            'radial-gradient(60% 55% at 15% 10%, rgba(99,102,241,0.35) 0%, rgba(30,27,75,0) 70%), radial-gradient(50% 50% at 85% 85%, rgba(124,58,237,0.30) 0%, rgba(30,27,75,0) 70%)',
        }}
      >
        <div className="relative">
          <Link prefetch={false} href="/" aria-label="TimetableMaster Home" className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            <div className="inline-block text-2xl font-bold tracking-tight text-white">
              <span className="font-light italic">timetable</span>{' '}
              <span className="font-extrabold italic">master</span>{' '}
              <span className="ml-0.5 align-top text-xs font-bold uppercase">TM</span>
            </div>
          </Link>
        </div>

        <div className="relative my-auto max-w-lg py-12">
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
            Masuk ke Jadwal Sekolah Anda
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#ffffffbf]">
            Akses jadwal sekolah Anda, pantau notifikasi guru piket, kelola izin cuti guru, dan atur penempatan ruang kelas secara real time.
          </p>

          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10 text-[15px] text-white/85">
            <li className="flex items-center gap-3.5 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-[#A5B4FC]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>Sinkronisasi jadwal instan di semua perangkat</span>
            </li>
            <li className="flex items-center gap-3.5 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-[#A5B4FC]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              <span>Kelola penugasan guru piket &amp; pengganti secara langsung</span>
            </li>
            <li className="flex items-center gap-3.5 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-[#A5B4FC]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <span>Keamanan data institusi sekolah terjamin</span>
            </li>
          </ul>
        </div>

        <p className="relative text-sm text-white/45">
          Dipercaya oleh lebih dari 50.000 sekolah &amp; institusi di seluruh dunia
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col items-center justify-center bg-white p-8 sm:px-10">
        <div className="w-full max-w-[448px]">
          <div className="mb-8 flex justify-center lg:hidden">
            <Link prefetch={false} href="/" aria-label="TimetableMaster Home" className="flex items-center gap-2">
              <img src="/logo.svg" alt="TimetableMaster" className="h-8 w-8" />
              <div className="inline-block text-xl font-bold tracking-tight text-[#4F46E5]">
                <span className="font-light italic">timetable</span>{' '}
                <span className="font-extrabold italic">master</span>{' '}
                <span className="ml-0.5 align-top text-[10px] font-bold uppercase">TM</span>
              </div>
            </Link>
          </div>

          <h2 className="font-display text-center text-2xl font-extrabold tracking-[-0.03em] text-[#111214] lg:text-3xl">
            Masuk ke Akun Anda
          </h2>
          <p className="mt-2 text-center text-sm text-[#565A62]">
            Belum punya akun?{' '}
            <Link
              prefetch={false}
              href="/signup/"
              className="font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration-[#4F46E5]"
            >
              buat akun gratis baru
            </Link>
          </p>

          {done ? (
            <div className="mt-8 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-6 text-center">
              <div className="font-display text-lg font-bold text-[#065F46]">
                Berhasil Masuk
              </div>
              <p className="mt-2 text-sm text-[#047857]">
                Selamat datang kembali, {email}. Anda telah terhubung ke aplikasi jadwal sekolah.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link
                  prefetch={false}
                  href="/workspace/"
                  className="inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
                >
                  Buka Aplikasi Jadwal →
                </Link>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Ganti Akun
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    ALAMAT EMAIL
                  </label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="nama@sekolah.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="login-password"
                      className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                    >
                      KATA SANDI
                    </label>
                    <a
                      href="#forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Tautan pemulihan kata sandi telah dikirim ke email Anda.');
                      }}
                      className="text-xs text-[#4F46E5] hover:underline"
                    >
                      Lupa kata sandi?
                    </a>
                  </div>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Masukkan kata sandi Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[#D5D9DF] text-[#4F46E5] focus:ring-[#4F46E5]/25"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-xs text-[#565A62]">
                    Ingat saya selama 30 hari
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#4F46E5] py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                >
                  Masuk Sekarang
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E4E6EA]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-[#8A8F98]">ATAU MASUK DENGAN</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const demoEmail = 'demo.user@school.edu';
                  setEmail(demoEmail);
                  try {
                    localStorage.setItem('tm_user', JSON.stringify({ email: demoEmail }));
                  } catch {
                    // Ignore
                  }
                  setDone(true);
                  if (typeof window !== 'undefined') {
                    window.location.href = '/workspace/';
                  }
                }}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#D5D9DF] bg-white py-2.5 text-sm font-medium text-[#374151] transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <img
                  src="/google-icon-logo.webp"
                  alt="Google"
                  className="h-5 w-5 object-contain"
                />
                Lanjutkan dengan Google
              </button>

              <Link
                prefetch={false}
                href="/workspace/"
                className="mt-3 flex w-full items-center justify-center rounded-lg border border-[#EEF2FF] bg-[#EEF2FF] py-2.5 text-sm font-semibold text-[#4F46E5] transition-colors hover:bg-[#E0E7FF]"
              >
                Masuk ke Aplikasi Demo (Tanpa Password) →
              </Link>
            </>
          )}

          <div className="mt-8 text-center text-xs text-[#8A8F98]">
            Butuh bantuan masuk?{' '}
            <Link
              prefetch={false}
              href="/contact/"
              className="text-[#4F46E5] hover:underline"
            >
              Hubungi Bantuan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
