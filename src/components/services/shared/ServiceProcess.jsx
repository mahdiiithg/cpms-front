'use client';

export default function ServiceProcess({ title = "How It Works", badge = "How It Works", subtitle, steps }) {
  return (
    <section id="process" className="scroll-mt-24 bg-[#171717] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
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
        <div className="relative">
          <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#ccff00]/50 to-teal-500/50 md:block" />
          <div className={`grid gap-8 md:grid-cols-3 ${steps.length > 4 ? 'lg:grid-cols-6' : steps.length > 3 ? 'lg:grid-cols-5' : ''}`}>
            {steps.map((s, i) => (
              <div key={i} className="group relative animate-fade-in text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ccff00] to-teal-500 text-lg font-bold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(204,255,0,0.6)]">
                  {s.step}
                </div>
                <h4 className="mb-1 text-base font-semibold text-white">
                  {s.title}
                </h4>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
