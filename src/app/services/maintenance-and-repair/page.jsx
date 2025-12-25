'use client';

import { Wrench } from 'lucide-react';
import Head from 'next/head';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import ServiceHero from '@/components/services/shared/ServiceHero';
import ServiceStats from '@/components/services/shared/ServiceStats';
import ServiceFeatures from '@/components/services/shared/ServiceFeatures';
import ServiceList from '@/components/services/shared/ServiceList';
import ServiceProcess from '@/components/services/shared/ServiceProcess';
import ServiceFAQ from '@/components/services/shared/ServiceFAQ';
import ServiceContact from '@/components/services/shared/ServiceContact';

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
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <Head>
        <title>Maintenance & Repair | Coast Planet</title>
        <meta name="description" content="Responsive maintenance and repair services to protect and enhance your assets." />
      </Head>
      <div className="min-h-screen bg-[#171717]">
        <ServiceHero
          id="hero"
          badge="Maintenance & Repair"
          title="Fast, Reliable & Transparent Maintenance Services"
          subtitle="24/7 emergency response, preventive plans, and expert repairs for homes, buildings and communities."
          ctaLabel="Request Service"
          ctaHref="#contact"
        />

        <StickyAnchorNav items={navItems} />

        <ServiceStats id="stats" stats={stats} />

        <ServiceFeatures 
          id="whychooseus"
          title="Why Choose Us"
          subtitle="Comprehensive maintenance solutions with rapid response times."
          features={whyChooseUs}
        />

        <ServiceList
          id="services"
          title="Our Services"
          subtitle="Comprehensive maintenance and repair solutions for every property type."
          services={serviceList}
        />

        <ServiceProcess
          id="process"
          title="How It Works"
          subtitle="Clear workflows and communication from request to resolution."
          steps={processSteps}
        />

        <ServiceFAQ id="faqs" faqs={faqs} />

        <ServiceContact
          id="contact"
          badge="Need assistance?"
          title="Log a request or speak to us"
          subtitle="We're on hand around the clock for urgent issues and planned works."
          formContext="maintenance-and-repair"
          formFields={[
            { name: 'name', label: 'Full name', required: true, type: 'input', placeholder: 'Jane Doe' },
            { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@example.com' },
            { name: 'message', label: 'Issue', type: 'textarea', rows: 4, placeholder: 'Describe the issue (include photos/links if available)' },
          ]}
          contactInfo={{
            phone: '+1 (555) 123-4567',
            email: 'services@coastplanet.com',
            message: 'Prefer messaging? Use WhatsApp for a quick response.'
          }}
        />
      </div>
    </>
  );
}
