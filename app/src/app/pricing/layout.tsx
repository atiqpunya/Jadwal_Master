import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | TimetableMaster',
  description:
    'Free forever for up to 40 staff members. Pro runs your day on your timetable, priced by staff members; Max adds timetables built around student choices.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
