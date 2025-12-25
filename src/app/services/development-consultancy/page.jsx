'use client';

import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceFeatures from '@/components/services/shared/ServiceFeatures';
import ServiceProcess from '@/components/services/shared/ServiceProcess';
import ServiceFAQ from '@/components/services/shared/ServiceFAQ';
import ServiceContact from '@/components/services/shared/ServiceContact';

export default function DevelopmentConsultancyPage() {
  const offerings = [
    'Feasibility studies & financial modelling',
    'Highest & best use assessments',
    'Unit mix, pricing bands & release strategy',
    'Brand development & creative direction',
    'Sales gallery and experience design',
    '360Â° marketing, PR & performance media',
    'Broker onboarding & channel management',
    'Sales operations, reports & compliance',
  ];

  const whyChooseUs = [
    'Proven track record in successful project launches',
    'Multi-disciplinary team with local and regional expertise',
    'Tailored solutions for every development stage',
    'Transparent governance and reporting',
    'Strong broker and partner network',
  ];

  const processSteps = [
    { step: '01', title: 'Define', desc: 'Site due diligence, market scan and feasibility.' },
    { step: '02', title: 'Design', desc: 'Product strategy, unit mix and brand brief.' },
    { step: '03', title: 'Prepare', desc: 'Pricing, phasing, legal docs and sales ops.' },
    { step: '04', title: 'Launch', desc: 'Campaign, events, PR and broker activation.' },
    { step: '05', title: 'Sell', desc: 'Lead management, conversion and reporting.' },
    { step: '06', title: 'Deliver', desc: 'Handover, snagging, and post-completion support.' },
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
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <Head>
        <title>Development Sales & Consultancy | Coast Planet</title>
        <meta name="description" content="End-to-end advisory from feasibility to launch: research, strategy, product, brand, and sales execution." />
      </Head>
      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="hero"
          badge="Development Consultancy"
          title="Strategic Advisory From Concept to Completion"
          subtitle="Market intelligence, strategy, product, brand, and sales execution for successful development projects."
          ctaLabel="Discuss Your Project"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceList
          id="services"
          title="Our Services"
          subtitle="Comprehensive development consultancy across all project phases."
          services={offerings}
        />

        <ServiceFeatures 
          id="whychooseus"
          title="Why Choose Us"
          subtitle="Proven expertise and tailored solutions for every development stage."
          features={whyChooseUs}
        />

        <ServiceProcess
          id="process"
          title="Development Lifecycle"
          subtitle="End-to-end support from site acquisition to post-completion."
          steps={processSteps}
        />

        <ServiceFAQ id="faqs" faqs={faqs} />

        <ServiceContact
          id="contact"
          badge="Ready to discuss?"
          title="Let's deliver your project"
          subtitle="Book a consultation to explore concept, feasibility and go-to-market paths."
          formContext="development-consultancy"
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
