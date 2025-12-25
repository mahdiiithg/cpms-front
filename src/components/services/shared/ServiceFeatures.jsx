'use client';

import { CheckCircle } from 'lucide-react';

export default function ServiceFeatures({ title = "Why Choose Us", badge = "Why Choose Us", features }) {
  return (
    <section id="whychooseus" className="bg-[#171717] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
            {badge}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">
            {title}
          </h2>
        </div>
        <ul className="space-y-4 text-lg text-gray-300">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#ccff00]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
