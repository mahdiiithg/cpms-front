import Link from 'next/link';

// Removed metadata export to avoid Next.js client component restriction

export default function GlobalAffiliationsPage() {
  const anchors = [
    { href: '#overview', label: 'Overview' },
    { href: '#memberships', label: 'Memberships' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const memberships = [
    { code: 'LRE', title: 'Leading Real Estate Network' },
    { code: 'LUX', title: 'Luxury Property Collective' },
    { code: 'INV', title: 'Investment & Advisory Alliance' },
    { code: 'APAC', title: 'APAC Partners' },
    { code: 'EMEA', title: 'EMEA Network' },
    { code: 'AMER', title: 'Americas Network' },
  ];

  const benefits = [
    { title: 'Wider reach', desc: 'Promote listings to qualified audiences across multiple regions.' },
    { title: 'Trusted partners', desc: 'Affiliates vetted for service, compliance, and marketing standards.' },
    { title: 'Cross‑border support', desc: 'Guidance on regulation, finance, FX, and settlement.' },
    { title: 'Consistent quality', desc: 'Shared processes and SLAs for a reliable client experience.' },
    { title: 'Data & insights', desc: 'Access to market intelligence and best‑practice playbooks.' },
    { title: 'Single coordinator', desc: 'One team orchestrating the right partners end‑to‑end.' },
  ];

  // Brand-safe placeholder tiles for partner logos
  const logoTiles = [
    { label: 'LRE', title: 'Leading Real Estate', bg: 'bg-gray-50' },
    { label: 'LUX', title: 'Luxury Collective', bg: 'bg-gray-50' },
    { label: 'ADV', title: 'Advisory Alliance', bg: 'bg-gray-50' },
    { label: 'APAC', title: 'APAC Partners', bg: 'bg-gray-50' },
    { label: 'EMEA', title: 'EMEA Network', bg: 'bg-gray-50' },
    { label: 'AMER', title: 'Americas Network', bg: 'bg-gray-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 text-sm">
        <ol className="flex items-center gap-2 text-gray-600">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li className="text-gray-400">/</li>
          <li><Link href="/about" className="hover:text-gray-900">About</Link></li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900">Global affiliations</li>
        </ol>
      </nav>

      {/* Hero banner */}
      <header className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-teal-50 to-white">
        <div className="absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Global affiliations</h1>
          <p className="mt-2 max-w-3xl text-gray-700">
            We partner with respected international networks to extend your reach and deliver consistent, high‑quality service wherever you transact.
          </p>
        </div>
      </header>

      {/* Anchored subnav */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 bg-white/80 backdrop-blur border-b mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-4 overflow-x-auto py-3 text-sm">
            {anchors.map(a => (
              <a key={a.href} href={a.href} className="text-gray-600 hover:text-gray-900 whitespace-nowrap">
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Overview */}
      <section id="overview" className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Worldwide collaboration</h2>
          <p className="mt-2 text-gray-700">
            Our affiliates comprise independent, market‑leading brokerages and advisory firms. Together, we coordinate cross‑border listings, referrals, and research so clients can move with confidence.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Referrals spanning APAC, EMEA, and the Americas</li>
            <li>Shared playbooks for marketing and service standards</li>
            <li>Clear SLAs and a single coordinating desk</li>
          </ul>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">How we work with partners</h3>
          <p className="mt-2 text-gray-700">
            We match each brief to the right affiliate, align scope and timelines, and maintain ownership of your end‑to‑end experience. Reporting and compliance are built in from the start.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-gray-500">Regions covered</dt>
              <dd className="font-medium text-gray-900">30+ countries</dd>
            </div>
            <div>
              <dt className="text-gray-500">Partner offices</dt>
              <dd className="font-medium text-gray-900">200+ locations</dd>
            </div>
            <div>
              <dt className="text-gray-500">Listing channels</dt>
              <dd className="font-medium text-gray-900">Global + local</dd>
            </div>
            <div>
              <dt className="text-gray-500">Service model</dt>
              <dd className="font-medium text-gray-900">Single coordinator</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Memberships / logos */}
      <section id="memberships" className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Memberships and partner networks</h2>
        <p className="text-sm text-gray-600">Representative networks we collaborate with through formal agreements and referral frameworks.</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {memberships.map((m) => (
            <figure
              key={m.title}
              className="aspect-[3/2] rounded-lg border bg-gray-50 flex items-center justify-center text-center p-2"
              title={m.title}
              aria-label={m.title}
            >
              <figcaption>
                <div className="text-xs font-semibold text-gray-700">{m.code}</div>
                <div className="text-[11px] text-gray-600">{m.title}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Benefits for our clients</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">{b.title}</h3>
              <p className="mt-1 text-sm text-gray-700">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">What partners say</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <blockquote className="rounded-xl border bg-white p-5 text-sm text-gray-700 shadow-sm">
            “Their team coordinates cross‑border briefs seamlessly, giving clients one point of contact.”
            <footer className="mt-2 text-xs text-gray-500">— Partner, APAC Network</footer>
          </blockquote>
          <blockquote className="rounded-xl border bg-white p-5 text-sm text-gray-700 shadow-sm">
            “Professional standards and reporting align well with our global compliance frameworks.”
            <footer className="mt-2 text-xs text-gray-500">— Advisor, EMEA Alliance</footer>
          </blockquote>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-10">
        <div className="rounded-2xl border p-6 md:p-8 bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Speak with our international desk</h2>
              <p className="text-gray-700 mt-1">
                Planning a cross‑border sale or purchase? We’ll coordinate the right affiliates and guide you end‑to‑end.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Contact us</Link>
              <Link href="/services" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-900 hover:bg-gray-50">Our services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Logos grid (brand-safe placeholders) */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900">Selected global partners</h2>
        <p className="text-gray-600 text-sm">Representative networks we collaborate with through formal agreements and referral frameworks.</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {logoTiles.map((l) => (
            <div
              key={l.title}
              className={`aspect-[3/2] ${l.bg} rounded-lg border flex items-center justify-center`}
              title={l.title}
              aria-label={l.title}
            >
              <span className="text-xs font-semibold text-gray-600">{l.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-6">
        <div className="rounded-2xl border p-6 md:p-8 bg-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Speak with our international desk</h2>
              <p className="text-gray-700 mt-1">
                Planning a cross-border sale or purchase? Our team will coordinate with the right affiliates and guide you end‑to‑end.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Contact us</Link>
              <Link href="/services" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-900 hover:bg-gray-50">Our services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
