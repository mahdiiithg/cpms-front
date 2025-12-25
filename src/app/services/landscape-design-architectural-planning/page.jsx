'use client';

import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceFAQ from '@/components/services/shared/ServiceFAQ';
import ServiceContact from '@/components/services/shared/ServiceContact';

export default function LandscapeDesignPlanningPage() {
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

  const navItems = [
    { href: '#overview', label: 'Overview' },
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

      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="overview"
          badge="Landscape Design & Planning"
          title="Cohesive Planning That Elevates Experience"
          subtitle="Integrated landscape architecture and planning that connects communities, nature, and long-term value."
          ctaLabel="Discuss Your Project"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceList
          id="services"
          title="What We Do"
          subtitle="Planning, design and delivery support across all scales."
          services={services}
        />

        <ServiceFAQ id="faqs" faqs={faqs} />

        <ServiceContact
          id="contact"
          badge="Ready to discuss?"
          title="Let's plan your project"
          subtitle="Book a consultation to align architecture, landscape and approvals."
          formContext="landscape-design-architectural-planning"
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
