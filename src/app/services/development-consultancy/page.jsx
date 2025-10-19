'use client';

import { useState } from 'react';
import { Button, Card, Collapse, Form, Input } from 'antd';
import {
  TrendingUp,
  Users,
  Eye,
  Award,
  CheckCircle,
  ArrowRight,
  Target,
  Layers,
  Briefcase,
} from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';

export default function DevelopmentConsultancyPage() {
  const pillars = [
    { icon: <Eye className="h-6 w-6 text-blue-600" />, title: 'Market intelligence', desc: 'Data-driven insights to shape concept, mix and pricing.' },
    { icon: <Target className="h-6 w-6 text-blue-600" />, title: 'Positioning & strategy', desc: 'Define proposition, brand and GTM for absorption.' },
    { icon: <Layers className="h-6 w-6 text-blue-600" />, title: 'Product & design', desc: 'Optimize layouts, amenities and specification for ROI.' },
    { icon: <Briefcase className="h-6 w-6 text-blue-600" />, title: 'Delivery & governance', desc: 'Programme oversight, sales ops and performance control.' },
  ];

  const offerings = [
    'Feasibility studies & financial modelling',
    'Highest & best use assessments',
    'Unit mix, pricing bands & release strategy',
    'Brand development & creative direction',
    'Sales gallery and experience design',
    '360° marketing, PR & performance media',
    'Broker onboarding & channel management',
    'Sales operations, reports & compliance',
  ];

  const lifecycle = [
    { step: '01', title: 'Define', desc: 'Site due diligence, market scan and feasibility.' },
    { step: '02', title: 'Design', desc: 'Product strategy, unit mix and brand brief.' },
    { step: '03', title: 'Prepare', desc: 'Pricing, phasing, legal docs and sales ops.' },
    { step: '04', title: 'Launch', desc: 'Campaign, events, PR and broker activation.' },
    { step: '05', title: 'Sell', desc: 'Lead management, conversion and reporting.' },
    { step: '06', title: 'Deliver', desc: 'Handover, snagging, and post-completion support.' },
  ];

  const projects = [
    { name: 'Harbor Vista Residences', type: 'Mixed-use', metric: '92% pre-sales', desc: '450-key urban development with curated retail and amenities.' },
    { name: 'Aurora Waterfront', type: 'Luxury residential', metric: 'Sold out in 6 months', desc: 'Phased release strategy and tiered pricing optimization.' },
    { name: 'Crestline Park', type: 'Townhouse community', metric: '+18% over proforma', desc: 'Family-centric amenity mix and targeted media buy.' },
  ];

  const faqs = [
    { q: 'When should consultancy be engaged?', a: 'Ideally from land acquisition or early concept to influence feasibility, product and brand direction before decisions harden.' },
    { q: 'Do you work on a success fee?', a: 'We tailor commercials: fixed scope, monthly retainer, or success-linked components aligned to project goals.' },
    { q: 'Can you manage external partners?', a: 'Yes. We coordinate agencies, brokers, and consultants under a clear governance model and KPIs.' },
    { q: 'What geographies do you cover?', a: 'We primarily operate locally with selected partnerships for regional reach.' },
  ];

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#pillars', label: 'Our pillars' },
    { href: '#offerings', label: 'What we do' },
    { href: '#lifecycle', label: 'Lifecycle' },
    { href: '#gotomarket', label: 'Go-to-market' },
    { href: '#projects', label: 'Featured projects' },
    { href: '#credentials', label: 'Credentials' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Development Sales & Consultancy | Coast Planet</title>
        <meta name="description" content="End-to-end advisory from feasibility to launch: research, strategy, product, brand, and sales execution." />
      </Head>

      <div className="min-h-screen bg-white">
        <HeroWithForm
          title="Development Sales & Consultancy"
          subtitle="Define, design and deliver with confidence. We align product, pricing and positioning to accelerate absorption and value."
          formContext="development-consultancy"
          ctas={[{ label: 'Discuss your project', primary: true }, { label: 'Request proposal' }]}
        />

        <StickyAnchorNav items={navItems} />

        {/* Value pillars */}
        <section id="pillars" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Strategic pillars</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">A holistic framework that connects market, product and sales execution.</p>
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

        {/* Offerings */}
        <section id="offerings" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">What we do</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">End-to-end advisory and execution across the development cycle.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {offerings.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lifecycle */}
        <section id="lifecycle" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Development lifecycle</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Clarity at every stage from feasibility to handover.</p>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-teal-400 md:block" />
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
                {lifecycle.map((s, i) => (
                  <div key={i} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-lg font-bold text-white">{s.step}</div>
                    <h4 className="mb-1 text-base font-semibold text-gray-900">{s.title}</h4>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Go-to-market */}
        <section id="gotomarket" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-gray-900">Go-to-market engine</h2>
                <p className="mb-6 text-gray-600">We integrate brand, performance media and sales ops into one pipeline for predictable absorption.</p>
                <div className="space-y-3">
                  {['Brand platform & creative assets', 'Performance media & lead funnels', 'Broker network activation', 'Sales process design & CRM', 'Launch events & PR'].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <TrendingUp className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">From enquiry to exchange</h3>
                  <p className="text-gray-600">Operational dashboards, daily huddles and clear KPIs ensure momentum and accountability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured projects */}
        <section id="projects" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Featured projects</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Selected engagements demonstrating outcome-focused delivery.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((p, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <div className="p-6">
                    <div className="mb-1 text-sm text-blue-600">{p.type} • {p.metric}</div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{p.name}</h3>
                    <p className="text-gray-600">{p.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section id="credentials" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-gray-900">Team & credentials</h2>
                <p className="mb-6 text-gray-600">A multi-disciplinary team across research, brand, sales and project governance with regional experience.</p>
                <div className="space-y-3">
                  {['RICS & PMP certified leadership', 'In-house research & financial modelling', 'Brand and experience design partners', 'Seasoned sales operations team'].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Award className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Recognized delivery</h3>
                  <p className="text-gray-600">Consistent pre-sales performance, controlled CAC and robust governance across complex launches.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently asked questions</h2>
            <Collapse accordion items={faqs.map((f, i) => ({ key: String(i + 1), label: <span className="text-gray-900">{f.q}</span>, children: <p className="text-gray-600">{f.a}</p> }))} />
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 text-white scroll-mt-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">Ready to discuss?</div>
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Let's deliver your project</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Book a consultation to explore concept, feasibility and go-to-market paths.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="development-consultancy" variant="dark" fields={[
                  { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
                  { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your site and timelines' },
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
