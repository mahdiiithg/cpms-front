'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  BookOpenCheck,
  Languages,
  Menu,
  ShieldOff,
  UserRound,
  Workflow,
  X,
} from 'lucide-react';
import { LOCALES, copy } from '@/lib/sefir/i18n';
import NeuralBackdrop from './NeuralBackdrop';
import MessageFlowDemo from './MessageFlowDemo';

const CAPABILITY_ICONS = [BookOpenCheck, UserRound, ShieldOff, Workflow];

export default function SefirLanding() {
  const [locale, setLocale] = useState('en');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const localeMeta = LOCALES.find((item) => item.code === locale) || LOCALES[0];
  const t = copy[locale];
  const dir = localeMeta.dir;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    return () => {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, [locale, dir]);

  const navItems = useMemo(
    () => [
      { href: '#product', label: t.nav.product },
      { href: '#how', label: t.nav.how },
      { href: '#channels', label: t.nav.channels },
      { href: '#demo', label: t.nav.demo },
    ],
    [t.nav],
  );

  return (
    <div className="sefir-root min-h-screen" dir={dir}>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[var(--sefir-stroke)] bg-[#05070d]/75 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="sefir-mark" aria-hidden>
              <span className="sefir-mark-core" />
            </span>
            <span className="font-[family-name:var(--font-syne)] text-xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-2xl">
              Sefir
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="sefir-nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="hidden items-center rounded-full border border-[var(--sefir-stroke)] bg-white/[0.04] p-1 sm:flex"
              role="group"
              aria-label="Language"
            >
              {LOCALES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                    locale === item.code
                      ? 'bg-[rgba(61,220,181,0.18)] text-[var(--sefir-teal)]'
                      : 'text-[var(--sefir-muted)] hover:text-[var(--sefir-text)]'
                  }`}
                  onClick={() => setLocale(item.code)}
                  aria-pressed={locale === item.code}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              href="/signin"
              className="sefir-nav-link hidden md:inline-flex"
            >
              {t.nav.signIn}
            </Link>
            <a href="#cta" className="sefir-btn-primary hidden sm:inline-flex">
              {t.nav.cta}
            </a>
            <button
              type="button"
              className="sefir-icon-btn inline-flex lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[var(--sefir-stroke)] bg-[#05070d]/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="mb-4 flex gap-2">
              {LOCALES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    locale === item.code
                      ? 'bg-[rgba(61,220,181,0.18)] text-[var(--sefir-teal)]'
                      : 'bg-white/5 text-[var(--sefir-muted)]'
                  }`}
                  onClick={() => setLocale(item.code)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-[var(--sefir-text)] hover:bg-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/signin"
                className="rounded-xl px-3 py-3 text-[var(--sefir-muted)] hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.signIn}
              </Link>
              <a
                href="#cta"
                className="sefir-btn-primary mt-2 inline-flex justify-center"
                onClick={() => setMenuOpen(false)}
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative isolate min-h-[100svh] overflow-hidden pt-24 pb-16 sm:pt-28 lg:pb-20">
          <NeuralBackdrop />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
            <div className="sefir-hero-copy max-w-2xl">
              <p className="sefir-eyebrow">{t.hero.badge}</p>
              <p className="mt-5 font-[family-name:var(--font-syne)] text-5xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-6xl lg:text-7xl">
                {t.hero.brand}
              </p>
              <h1 className="mt-4 max-w-xl text-2xl leading-snug font-medium text-[var(--sefir-text)] sm:text-3xl lg:text-[2.15rem]">
                {t.hero.headline}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--sefir-muted)] sm:text-lg">
                {t.hero.sub}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="#demo" className="sefir-btn-primary inline-flex">
                  {t.hero.primaryCta}
                  <ArrowRight
                    className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </a>
                <a href="#how" className="sefir-btn-secondary inline-flex">
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="sefir-hero-orb" aria-hidden />
              <div className="sefir-glass relative overflow-hidden rounded-[28px] p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs tracking-[0.2em] text-[var(--sefir-muted)] uppercase">
                      {t.hero.graphLabel}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-syne)] text-lg text-[var(--sefir-text)]">
                      {t.hero.graphTitle}
                    </p>
                  </div>
                  <span className="rounded-full border border-[rgba(61,220,181,0.28)] bg-[rgba(61,220,181,0.1)] px-3 py-1 text-xs text-[var(--sefir-teal)]">
                    WhatsApp · IG · Email
                  </span>
                </div>
                <HeroFlowVisual dir={dir} labels={t.hero} />
                <a
                  href="#demo"
                  className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--sefir-teal)] hover:underline"
                >
                  {t.hero.primaryCta}
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="product"
          className="relative scroll-mt-28 border-t border-[var(--sefir-stroke)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="sefir-eyebrow">{t.capabilities.eyebrow}</p>
              <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl">
                {t.capabilities.title}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {t.capabilities.items.map((item, index) => {
                const Icon = CAPABILITY_ICONS[index];
                return (
                  <article
                    key={item.title}
                    className="sefir-panel group rounded-2xl p-5 transition duration-300 hover:-translate-y-1"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sefir-stroke)] bg-white/[0.04] text-[var(--sefir-teal)] transition group-hover:border-[rgba(61,220,181,0.35)]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--sefir-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--sefir-muted)]">
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative scroll-mt-28 py-6 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MessageFlowDemo t={t.flow} dir={dir} />
          </div>
        </section>

        <section
          id="how"
          className="relative scroll-mt-28 border-t border-[var(--sefir-stroke)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="sefir-eyebrow">{t.how.eyebrow}</p>
              <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl">
                {t.how.title}
              </h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {t.how.steps.map((step, index) => (
                <article key={step.title} className="sefir-panel relative overflow-hidden rounded-2xl p-6">
                  <span className="font-[family-name:var(--font-syne)] text-5xl font-semibold text-white/[0.06]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--sefir-text)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--sefir-muted)]">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="channels"
          className="relative scroll-mt-28 border-t border-[var(--sefir-stroke)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="sefir-eyebrow">{t.channels.eyebrow}</p>
              <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl">
                {t.channels.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--sefir-muted)] sm:text-lg">
                {t.channels.subtitle}
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {t.channels.items.map((item) => (
                <article key={item.key} className="sefir-panel rounded-2xl p-6">
                  <div className="mb-5 h-px w-12 bg-gradient-to-r from-[var(--sefir-teal)] to-transparent" />
                  <h3 className="text-xl font-semibold text-[var(--sefir-text)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--sefir-muted)]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t border-[var(--sefir-stroke)] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div className="sefir-panel flex h-full items-center justify-center rounded-[28px] p-10">
              <Languages className="h-16 w-16 text-[var(--sefir-teal)]" aria-hidden />
            </div>
            <div>
              <p className="sefir-eyebrow">{t.languages.eyebrow}</p>
              <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl">
                {t.languages.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--sefir-muted)] sm:text-lg">
                {t.languages.body}
              </p>
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="relative scroll-mt-28 border-t border-[var(--sefir-stroke)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sefir-glass relative overflow-hidden rounded-[32px] px-6 py-12 text-center sm:px-10 sm:py-16">
              <div className="sefir-cta-glow" aria-hidden />
              <h2 className="relative font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl lg:text-5xl">
                {t.cta.title}
              </h2>
              <p className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--sefir-muted)] sm:text-lg">
                {t.cta.body}
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="mailto:hello@sefir.local"
                  className="sefir-btn-primary inline-flex"
                >
                  {t.cta.button}
                </a>
                <Link href="/signin" className="sefir-btn-secondary inline-flex">
                  {t.nav.signIn}
                </Link>
              </div>
              <p className="relative mt-5 text-sm text-[var(--sefir-muted)]">
                {t.cta.note}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--sefir-stroke)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-[var(--sefir-text)]">
              Sefir
            </p>
            <p className="mt-1 text-sm text-[var(--sefir-muted)]">{t.footer.copy}</p>
          </div>
          <p className="text-sm text-[var(--sefir-muted)]">{t.footer.legal}</p>
        </div>
      </footer>
    </div>
  );
}

