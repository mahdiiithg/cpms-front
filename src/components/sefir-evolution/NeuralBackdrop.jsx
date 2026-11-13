'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const NODES = [
  [12, 22],
  [28, 48],
  [18, 72],
  [42, 18],
  [48, 55],
  [55, 82],
  [68, 28],
  [72, 62],
  [84, 40],
  [88, 78],
  [35, 35],
  [62, 45],
];

const EDGES = [
  [0, 3],
  [0, 1],
  [1, 4],
  [1, 2],
  [2, 5],
  [3, 6],
  [3, 10],
  [4, 10],
  [4, 11],
  [5, 8],
  [6, 8],
  [6, 11],
  [7, 11],
  [7, 9],
  [8, 9],
  [10, 11],
];

export default function NeuralBackdrop({ intensity = 1 }) {
  const reduceMotion = usePrefersReducedMotion();
  // Stable ids avoid SSR/client useId hydration mismatches in SVG defs.
  const uid = 'sefir-neural';
  const pulse = useMemo(
    () => EDGES.map((_, i) => ((i * 0.37) % 1) * 4 + 2),
    [],
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="sefir-aurora absolute inset-0" />
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(61,220,181,0.22)" />
            <stop offset="55%" stopColor="rgba(61,220,181,0.05)" />
            <stop offset="100%" stopColor="rgba(5,7,13,0)" />
          </radialGradient>
          <linearGradient id={`${uid}-line`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(159,180,217,0.05)" />
            <stop offset="50%" stopColor="rgba(61,220,181,0.45)" />
            <stop offset="100%" stopColor="rgba(159,180,217,0.08)" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${uid}-glow)`} />
        {EDGES.map(([a, b], i) => {
          const [x1, y1] = NODES[a];
          const [x2, y2] = NODES[b];
          return (
            <g key={`${a}-${b}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={`url(#${uid}-line)`}
                strokeWidth={0.12 * intensity}
              />
              {!reduceMotion && (
                <circle r={0.28} fill="rgba(61,220,181,0.9)">
                  <animateMotion
                    dur={`${pulse[i]}s`}
                    repeatCount="indefinite"
                    path={`M${x1},${y1} L${x2},${y2}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
        {NODES.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 0.55 : 0.35}
            fill="rgba(232,238,247,0.55)"
            className={reduceMotion ? undefined : 'sefir-node-breathe'}
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </svg>
      <div className="sefir-grid absolute inset-0 opacity-[0.18]" />
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const mqRef = useRef(null);

  useEffect(() => {
    mqRef.current = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mqRef.current.matches);
    update();
    mqRef.current.addEventListener('change', update);
    return () => mqRef.current.removeEventListener('change', update);
  }, []);

  return reduced;
}
