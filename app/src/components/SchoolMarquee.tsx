import React from 'react';
import { MARQUEE_INNER_HTML } from './marquee_content';

export function SchoolMarquee() {
  return (
    <section
      className="jsx-98b1010f42e8ab20 py-4 sm:py-5 md:py-6 bg-gray-50 overflow-hidden border-y border-gray-200"
      dangerouslySetInnerHTML={{ __html: MARQUEE_INNER_HTML }}
    />
  );
}
