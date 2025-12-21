'use client';

import { Button, Card, Collapse } from 'antd';
import { Wrench, CheckCircle, Phone, Mail } from 'lucide-react';
import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function MaintenanceAndRepairPage() {
  const stats = [
    { label: 'Avg. emergency response', value: '< 2h' },
    { label: 'First-time fix rate', value: '85%' },
    { label: 'Vetted vendor partners', value: '120+' },
    { label: 'Jobs completed / month', value: '1,200+' },
  ];

  const whyChooseUs = [
    'Rapid emergency response—average <2 hours',
    'Vetted, insured and certified vendor network',
    'Transparent pricing and digital work order tracking',
    'Preventive maintenance plans to reduce costly repairs',
    '24/7 support for urgent issues',
    'Comprehensive coverage: residential, commercial, and common areas',
  ];

  const serviceList = [
    'HVAC & Electrical repairs',
    'Plumbing and leak detection',
    'Carpentry, painting & finishes',
    'Landscaping & grounds maintenance',
    'Cleaning & waste management',
    'Access control & fire systems',
    'Pest control',
    'Safety inspections & compliance',
  ];

  const processSteps = [
    { step: '01', title: 'Request', desc: 'Issue logged via portal, phone or email with photos.' },
    { step: '02', title: 'Triage', desc: 'Priority assessed; emergency vs. urgent vs. standard.' },
    { step: '03', title: 'Quote', desc: 'Estimate shared for approval when required.' },
    { step: '04', title: 'Dispatch', desc: 'Vetted vendor assigned with clear SLA.' },
    { step: '05', title: 'Repair', desc: 'Work completed, photo proof and updates provided.' },
    { step: '06', title: 'Closeout', desc: 'Invoice, report and warranty logged to portal.' },
  ];

  const slaTiers = [
    { name: 'Emergency', target: '< 2 hours', examples: ['Flooding / major leaks', 'Power outage', 'Life safety faults'] },
    { name: 'Urgent', target: 'Same day', examples: ['AC failure in summer', 'Blocked drains', 'Broken locks'] },
    { name: 'Standard', target: 'Next business day', examples: ['Cosmetic repairs', 'Minor fixtures', 'Non-critical requests'] },
  ];

  const faqs = [
    { q: 'How do I raise a maintenance request?', a: 'Use the portal to submit a ticket with photos and a description, or contact us by phone/email for emergencies.' },
    { q: 'Do you provide quotes before work?', a: 'Yes, for non-emergency works we provide an estimate for approval. Emergencies are stabilized first.' },
    { q: 'Are your vendors insured?', a: 'All partners are vetted for licenses, insurance, safety compliance and service quality.' },
    { q: 'Can you handle out-of-hours issues?', a: 'We operate a 24/7 on-call rota for critical incidents and building safety.' },
  ];

  const navItems = [
    { href: '#hero', label: 'Overview' },
    { href: '#stats', label: 'Key Stats' },
    { href: '#whychooseus', label: 'Why Choose Us' },
    { href: '#services', label: 'Our Services' },
    { href: '#process', label: 'How It Works' },
    { href: '#slas', label: 'Service Levels' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <Head>
        <title>Maintenance & Repair | Coast Planet</title>
        <meta name="description" content="Responsive maintenance and repair services to protect and enhance your assets." />
      </Head>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Maintenance & Repair</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">Fast, reliable and transparent maintenance services for homes, buildings and communities. Preventive plans, 24/7 emergency response, and expert repairs.</p>
          <Button type="primary" size="large" href="#contact">Request Service</Button>
        </section>

        <StickyAnchorNav items={navItems} />

        {/* Key Stats Section */}
        <section id="stats" className="relative bg-gray-50 py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid className="h-full w-full" density={44} color="#e2e8f0" accent="#334155" />
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mb-1 text-3xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="whychooseus" className="py-16 bg-white">
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

        {/* Our Services Section */}
        <section id="services" className="relative bg-gray-50 py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid className="h-full w-full" density={44} color="#e5e7eb" accent="#0f172a" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Comprehensive maintenance and repair solutions for every property type.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {serviceList.map((f, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Clear workflows and communication from request to resolution.</p>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-teal-400 md:block" />
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
                {processSteps.map((s, i) => (
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

        {/* Service Levels (SLAs) Section */}
        <section id="slas" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Service Levels</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Target response windows to match the urgency of each request.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {slaTiers.map((t, i) => (
                <Card key={i} className="border-2 border-gray-200 shadow-sm">
                  <div className="p-6">
                    <div className="mb-2 text-sm font-semibold text-blue-600">{t.name}</div>
                    <div className="mb-3 text-2xl font-bold text-gray-900">{t.target}</div>
                    <ul className="space-y-1 text-gray-700">
                      {t.examples.map((ex, j) => (
                        <li key={j} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />{ex}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <Collapse accordion items={faqs.map((f, i) => ({ key: String(i + 1), label: <span className="text-gray-900">{f.q}</span>, children: <p className="text-gray-600">{f.a}</p> }))} />
          </div>
        </section>

        {/* Contact Us Section (Single Form) */}
        <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 text-white scroll-mt-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">Need assistance?</div>
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Log a request or speak to us</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">We're on hand around the clock for urgent issues and planned works.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="maintenance-and-repair" variant="dark" fields={[
                  { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
                  { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
                  { name: 'message', label: 'Issue', type: 'textarea', rows: 4, placeholder: 'Describe the issue (include photos/links if available)' },
                ]} />
                <div className="mt-6 text-center">
                  <Button type="default" href="https://wa.me/your-number" target="_blank">Contact via WhatsApp</Button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center gap-2"><Phone className="h-5 w-5" /><span>+1 (555) 123-4567</span></div>
                <div className="mb-4 flex items-center gap-2"><Mail className="h-5 w-5" /><span>services@coastplanet.com</span></div>
                <p className="text-gray-300">Prefer messaging? Use WhatsApp for a quick response.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
