'use client';

import { Button } from 'antd';

export default function ServiceHero({ title, subtitle, badge = "PROFESSIONAL SERVICES" }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-20 text-center">
      {/* Neon Balloons Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-[#ccff00]/20 to-[#ccff00]/5 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 h-96 w-96 animate-float-delayed rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 h-64 w-64 animate-pulse-slow rounded-full bg-gradient-to-br from-teal-500/15 to-cyan-500/10 blur-2xl"></div>
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/20 to-[#171717]/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10">
        <div className="mb-6 inline-block animate-fade-in">
          <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-4 py-2 text-sm font-semibold text-[#ccff00]">
            {badge}
          </span>
        </div>
        <h1 className="mb-4 animate-slide-up text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(204,255,0,0.3)] md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl animate-slide-up-delayed text-lg text-gray-300">
          {subtitle}
        </p>
        <Button
          size="large"
          className="h-12 animate-fade-in-up rounded-xl border-0 bg-[#ccff00] px-8 text-base font-semibold text-[#171717] shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all duration-300 hover:scale-105 hover:bg-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.8)]"
          href="#contact"
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
