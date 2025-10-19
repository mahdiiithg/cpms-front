// filepath: m:\ld-dt\cmps\cpms-front\src\app\global-affiliations\page.jsx
import CanvasOrbs from '@/components/ui/CanvasOrbs';
import CanvasGrid from '@/components/ui/CanvasGrid';
import { affiliations as affiliationsData, marketingPartners as marketingPartnersData } from '@/data/affiliationsData';

export const metadata = {
  title: 'Global Affiliations | Coast Planet',
  description:
    'Discover our global affiliations and partnerships that expand our reach, enhance service quality, and deliver trusted real estate expertise.',
};

function initials(name) {
  return name
    .split(/\s|–|—|-/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export default function GlobalAffiliationsPage() {
  const affiliations = affiliationsData;
  const marketingPartners = marketingPartnersData;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <img src="/assets/graphics/mesh-1.svg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10">
          <CanvasOrbs className="h-full w-full" colors={["#0f172a","#1f2937","#334155"]} count={8} speed={0.35} blur={0.7} opacity={0.9} />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-white/40 to-white"></div>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-600/90">
            <ol className="flex gap-2">
              <li><a href="/" className="hover:text-slate-900">Home</a></li>
              <li aria-hidden>›</li>
              <li><a href="/services" className="hover:text-slate-900">Services</a></li>
              <li aria-hidden>›</li>
              <li aria-current="page" className="text-slate-900 font-medium">Global Affiliations</li>
            </ol>
          </nav>

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Global Affiliations
              </h1>
              <p className="mt-4 text-lg text-slate-700">
                Trusted partnerships and international networks that extend our reach and elevate your real estate experience.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#affiliations" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white font-medium hover:bg-slate-800">
                  Explore affiliations
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-lg border border-slate-900/15 bg-white/70 backdrop-blur px-4 py-2 text-slate-900 font-medium hover:bg-white">
                  Contact us
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              {/* Decorative collage - replace src with real images later */}
              <div className="grid grid-cols-3 gap-3">
                {[1,2,3,4,5,6].map((i) => (
                  <div key={i} className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/40 bg-white/40 shadow-sm backdrop-blur">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 text-xs">
                      Image {i}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <CanvasGrid className="h-full w-full" density={36} color="#cbd5e1" accent="#0f172a" />
        </div>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold text-slate-900">Who we’re connected with</h2>
            <p className="mt-3 text-slate-700">
              Our affiliations connect us with best-in-class organizations around the world. This enables seamless referrals,
              global marketing exposure, and consistent standards of service whether you’re buying, selling, or investing.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                Note: Content and logos here are placeholders. After we finalize the exact affiliations from the reference page, we’ll replace them with the official names, copy, and brand assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliations grid */}
      <section id="affiliations" className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8 lg:pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {affiliations.map((item) => (
            <article key={item.name} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md">
              <div className="pointer-events-none absolute inset-px rounded-[14px] bg-gradient-to-br from-slate-50 to-white"></div>
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-600 opacity-20 blur"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-slate-600 text-white font-semibold overflow-hidden">
                    {item.logo ? (
                      <img src={item.logo} alt={item.short || item.name} className="h-full w-full object-cover" />
                    ) : (
                      initials(item.short || item.name)
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                  {item.short && <p className="text-sm text-slate-500">{item.short}</p>}
                </div>
              </div>
              {item.blurb && <p className="mt-4 text-sm leading-6 text-slate-700">{item.blurb}</p>}
              <div className="mt-5">
                <a href={item.href || '#'} className="text-sm font-medium text-slate-900 hover:underline">Learn more</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Marketing partners / portals */}
      <section className="relative bg-slate-50">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <CanvasOrbs className="h-full w-full" colors={["#e2e8f0","#cbd5e1","#94a3b8"]} count={10} speed={0.2} blur={0.8} opacity={0.6} />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-600">Marketing partners</h2>
          <p className="mt-2 text-center text-2xl font-semibold text-slate-900">Where your property is seen</p>
          <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {marketingPartners.map((p) => (
              <div key={p.name} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 font-semibold overflow-hidden">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    initials(p.name)
                  )}
                </div>
                <div className="text-sm font-medium text-slate-800">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <CanvasGrid className="h-full w-full" density={44} color="#e2e8f0" accent="#334155" />
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-slate-900">Why these affiliations matter</h2>
            <p className="mt-3 text-slate-700">
              These relationships amplify reach, credibility, and outcomes for our clients.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ul className="grid gap-4 sm:grid-cols-2">
              <li className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">Global referral network</p>
                <p className="mt-1 text-sm text-slate-700">Connects buyers and sellers across borders for faster, higher-confidence transactions.</p>
              </li>
              <li className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">Premium marketing</p>
                <p className="mt-1 text-sm text-slate-700">Access to international listing portals, media, and affluent audiences.</p>
              </li>
              <li className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">Standards and credibility</p>
                <p className="mt-1 text-sm text-slate-700">Aligned to global best practices for ethics, valuation, and service quality.</p>
              </li>
              <li className="rounded-xl border border-slate-200 p-4">
                <p className="font-medium text-slate-900">Seamless cross-border moves</p>
                <p className="mt-1 text-sm text-slate-700">Relocation and investment support with local expertise in multiple markets.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <CanvasOrbs className="h-full w-full" colors={["#0f172a","#1f2937","#334155"]} count={7} speed={0.3} blur={0.65} opacity={0.8} />
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-slate-900 px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Ready to leverage our global network?</h3>
                <p className="mt-2 text-slate-300">Talk to our team about selling, buying, or investing with international exposure.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-slate-900 font-medium hover:bg-slate-100"
                >
                  Contact us
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2 font-medium hover:bg-white/10"
                >
                  Explore services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
