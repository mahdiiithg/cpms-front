'use client';

import { useState } from 'react';
import { Button, Card, Collapse, Form, Input } from 'antd';
import { TrendingUp, Users, Eye, Award, CheckCircle, ArrowRight, Target, Layers, Briefcase } from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

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
    { href: '#hero', label: 'Overview' },
    { href: '#services', label: 'Our Services' },
    { href: '#whychooseus', label: 'Why Choose Us' },
    { href: '#process', label: 'Our Process' },
    { href: '#projects', label: 'Featured Projects' },
    { href: '#team', label: 'Meet the Team' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact Us' },
  ];

  const services = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: 'Market Intelligence',
      desc: 'Comprehensive market research, feasibility studies, and pricing strategies.'
    },
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: 'Positioning & Strategy',
      desc: 'Brand development, go-to-market planning, and sales acceleration.'
    },
    {
      icon: <Layers className="h-6 w-6 text-blue-600" />,
      title: 'Product & Design',
      desc: 'Optimized layouts, amenities, and specification for maximum ROI.'
    },
    {
      icon: <Briefcase className="h-6 w-6 text-blue-600" />,
      title: 'Delivery & Governance',
      desc: 'Project oversight, sales operations, and performance control.'
    },
  ];

  const whyChooseUs = [
    'Proven track record in successful project launches',
    'Multi-disciplinary team with local and regional expertise',
    'Tailored solutions for every development stage',
    'Transparent governance and reporting',
    'Strong broker and partner network',
  ];

  const processSteps = [
    { step: '01', title: 'Consult', desc: 'Initial assessment, site due diligence, and market scan.' },
    { step: '02', title: 'Strategize', desc: 'Define product, brand, and go-to-market plan.' },
    { step: '03', title: 'Execute', desc: 'Pricing, phasing, legal docs, and sales operations.' },
    { step: '04', title: 'Launch', desc: 'Campaigns, events, PR, and broker activation.' },
    { step: '05', title: 'Sell', desc: 'Lead management, conversion, and reporting.' },
    { step: '06', title: 'Deliver', desc: 'Handover, snagging, and post-completion support.' },
  ];

  const team = [
    { name: 'John Smith', role: 'Head of Consultancy', desc: 'RICS & PMP certified, 15+ years in development advisory.' },
    { name: 'Sarah Lee', role: 'Lead Analyst', desc: 'Expert in market research and financial modelling.' },
    { name: 'Michael Tan', role: 'Brand Strategist', desc: 'Specialist in creative direction and brand development.' },
  ];

  return (
    <>
      <Head>
        <title>Development Sales & Consultancy | Coast Planet</title>
        <meta name="description" content="End-to-end advisory from feasibility to launch: research, strategy, product, brand, and sales execution." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Development Sales & Consultancy</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">End-to-end advisory for developers: market intelligence, strategy, product, brand, and sales execution. Delivering results from concept to completion.</p>
          <Button type="primary" size="large" href="#contact">Discuss Your Project</Button>
        </section>

        <StickyAnchorNav items={navItems} />

        {/* Our Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">Our Services</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="mb-3">{s.icon}</div>
                    <h3 className="mb-1 text-lg font-semibold">{s.title}</h3>
                    <p className="text-gray-600">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="whychooseus" className="py-16 bg-gray-50">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">Why Choose Us</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              {whyChooseUs.map((reason, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Process Section */}
        <section id="process" className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">Our Process</h2>
            <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
              {processSteps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-lg font-bold text-white">{step.step}</div>
                  <h4 className="mb-1 text-base font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">Featured Projects</h2>
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

        {/* Meet the Team Section */}
        <section id="team" className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-8 text-3xl font-bold text-gray-900 text-center">Meet the Team</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {team.map((member, i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6 text-center">
                    <h3 className="mb-1 text-lg font-semibold text-blue-700">{member.name}</h3>
                    <div className="mb-2 text-sm text-gray-500">{member.role}</div>
                    <p className="text-gray-600">{member.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="py-16 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">Frequently Asked Questions</h2>
            <Collapse accordion items={faqs.map((f, i) => ({ key: String(i + 1), label: <span className="text-gray-900">{f.q}</span>, children: <p className="text-gray-600">{f.a}</p> }))} />
          </div>
        </section>

        {/* Contact Us Section (Single Form) */}
        <section id="contact" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 text-white scroll-mt-24">
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
                <div className="mt-6 text-center">
                  <Button type="default" href="https://wa.me/your-number" target="_blank" icon={<ArrowRight className="h-4 w-4" />}>Contact via WhatsApp</Button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-gray-300">Prefer messaging? Use WhatsApp for a quick response.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
