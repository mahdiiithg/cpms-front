'use client';

import { Button, Card, Collapse } from 'antd';
import { Wrench, CheckCircle, Phone, Mail } from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
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

  const features = [
    'Preventive maintenance planning and scheduling',
    '24/7 emergency repair response and coordination',
    'Trusted vendor network with competitive pricing',
    'Common area maintenance & landscaping',
    'Safety inspections and regulatory compliance',
    'Digital work orders and status tracking',
  ];

  const services = [
    { title: 'HVAC & Electrical', desc: 'Certified specialists for heating, cooling, electrical faults and upgrades' },
    { title: 'Plumbing', desc: 'Leak detection, pipe repair, drainage and fixture replacement' },
    { title: 'Carpentry & Joinery', desc: 'Repairs, refurbishments and custom fit-outs' },
    { title: 'Painting & Finishes', desc: 'Rapid-turn painting, patching and cosmetic works' },
    { title: 'Landscaping', desc: 'Grounds keeping, irrigation and seasonal cleanups' },
    { title: 'Cleaning & Waste', desc: 'Common area and end-of-lease cleaning, waste management' },
    { title: 'Access & Fire Systems', desc: 'Access control, CCTV, fire alarm testing and maintenance' },
    { title: 'Pest Control', desc: 'Scheduled treatments and responsive interventions' },
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
    { href: '#overview', label: 'Overview' },
    { href: '#features', label: 'Core features' },
    { href: '#services', label: 'Service catalogue' },
    { href: '#process', label: 'Process' },
    { href: '#slas', label: 'SLAs' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Maintenance & Repair | Coast Planet</title>
        <meta name="description" content="Responsive maintenance and repair services to protect and enhance your assets." />
      </Head>
      <div className="min-h-screen bg-white">
        <HeroWithForm
          title="Maintenance & Repair"
          subtitle="Fast, reliable and transparent maintenance services—from preventive plans to 24/7 emergencies."
          formContext="maintenance-and-repair"
          ctas={[{ label: 'Request Service', primary: true }, { label: 'Emergency Callout' }]}
        />

        <StickyAnchorNav items={navItems} />

        {/* Stats band */}
        <section className="relative bg-gray-50 py-10">
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

        {/* Core features */}
        <section id="features" className="relative bg-white py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid className="h-full w-full" density={36} color="#eef2f7" accent="#1f2937" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100"><Wrench className="h-6 w-6 text-blue-700" /></div>
              <h2 className="text-3xl font-bold">Core Features</h2>
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

        {/* Service Catalogue */}
        <section id="services" className="relative bg-gray-50 py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid className="h-full w-full" density={44} color="#e5e7eb" accent="#0f172a" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <h3 className="mb-8 text-center text-2xl font-bold">Service Catalogue</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <Card key={i} className="border border-gray-200 shadow-sm">
                  <div className="p-6">
                    <h4 className="mb-1 text-lg font-semibold">{s.title}</h4>
                    <p className="text-gray-600">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
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

        {/* SLAs */}
        <section id="slas" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Service levels</h2>
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
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center gap-2"><Phone className="h-5 w-5" /><span>+1 (555) 123-4567</span></div>
                <div className="mb-4 flex items-center gap-2"><Mail className="h-5 w-5" /><span>services@coastplanet.com</span></div>
                <p className="text-gray-300">Prefer messaging? Use the List Your Property button in the header to contact us on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
