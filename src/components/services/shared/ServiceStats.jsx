'use client';

import CanvasGrid from '@/components/ui/CanvasGrid';

export default function ServiceStats({ stats }) {
  return (
    <section id="stats" className="relative bg-[#1a1a1a] py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
        <CanvasGrid
          className="h-full w-full"
          density={44}
          color="#ccff00"
          accent="#ccff00"
        />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="group animate-fade-in rounded-xl border border-gray-800 bg-[#212121] p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#ccff00]/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mb-1 text-3xl font-bold text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.6)]">
              {s.value}
            </div>
            <div className="text-sm text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
