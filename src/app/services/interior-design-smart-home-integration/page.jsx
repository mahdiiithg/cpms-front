'use client';

import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceContact from '@/components/services/shared/ServiceContact';

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
      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="overview"
          badge="Interior Design & Smart Home"
          title="Elegant Interiors & Intuitive Technology"
          subtitle="Cohesive interiors and seamless smart home experiences that elevate daily living."
          ctaLabel="Book a Design Consult"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceList
          id="features"
          title="What We Do"
          subtitle="From concept to commissioning, we craft spaces that work beautifully."
          services={features}
        />

        <ServiceContact
          id="contact"
          badge="Ready to discuss?"
          title="Let's design your space"
          subtitle="Book a consultation to explore interior concepts and smart home options."
          formContext="interior-design-smart-home-integration"
          formFields={[
            { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
            { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your space and timelines' },
          ]}
        />
      </div>
    </>
  );
}
