'use client';

import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceContact from '@/components/services/shared/ServiceContact';

export default function PropertyMarketingLeasingPage() {
  const services = [
    'Professional photography, video and 3D tours',
    'Listings syndication and campaign management',
    'Landing pages and conversion-optimized funnels',
    'Lead qualification and booking coordination',
    'Showings and application processing',
    'Lease negotiation and execution',
    'Performance reporting and optimization',
  ];

  const navItems = [
    { href: '#overview', label: 'Overview' },
    { href: '#services', label: 'What we do' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <Head>
        <title>Property Marketing & Leasing | Coast Planet</title>
        <meta name="description" content="End-to-end marketing and leasing operations engineered for occupancy and ROI." />
      </Head>

      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="overview"
          badge="Property Marketing & Leasing"
          title="Full-Funnel Marketing Built for Occupancy"
          subtitle="End-to-end marketing and leasing operations from content to contracts—engineered for ROI."
          ctaLabel="Discuss Your Project"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceList
          id="services"
          title="What We Do"
          subtitle="A full-service team across content, media, leasing ops and reporting."
          services={services}
        />

        <ServiceContact
          id="contact"
          badge="Ready to discuss?"
          title="Let's fill your vacancies"
          subtitle="Book a consultation to align marketing, channels and leasing ops."
          formContext="property-marketing-leasing"
          formFields={[
            { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
            { name: 'message', label: 'Message', type: 'textarea', rows: 4, placeholder: 'Tell us about your portfolio and timelines' },
          ]}
        />
      </div>
    </>
  );
}
