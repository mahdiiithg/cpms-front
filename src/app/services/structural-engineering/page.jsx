'use client';

import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceProcess from '@/components/services/shared/ServiceProcess';
import ServiceFAQ from '@/components/services/shared/ServiceFAQ';
import ServiceContact from '@/components/services/shared/ServiceContact';

export default function StructuralEngineeringPage() {
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

  const navItems = [
    { href: '#overview', label: 'Overview' },
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

      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="overview"
          badge="Structural Engineering"
          title="Performance-Led Structural Solutions"
          subtitle="Efficient, buildable and compliant structural designs that balance safety, cost and constructability."
          ctaLabel="Discuss Your Project"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceList
          id="services"
          title="What We Do"
          subtitle="Technical expertise across buildings and infrastructure."
          services={services}
        />

        <ServiceProcess
          id="process"
          title="How It Works"
          subtitle="Clear stages with iterative coordination to de-risk delivery."
          steps={process}
        />

        <ServiceFAQ id="faqs" faqs={faqs} />

        <ServiceContact
          id="contact"
          badge="Ready to discuss?"
          title="Let's engineer your project"
          subtitle="Book a consultation to explore structural options and delivery paths."
          formContext="structural-engineering"
          formFields={[
            { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
            { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your site and timelines' },
          ]}
        />
      </div>
    </>
  );
}
