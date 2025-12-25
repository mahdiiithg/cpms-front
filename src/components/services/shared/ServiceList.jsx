'use client';

import { CheckCircle } from 'lucide-react';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function ServiceList({ title = "Our Services", badge = "Our Services", subtitle, services }) {
  return (
    <section id="services" className="relative scroll-mt-24 bg-[#1a1a1a] py-16">
      {/* Neon Balloon */}
      <div className="pointer-events-none absolute top-1/4 right-10 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <CanvasGrid
          className="h-full w-full"
          density={44}
          color="#ccff00"
          accent="#ccff00"
        />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
            {badge}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, i) => (
            <div
              key={i}
              className="group flex animate-fade-in items-start gap-3 rounded-lg border border-gray-800 bg-[#212121]/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#ccff00]/30 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#ccff00]" />
              <span className="text-gray-300">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
