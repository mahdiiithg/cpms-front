'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Bot,
  HandHelping,
  Mail,
  MessageCircle,
  Pause,
  Play,
  ShieldCheck,
  Instagram,
} from 'lucide-react';

const SCENARIO_KEYS = ['answer', 'handover', 'stop'];
const CHANNEL_KEYS = ['whatsapp', 'instagram', 'email'];

const CHANNEL_ICONS = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  email: Mail,
};

const DECISION_STYLES = {
  answer: {
    icon: Bot,
    tone: 'teal',
  },
  handover: {
    icon: HandHelping,
    tone: 'silver',
  },
  stop: {
    icon: ShieldCheck,
    tone: 'amber',
  },
};

export default function MessageFlowDemo({ t, dir }) {
  const reduceMotion = usePrefersReducedMotion();
  const [scenario, setScenario] = useState('answer');
  const [channel, setChannel] = useState('whatsapp');
  const [phase, setPhase] = useState(0);
  const [running, setRunning] = useState(true);
  const timerRef = useRef(null);

  const scenarioCopy = t.scenarios[scenario];
  const decisionMeta = DECISION_STYLES[scenario];
  const DecisionIcon = decisionMeta.icon;

  const phases = useMemo(
    () => [
      { key: 'inbound', label: t.steps.inbound },
      { key: 'evaluate', label: t.steps.evaluate },
      { key: 'outcome', label: t.steps.outcome },
    ],
    [t.steps],
  );

  useEffect(() => {
    if (!running) return undefined;
    if (reduceMotion) {
      setPhase(2);
      return undefined;
    }

    setPhase(0);
    let step = 0;
    timerRef.current = window.setInterval(() => {
      step += 1;
      if (step > 2) {
        window.clearInterval(timerRef.current);
        setRunning(false);
        return;
      }
      setPhase(step);
    }, 1400);

    return () => window.clearInterval(timerRef.current);
  }, [scenario, channel, running, reduceMotion]);

  const replay = () => {
    setRunning(true);
    setPhase(0);
  };

  return (
    <section
      id="demo"
      className="relative scroll-mt-28"
      aria-labelledby="sefir-demo-title"
    >
      <div className="sefir-glass relative overflow-hidden rounded-[28px] p-5 sm:p-8 lg:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(61,220,181,0.55)] to-transparent" />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="sefir-eyebrow">{t.eyebrow}</p>
            <h2
              id="sefir-demo-title"
              className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight text-[var(--sefir-text)] sm:text-4xl"
            >
              {t.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[var(--sefir-muted)] sm:text-lg">
              {t.subtitle}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-[var(--sefir-stroke)] bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--sefir-teal)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--sefir-teal)]" />
            {t.simLabel}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Scenarios">
          {SCENARIO_KEYS.map((key) => {
            const active = scenario === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={active}
                className={`sefir-chip ${active ? 'sefir-chip-active' : ''}`}
                onClick={() => {
                  setScenario(key);
                  setRunning(true);
                }}
              >
                {t.scenarios[key].label}
              </button>
            );
          })}
        </div>

        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Channels">
          {CHANNEL_KEYS.map((key) => {
            const Icon = CHANNEL_ICONS[key];
            const active = channel === key;
            return (
              <button
                key={key}
                type="button"
                className={`sefir-channel ${active ? 'sefir-channel-active' : ''}`}
                onClick={() => {
                  setChannel(key);
                  setRunning(true);
                }}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span>{t.channels[key]}</span>
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--sefir-stroke)] bg-[#070b14]/80 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-[var(--sefir-muted)]">
                {phases.map((item, index) => (
                  <li key={item.key} className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 transition-colors ${
                        phase >= index
                          ? 'bg-[rgba(61,220,181,0.15)] text-[var(--sefir-teal)]'
                          : 'bg-white/5'
                      }`}
                    >
                      {item.label}
                    </span>
                    {index < phases.length - 1 && (
                      <ArrowRight
                        className={`h-3.5 w-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    )}
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="sefir-icon-btn inline-flex"
                onClick={() => (running ? setRunning(false) : replay())}
                aria-label={running ? 'Pause' : t.replay}
              >
                {running ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              <MessageBubble
                align="start"
                channel={channel}
                visible={phase >= 0}
                label={t.channels[channel]}
              >
                {scenarioCopy.customer}
              </MessageBubble>

              <div
                className={`sefir-think ${phase >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
              >
                <div className="flex items-center gap-3 rounded-xl border border-[rgba(61,220,181,0.2)] bg-[rgba(61,220,181,0.08)] px-4 py-3 text-sm text-[var(--sefir-teal)]">
                  <span className="sefir-radar" aria-hidden />
                  <span>{scenarioCopy.thinking}</span>
                </div>
              </div>

              <MessageBubble
                align="end"
                channel="sefir"
                visible={phase >= 2}
                label="Sefir"
                decision={scenarioCopy.decision}
                decisionTone={decisionMeta.tone}
                DecisionIcon={DecisionIcon}
              >
                {scenarioCopy.reply}
              </MessageBubble>
            </div>
          </div>

          <aside className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--sefir-stroke)] bg-gradient-to-b from-white/[0.06] to-transparent p-5 sm:p-6">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[var(--sefir-muted)] uppercase">
                {scenarioCopy.decision}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-[var(--sefir-text)]">
                {scenarioCopy.note}
              </p>
            </div>

            <div className="space-y-3">
              <FlowRail active={phase} dir={dir} labels={t.steps} />
              <button
                type="button"
                className="sefir-btn-secondary inline-flex w-full"
                onClick={replay}
              >
                <Play className="h-4 w-4" aria-hidden />
                {running ? t.play : t.replay}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({
  children,
  align,
  channel,
  visible,
  label,
  decision,
  decisionTone,
  DecisionIcon,
}) {
  return (
    <div
      className={`flex ${align === 'end' ? 'justify-end' : 'justify-start'} transition-all duration-500 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-2 opacity-0'
      }`}
    >
      <div
        className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[80%] ${
          align === 'end'
            ? 'rounded-br-md bg-[rgba(61,220,181,0.14)] text-[var(--sefir-text)]'
            : 'rounded-bl-md bg-white/[0.07] text-[var(--sefir-text)]'
        }`}
      >
        <div className="mb-1.5 flex items-center gap-2 text-[11px] tracking-wide text-[var(--sefir-muted)] uppercase">
          <span>{label}</span>
          {decision && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
                decisionTone === 'amber'
                  ? 'bg-amber-400/15 text-amber-200'
                  : decisionTone === 'silver'
                    ? 'bg-slate-300/15 text-slate-200'
                    : 'bg-[rgba(61,220,181,0.18)] text-[var(--sefir-teal)]'
              }`}
            >
              {DecisionIcon ? <DecisionIcon className="h-3 w-3" /> : null}
              {decision}
            </span>
          )}
          {channel !== 'sefir' && !decision && (
            <span className="rounded-full bg-white/5 px-2 py-0.5 normal-case">
              {channel}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed sm:text-[15px]">{children}</p>
      </div>
    </div>
  );
}

function FlowRail({ active, dir, labels }) {
  const items = [
    { key: 'inbound', label: labels.inbound },
    { key: 'evaluate', label: labels.evaluate },
    { key: 'outcome', label: labels.outcome },
  ];

  return (
    <div className="rounded-xl border border-[var(--sefir-stroke)] bg-[#05070d]/50 p-4">
      <div className="relative flex justify-between gap-2">
        <div
          className="absolute top-3 right-4 left-4 h-px bg-white/10"
          aria-hidden
        />
        <div
          className="absolute top-3 h-px bg-[var(--sefir-teal)] transition-all duration-500"
          style={{
            [dir === 'rtl' ? 'right' : 'left']: '1rem',
            width: `calc(${(active / 2) * 100}% - 2rem)`,
          }}
          aria-hidden
        />
        {items.map((item, index) => (
          <div key={item.key} className="relative z-10 flex flex-1 flex-col items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                active >= index
                  ? 'bg-[var(--sefir-teal)] text-[#04110d]'
                  : 'bg-[#121826] text-[var(--sefir-muted)] ring-1 ring-white/10'
              }`}
            >
              {index + 1}
            </span>
            <span className="text-center text-[11px] text-[var(--sefir-muted)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}
