import React from 'react';
import { TESTIMONIALS_INNER_HTML } from './testimonials_content';

export function TestimonialsSection() {
  return (
    <section
      className="border-b border-[#E4E6EA] bg-white"
      dangerouslySetInnerHTML={{ __html: TESTIMONIALS_INNER_HTML }}
    />
  );
}
