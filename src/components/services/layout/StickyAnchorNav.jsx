'use client';

import { useEffect, useState } from 'react';

export default function StickyAnchorNav({ items = [] }) {
  const [active, setActive] = useState(items[0]?.href);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Activate from current hash on mount
    const currentHash = typeof window !== 'undefined' ? window.location.hash : '';
    if (currentHash) setActive(currentHash);

    const onScroll = () => {
      let current = active;
      items.forEach(({ href }) => {
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = href;
        }
      });
      if (current !== active) setActive(current);
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items, active]);

  const onClick = (e, href) => {
    // Smooth scroll and sync hash
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.history.replaceState(null, '', href);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActive(href);
    }
  };

  return (
    <div className={`sticky top-14 z-40 w-full ${scrolled ? '' : ''}`}>
      <div className="mx-auto max-w-6xl px-6">
        <nav className="my-3 flex gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white/70 p-2 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          {items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onClick(e, l.href)}
              className={`inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-slate-900 ${
                active === l.href ? 'border-blue-300 text-blue-600' : 'border-gray-200 text-gray-700'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
