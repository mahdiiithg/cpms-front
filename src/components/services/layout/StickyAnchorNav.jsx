'use client';

import { useEffect, useState } from 'react';

export default function StickyAnchorNav({ items = [] }) {
  const [active, setActive] = useState(items[0]?.href);

  useEffect(() => {
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
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <nav className="flex flex-wrap items-center gap-3 py-3 text-sm">
          {items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`rounded-full border px-3 py-1.5 hover:border-blue-300 hover:text-blue-600 ${
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
