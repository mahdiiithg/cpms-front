'use client';

import EnquiryForm from '../forms/EnquiryForm';
import CanvasOrbs from '@/components/ui/CanvasOrbs';

export default function HeroWithForm({
  title,
  subtitle,
  ctas = [],
  formContext = 'general',
}) {
  return (
    <section id="overview" className="relative isolate overflow-hidden py-20 text-white">
      <div className="absolute inset-0 -z-20">
        <img src="/assets/graphics/mesh-1.svg" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10">
        <CanvasOrbs className="h-full w-full" colors={["#0f172a","#1f2937","#334155"]} count={8} speed={0.35} blur={0.7} opacity={0.85} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-teal-700/85" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">Services</div>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">{title}</h1>
            {subtitle && <p className="mb-8 max-w-xl text-lg opacity-90">{subtitle}</p>}
            <div className="flex flex-wrap gap-3">
              {ctas.map((cta, i) => (
                <a
                  key={i}
                  href={cta.href || '#contact'}
                  className={`h-12 rounded-xl px-6 font-semibold inline-flex items-center justify-center ${
                    cta.primary
                      ? 'bg-white text-blue-900'
                      : 'border-white/40 bg-white/10 text-white backdrop-blur-sm border'
                  }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-semibold">Project enquiry</h3>
              <EnquiryForm context={formContext} variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
