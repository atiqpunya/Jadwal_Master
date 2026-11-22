'use client';

import React, { useState } from 'react';
import Link from '@/components/Link';

export default function SignupPage() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+62');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 6) return;
    try {
      localStorage.setItem('tm_user', JSON.stringify({ name: name.trim(), email: email.trim() }));
    } catch {
      // Ignore
    }
    setDone(true);
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
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-10 w-10" />
            <div className="inline-block text-2xl font-bold tracking-tight text-white" style={{ paddingRight: '0.700em' }}>
              <span className="relative inline-flex items-baseline">
                <span className="font-light italic">timetable</span>{' '}
                <span className="font-extrabold italic">master</span>
                <span aria-hidden="true" className="absolute right-0 top-0 flex" style={{ transform: 'translate(calc(100% + 0.240em), 0.28em)' }}>
                  <span className="inline-flex items-center justify-center rounded-full font-bold not-italic bg-white/20 text-white" style={{ fontSize: '0.1920em', lineHeight: 1, width: '2.05em', height: '2.05em', letterSpacing: '-0.02em' }}>TM</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="relative my-auto max-w-lg py-12">
          <h1 className="font-display text-[2.75rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-white">
            Mulai susun jadwal sekolah dalam hitungan menit
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[#ffffffbf]">
            Daftarkan akun sekolah Anda dan buat jadwal pertama yang bebas bentrok hari ini. Akun gratis, tanpa kartu kredit.
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
              <span>Hemat puluhan jam kerja penyusunan jadwal manual</span>
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
              <span>Akses jadwal sekolah kapan saja dan di mana saja</span>
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
              <span>Platform penjadwalan sekolah yang aman dan andal</span>
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
          <div className="mb-6 flex justify-center sm:mb-8 lg:hidden">
            <Link prefetch={false} href="/" aria-label="TimetableMaster Home" className="flex items-center gap-2">
              <img src="/logo.svg" alt="TimetableMaster" className="h-8 w-8" />
              <div className="inline-block text-2xl font-bold tracking-tight text-[#111214]" style={{ paddingRight: '0.700em' }}>
                <span className="relative inline-flex items-baseline">
                  <span className="font-normal italic">timetable</span>
                  <span className="font-extrabold italic">master</span>
                  <span aria-hidden="true" className="absolute right-0 top-0 flex" style={{ transform: 'translate(calc(100% + 0.240em), 0.28em)' }}>
                    <span className="inline-flex items-center justify-center rounded-full font-bold not-italic bg-[#111214] text-white" style={{ fontSize: '0.1920em', lineHeight: 1, width: '2.05em', height: '2.05em', letterSpacing: '-0.02em' }}>TM</span>
                  </span>
                </span>
              </div>
            </Link>
          </div>

          <h2 className="font-display text-center text-2xl font-extrabold tracking-[-0.03em] text-[#111214] lg:text-3xl">
            {mode === 'signup' ? 'Buat Akun Sekolah Baru' : 'Masuk ke Akun Anda'}
          </h2>
          <p className="mt-2 text-center text-sm text-[#565A62]">
            {mode === 'signup' ? (
              <>
                Atau{' '}
                <Link prefetch={false}
                  href="/login/"
                  className="font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration-[#4F46E5]"
                >
                  masuk ke akun yang sudah ada
                </Link>
              </>
            ) : (
              <>
                Atau{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setDone(false);
                  }}
                  className="font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration-[#4F46E5]"
                >
                  buat akun gratis baru
                </button>
              </>
            )}
          </p>

          {done ? (
            <div className="mt-8 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-6 text-center">
              <div className="font-display text-lg font-bold text-[#065F46]">
                {mode === 'signup' ? 'Akun Siap Digunakan' : 'Berhasil Masuk'}
              </div>
              <p className="mt-2 text-sm text-[#047857]">
                {mode === 'signup'
                  ? `Selamat datang${name ? `, ${name}` : ''}! Akun demo Anda untuk ${email} siap digunakan.`
                  : `Selamat datang kembali, ${email}.`}
              </p>
              <Link prefetch={false}
                href="/workspace/"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
              >
                Buka Aplikasi Jadwal Sekolah →
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5 sm:mt-7 sm:space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                    >
                      NAMA LENGKAP
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    ALAMAT EMAIL
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Masukkan alamat email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                {mode === 'signup' && (
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                    >
                      NOMOR TELEPON / WA
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="countryCode"
                        name="countryCode"
                        type="tel"
                        required
                        aria-label="Kode negara"
                        placeholder="+62"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-20 rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                      />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="81234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                  >
                    KATA SANDI
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-lg border border-[#D5D9DF] bg-white px-3 py-2.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/25"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center rounded-full bg-[#4F46E5] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#4338CA]"
                >
                  {mode === 'signup' ? 'Daftar Akun Sekarang' : 'Masuk'}
                </button>

                <p className="pt-1 text-center text-sm text-[#4B5563]">
                  {mode === 'signup' ? (
                    <>
                      Sudah punya akun?{' '}
                      <Link prefetch={false}
                        href="/login/"
                        className="font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration-[#4F46E5]"
                      >
                        Masuk
                      </Link>
                    </>
                  ) : (
                    <>
                      Belum punya akun?{' '}
                      <button
                        type="button"
                        onClick={() => setMode('signup')}
                        className="font-semibold text-[#111214] underline decoration-[#D5D9DF] underline-offset-[5px] hover:text-[#4F46E5] hover:decoration-[#4F46E5]"
                      >
                        Daftar Akun
                      </button>
                    </>
                  )}
                </p>
              </form>

              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#E4E6EA]" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-[#F9FAFB] px-2.5 py-0.5 text-[#6B7280]">atau</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const demoEmail = 'demo@school.edu';
                  setEmail(demoEmail);
                  try {
                    localStorage.setItem('tm_user', JSON.stringify({ email: demoEmail }));
                  } catch {
                    // Ignore
                  }
                  setDone(true);
                }}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-medium text-[#374151] shadow-sm transition-colors hover:bg-[#F9FAFB]"
              >
                <img
                  src="/google-icon-logo.webp"
                  alt="Google"
                  className="h-5 w-5 object-contain"
                />
                <span>Lanjutkan dengan Google</span>
              </button>

              <p className="mt-4 text-center text-xs text-[#6B7280]">
                Dengan mendaftar, Anda menyetujui{' '}
                <Link prefetch={false}
                  href="/contact/"
                  className="text-[#565A62] underline decoration-[#D5D9DF] underline-offset-[3px] hover:text-[#4F46E5]"
                >
                  Ketentuan Layanan
                </Link>{' '}
                dan{' '}
                <Link prefetch={false}
                  href="/contact/"
                  className="text-[#565A62] underline decoration-[#D5D9DF] underline-offset-[3px] hover:text-[#4F46E5]"
                >
                  Kebijakan Privasi
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
