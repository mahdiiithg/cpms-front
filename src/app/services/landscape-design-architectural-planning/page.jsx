'use client';

import { Button, Card, Collapse, Form, Input } from 'antd';
import { Trees, Ruler, Building2, Palette, CheckCircle, Phone, Mail } from 'lucide-react';
import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';

export default function LandscapeDesignPlanningPage() {
  const pillars = [
    { icon: <Trees className="h-6 w-6 text-blue-600" />, title: 'Place-making', desc: 'Spaces that connect communities and nature.' },
    { icon: <Palette className="h-6 w-6 text-blue-600" />, title: 'Aesthetics & function', desc: 'Beautiful, practical landscapes and public realms.' },
    { icon: <Ruler className="h-6 w-6 text-blue-600" />, title: 'Sustainability', desc: 'Water-wise, climate-adapted plant palettes and systems.' },
    { icon: <Building2 className="h-6 w-6 text-blue-600" />, title: 'Integration', desc: 'Landscape and architecture planned as one.' },
  ];

  const services = [
    'Master planning & urban realm design',
    'Concept, schematic & detailed landscape design',
    'Irrigation design and water management',
    'Hardscape details and material specifications',
    'Lighting concept and wayfinding',
    'Planting design and procurement support',
    'Construction documentation & supervision',
    'Authority coordination and approvals',
  ];

  const faqs = [
    { q: 'Do you handle approvals?', a: 'We prepare submission packages and coordinate with authorities for timely approvals.' },
    { q: 'Can you work with our architect?', a: 'Yes. We collaborate closely to align architecture and landscape early.' },
  ];

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    console.log('Landscape Design enquiry:', values);
    alert('Thanks! We\'ll be in touch shortly.');
    form.resetFields();
  };

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#pillars', label: 'Our pillars' },
    { href: '#services', label: 'What we do' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Landscape Design & Architectural Planning | Coast Planet</title>
        <meta name="description" content="Integrated landscape and architectural planning for cohesive, sustainable places." />
      </Head>

      <div className="min-h-screen bg-white">
        <section id="overview" className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 py-20 text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">Services</div>
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h1 className="mb-4 text-4xl font-bold md:text-6xl">Landscape Design & Architectural Planning</h1>
                <p className="mb-8 max-w-xl text-lg opacity-90">Cohesive planning that elevates experience, ecology and long-term value.</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#contact" className="h-12 rounded-xl px-6 font-semibold inline-flex items-center justify-center bg-white text-blue-900">Discuss your project</a>
                  <a href="#contact" className="h-12 rounded-xl px-6 font-semibold inline-flex items-center justify-center border border-white/40 bg-white/10 text-white backdrop-blur-sm">Request proposal</a>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-semibold">Project enquiry</h3>
                  <EnquiryForm context="landscape-design-architectural-planning" variant="dark" fields={[
                    { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
                    { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
                    { name: 'message', label: 'Brief', type: 'textarea', rows: 3, placeholder: 'Tell us about your site and goals' },
                  ]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <StickyAnchorNav items={navItems} />

        <section id="pillars" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Design pillars</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">We bring together landscape architecture and planning to create enduring places.</p>
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

        <section id="services" className="bg-gray-50 py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">What we do</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Planning, design and delivery support across all scales.</p>
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
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Let's plan your project</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Book a consultation to align architecture, landscape and approvals.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="landscape-design-architectural-planning" variant="dark" fields={[
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
