'use client';

import { Button, Card, Collapse, Form, Input } from 'antd';
import { Lamp, Smartphone, Home as HomeIcon, CheckCircle } from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function InteriorDesignSmartHomePage() {
  const features = [
    'Interior concept, mood boards and material palettes',
    'Detailed joinery and FF&E specifications',
    'Lighting design and automation scenes',
    'Smart home platform selection and integration',
    'Network, security and audio-visual planning',
    'On-site coordination and styling',
  ];

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#features', label: 'What we do' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Interior Design & Smart Home Integration | Coast Planet</title>
        <meta name="description" content="Cohesive interiors and seamless smart home experiences, designed and delivered." />
      </Head>
      <div className="min-h-screen bg-white">
        <HeroWithForm
          title="Interior Design & Smart Home Integration"
          subtitle="Elegant interiors and intuitive technology that elevate daily living."
          formContext="interior-design-smart-home-integration"
          ctas={[{ label: 'Book a design consult', primary: true, href: '#contact' }, { label: 'Request proposal', href: '#contact' }]}
        />

        <StickyAnchorNav items={navItems} />

        <section id="features" className="relative bg-white py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
            <CanvasGrid className="h-full w-full" density={36} color="#e2e8f0" accent="#334155" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">What we do</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">From concept to commissioning, we craft spaces that work beautifully.</p>
            </div>
            <div className="mx-auto max-w-3xl space-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
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
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Let's design your space</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Book a consultation to explore interior concepts and smart home options.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="interior-design-smart-home-integration" variant="dark" fields={[
                  { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
                  { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your space and timelines' },
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
