'use client';

import { Collapse } from 'antd';

export default function ServiceFAQ({ faqs }) {
  return (
    <section id="faqs" className="scroll-mt-24 bg-[#1a1a1a] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
            FAQs
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <Collapse
          accordion
          className="border-gray-800 bg-transparent"
          items={faqs.map((f, i) => ({
            key: String(i + 1),
            label: <span className="font-semibold text-white">{f.q}</span>,
            children: <p className="text-gray-400">{f.a}</p>,
            className: 'bg-[#212121]/60 border-gray-800 backdrop-blur-sm mb-2',
          }))}
        />
      </div>
    </section>
  );
}
