import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TimetableMaster',
  description:
    'Create your account and generate your first conflict-free timetable today. Free plan, no credit card.',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
