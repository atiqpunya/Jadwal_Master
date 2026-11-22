import React from 'react';

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-[#DDE0E5] border-t border-[#DDE0E5]">
      {items.map((item) => (
        <details key={item.question} className="group py-[21px]">
          <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-6 text-[17px] font-bold tracking-[-0.015em] text-[#111214] marker:content-none">
            {item.question}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8A8F98] transition-transform duration-200 group-open:rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </summary>
          <p className="mt-3 max-w-2xl pr-11 text-[15px] leading-relaxed text-[#565A62]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
