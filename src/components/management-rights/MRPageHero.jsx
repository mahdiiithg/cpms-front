import Link from 'next/link';
import { Button } from 'antd';

const ctaClassNames = {
  primary: 'bg-[#ccff00] hover:bg-[#ccff00]/90 text-[#171717] border-0 font-semibold shadow-[0_0_15px_rgba(204,255,0,0.4)]',
  secondary: 'bg-[#212121] border border-gray-700 text-gray-200 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors',
  ghost: 'bg-transparent border border-gray-700 text-gray-200 hover:border-[#ccff00] hover:text-[#ccff00]',
};

export default function MRPageHero({
  title,
  subtitle,
  ctas = [],
  eyebrow,
  className = '',
}) {
  return (
    <div className={`bg-gradient-to-br from-[#ccff00]/12 via-[#1b1b1b] to-[#0f0f0f] rounded-xl p-6 mb-6 border border-[#ccff00]/25 shadow-[0_0_25px_rgba(204,255,0,0.08)] ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          {eyebrow ? <p className="text-xs uppercase tracking-[0.12em] text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">{eyebrow}</p> : null}
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">{title}</h1>
          {subtitle ? <p className="mt-1 text-gray-300 max-w-2xl">{subtitle}</p> : null}
        </div>
        {/* {ctas?.length ? (
          <div className="flex gap-2 flex-wrap md:justify-end">
            {ctas.map((cta) => (
              <Link key={cta.href || cta.label} href={cta.href || '#'}>
                <Button
                  className={ctaClassNames[cta.variant || 'secondary']}
                  type={cta.variant === 'primary' ? 'primary' : 'default'}
                  size={cta.size || 'middle'}
                >
                  {cta.label}
                </Button>
              </Link>
            ))}
          </div>
        ) : null} */}
      </div>
    </div>
  );
}


