'use client';

import { Button, Card, Collapse, Form, Input } from 'antd';
import { Building, Layers, Shield, Ruler, CheckCircle, Hammer, Phone, Mail } from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function StructuralEngineeringPage() {
  const pillars = [
    { icon: <Shield className="h-6 w-6 text-blue-600" />, title: 'Safety & compliance', desc: 'Designs that meet code with robust factors of safety.' },
    { icon: <Layers className="h-6 w-6 text-blue-600" />, title: 'Efficient systems', desc: 'Material-optimal frames, foundations and connections.' },
    { icon: <Ruler className="h-6 w-6 text-blue-600" />, title: 'Precision & QA', desc: 'Detailed calculations, peer review and QA processes.' },
    { icon: <Building className="h-6 w-6 text-blue-600" />, title: 'Buildability', desc: 'Constructible details aligned to programme and cost.' },
  ];

  const services = [
    'Concept and schematic structural design',
    'Advanced analysis and load modelling',
    'Reinforced concrete and post-tension design',
    'Steelwork design and connection detailing',
    'Shallow/deep foundations and ground improvement',
    'Seismic/wind design and retrofit',
    'Temporary works and construction staging',
    'Shop drawings review and site inspections',
  ];

  const process = [
    { step: '01', title: 'Brief & site review', desc: 'Understand constraints, soils and architectural intent.' },
    { step: '02', title: 'Scheme options', desc: 'Compare systems for cost, speed and sustainability.' },
    { step: '03', title: 'Analysis & design', desc: 'Finite element analysis, code checks and detailing.' },
    { step: '04', title: 'Documentation', desc: 'Issue drawings/specs and coordinate with disciplines.' },
    { step: '05', title: 'Construction support', desc: 'RFIs, shop reviews and site inspections.' },
  ];

  const faqs = [
    { q: 'Can you value-engineer an existing design?', a: 'Yes. We review loads, spans and member sizes to optimize materials while maintaining performance.' },
    { q: 'Do you provide site inspections?', a: 'We perform hold-point inspections and issue reports for compliance and as-built handover.' },
  ];

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    console.log('Structural Engineering enquiry:', values);
    alert('Thanks! We\'ll be in touch shortly.');
    form.resetFields();
  };

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#pillars', label: 'Our pillars' },
    { href: '#services', label: 'What we do' },
    { href: '#process', label: 'Process' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Structural Engineering | Coast Planet</title>
        <meta name="description" content="Efficient, buildable and compliant structural designs backed by rigorous analysis and QA." />
      </Head>

      <div className="min-h-screen bg-white">
        <HeroWithForm
          title="Structural Engineering"
          subtitle="Performance-led structural solutions that balance safety, cost and constructability."
          formContext="structural-engineering"
          ctas={[{ label: 'Discuss your project', primary: true, href: '#contact' }, { label: 'Request proposal', href: '#contact' }]}
        />

        <StickyAnchorNav items={navItems} />

        <section id="pillars" className="relative bg-white py-16 scroll-mt-24">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
            <CanvasGrid className="h-full w-full" density={36} color="#e2e8f0" accent="#334155" />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Engineering pillars</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">A methodology that prioritizes safety, efficiency and buildability.</p>
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
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Technical expertise across buildings and infrastructure.</p>
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

        <section id="process" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">Clear stages with iterative coordination to de-risk delivery.</p>
            </div>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-teal-400 md:block" />
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                {process.map((s, i) => (
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

        <section id="faqs" className="bg-white py-16 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Frequently asked questions</h2>
            <Collapse accordion items={faqs.map((f, i) => ({ key: String(i + 1), label: <span className="text-gray-900">{f.q}</span>, children: <p className="text-gray-600">{f.a}</p> }))} />
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
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">Let's engineer your project</h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">Book a consultation to explore structural options and delivery paths.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm context="structural-engineering" variant="dark" fields={[
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
