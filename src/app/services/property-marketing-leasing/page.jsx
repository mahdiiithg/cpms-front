'use client';

import { Button, Card, Collapse, Form, Input } from 'antd';
import { Megaphone, Users, Target, CheckCircle, TrendingUp } from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function PropertyMarketingLeasingPage() {
  const pillars = [
    { icon: <Target className="h-6 w-6 text-blue-600" />, title: 'Targeted campaigns', desc: 'Performance media and PR optimized for qualified leads.' },
    { icon: <Megaphone className="h-6 w-6 text-blue-600" />, title: 'Brand storytelling', desc: 'Creative that communicates value and lifestyle.' },
    { icon: <Users className="h-6 w-6 text-blue-600" />, title: 'Broker ecosystem', desc: 'Channel partnerships and incentives that scale reach.' },
    { icon: <TrendingUp className="h-6 w-6 text-blue-600" />, title: 'Conversion ops', desc: 'CRM, SLAs and reporting that turn interest into leases.' },
  ];

  const services = [
    'Professional photography, video and 3D tours',
    'Listings syndication and campaign management',
    'Landing pages and conversion-optimized funnels',
    'Lead qualification and booking coordination',
    'Showings and application processing',
    'Lease negotiation and execution',
    'Performance reporting and optimization',
  ];

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#pillars', label: 'Our pillars' },
    { href: '#services', label: 'What we do' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Property Marketing & Leasing | Coast Planet</title>
        <meta name="description" content="End-to-end marketing and leasing operations engineered for occupancy and ROI." />
      </Head>

      <div className="min-h-screen bg-white">
        <HeroWithForm
          title="Property Marketing & Leasing"
          subtitle="A full-funnel approach from content to contracts—built for occupancy."
          formContext="property-marketing-leasing"
          ctas={[{ label: 'Discuss your project', primary: true, href: '#contact' }, { label: 'Request proposal', href: '#contact' }]}
        />

        <StickyAnchorNav items={navItems} />

        <section id="pillars" className="relative bg-white py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
            <CanvasGrid className="h-full w-full" density={36} color="#e2e8f0" accent="#334155" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Go-to-market pillars</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Brand, performance media and sales ops working as one engine.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="mb-3">{p.icon}</div>
                    <h3 className="mb-1 text-lg font-semibold">{p.title}</h3>
                    <p className="text-gray-600">{p.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="relative bg-gray-50 py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
            <CanvasGrid className="h-full w-full" density={44} color="#e5e7eb" accent="#0f172a" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">What we do</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">A full-service team across content, media, leasing ops and reporting.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 text-white scroll-mt-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">Ready to discuss?</div>
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Let's fill your vacancies</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Book a consultation to align marketing, channels and leasing ops.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="property-marketing-leasing" variant="dark" fields={[
                  { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
                  { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your portfolio and timelines' },
                ]} />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-gray-300">Prefer messaging? Use the List Your Property button in the header to contact us on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