function HeroFlowVisual({ dir, labels }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--sefir-stroke)] bg-[#070b14]/70 p-4">
      <svg viewBox="0 0 360 220" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="hero-flow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(159,180,217,0.15)" />
            <stop offset="50%" stopColor="rgba(61,220,181,0.85)" />
            <stop offset="100%" stopColor="rgba(159,180,217,0.2)" />
          </linearGradient>
        </defs>
        <rect
          x="18"
          y="28"
          width="88"
          height="42"
          rx="12"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.1)"
        />
        <rect
          x="136"
          y="84"
          width="88"
          height="42"
          rx="12"
          fill="rgba(61,220,181,0.1)"
          stroke="rgba(61,220,181,0.35)"
        />
        <rect
          x="254"
          y="140"
          width="88"
          height="42"
          rx="12"
          fill="rgba(255,255,255,0.05)"
          stroke="rgba(255,255,255,0.1)"
        />
        <path
          d="M106 49 C130 49, 130 105, 136 105"
          fill="none"
          stroke="url(#hero-flow)"
          strokeWidth="2"
        />
        <path
          d="M224 105 C248 105, 248 161, 254 161"
          fill="none"
          stroke="url(#hero-flow)"
          strokeWidth="2"
        />
        <circle cx="106" cy="49" r="3.5" fill="#3ddcb5">
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="224" cy="105" r="3.5" fill="#3ddcb5">
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            dur="2.4s"
            begin="0.4s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="28" y="54" fill="#9fb4d9" fontSize="11">
          {labels.inbound}
        </text>
        <text x="148" y="110" fill="#3ddcb5" fontSize="11">
          {labels.evaluate}
        </text>
        <text x="270" y="166" fill="#9fb4d9" fontSize="11">
          {labels.outcome}
        </text>
      </svg>
      <p className="mt-2 text-xs text-[var(--sefir-muted)]">{labels.graphOutcomes}</p>
    </div>
  );
}
