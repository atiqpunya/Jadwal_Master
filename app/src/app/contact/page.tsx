import type { Metadata } from 'next';
import React from 'react';
import { SiteShell } from '@/components/SiteShell';
import { ContactFormSection } from '@/components/ContactFormSection';
import { FaqAccordion, type FaqItem } from '@/components/FaqAccordion';

export const metadata: Metadata = {
  title: 'Contact TimetableMaster | Schedule a Demo or Get Support',
  description:
    'Contact TimetableMaster for personalized support, schedule a free 30-minute demo, or ask questions about our AI-powered school timetable scheduling software.',
};

const CONTACT_FAQS: FaqItem[] = [
  {
    question: 'How do I schedule a demo of TimetableMaster?',
    answer:
      'Use the contact form above or click Pick a time in the Book a 30-minute demo card to share your school structure and preferred slot.',
  },
  {
    question: "What is TimetableMaster's typical response time?",
    answer:
      'Our scheduling team replies within 24 hours on working days—often much sooner for active schools during timetable week.',
  },
  {
    question: 'Where is TimetableMaster located?',
    answer:
      'Our distributed scheduling engineering and onboarding specialists support schools globally across all major time zones.',
  },
  {
    question: 'What kind of support does TimetableMaster offer?',
    answer:
      'Free plans include email support; Pro adds WhatsApp and limited video support; Max includes a dedicated relationship manager and guided master-timetable onboarding.',
  },
  {
    question: 'Which countries and regions does TimetableMaster serve?',
    answer:
      'We serve schools, colleges and universities across 100+ countries supporting IB, IGCSE, A-levels, CBSE, ICSE, AP and custom rotating cycles.',
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#E4E6EA] bg-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{
              height: '420px',
              background:
                'radial-gradient(50% 55% at 15% 0%, rgba(79,70,229,0.10) 0%, rgba(255,255,255,0) 70%), radial-gradient(45% 50% at 88% 5%, rgba(234,88,12,0.08) 0%, rgba(255,255,255,0) 70%)',
            }}
          />
          <div className="relative mx-auto w-full max-w-[1180px] px-5 py-14 sm:px-8 sm:py-[66.5px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#565A62]">
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
                />
                CONTACT
              </span>
              <h1 className="font-display mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-[#111214] sm:text-[3.5rem]">
                Tell us about your schedule.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#565A62]">
                The more complex it is, the more we want to hear about it. We work
                with schools across 100+ countries on CBSE, ICSE, IGCSE, IB and state
                board timetables.
              </p>
            </div>
          </div>
        </section>

        {/* Form + Demo sidebar */}
        <ContactFormSection variant="contact-page" />

        {/* FAQ */}
        <section className="bg-[#F5F6F8]">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-[83.5px] sm:px-8 sm:py-28">
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
                  Before you write in
                </h2>
              </div>

              <FaqAccordion items={CONTACT_FAQS} />
            </div>
          </div>
        </section>

        {/* Official correspondence */}
        <section className="bg-white">
          <div className="mx-auto w-full max-w-[1180px] px-5 py-[92px] sm:px-8 md:py-[108px] lg:py-24">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8F98]">
              <span
                aria-hidden="true"
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#4F46E5] align-middle"
              />
              BUSINESS INFORMATION
            </span>
            <h2 className="font-display mt-4 text-[1.75rem] font-extrabold tracking-[-0.03em] text-[#111214] sm:text-[2rem]">
              For official correspondence
            </h2>

            <div className="mt-10 grid gap-10 border-t border-[#E4E6EA] pt-8 sm:grid-cols-2">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8F98]">
                  LEGAL ENTITY
                </div>
                <div className="mt-3 text-sm font-bold text-[#111214]">
                  SuperSphere Labs LLP
                </div>
                <div className="mt-2 max-w-md text-sm leading-relaxed text-[#565A62]">
                  Registered office: A-266, Triveni Nagar, Jaipur, 302018, Rajasthan, India
                </div>
                <div className="mt-2 max-w-md text-sm leading-relaxed text-[#565A62]">
                  Branch office: Karya Shared Workspace, 3rd floor, No.788, Eterna, 15th Cross Rd, Nagarjun Enclave, 1st Phase, J. P. Nagar, Bengaluru, Karnataka 560078, India
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8F98]">
                  OFFICIAL CONTACT
                </div>
                <div className="mt-3 space-y-2 text-sm font-semibold text-[#111214]">
                  <div>
                    <a
                      href="mailto:hello@timetablemaster.com"
                      className="underline decoration-[#D5D9DF] underline-offset-[4px] hover:decoration-[#111214]"
                    >
                      hello@timetablemaster.com
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://wa.me/919110449907"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#D5D9DF] underline-offset-[4px] hover:decoration-[#111214]"
                    >
                      WhatsApp +91-9110449907
                    </a>
                  </div>
                  <div>
                    <a
                      href="tel:+919110449907"
                      className="underline decoration-[#D5D9DF] underline-offset-[4px] hover:decoration-[#111214]"
                    >
                      Phone +91-9110449907
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
