'use client';

import { useState } from 'react';
import { Button, Card, Collapse, Form, Input } from 'antd';
import {
  Building,
  Shield,
  Users,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  MapPin,
  Star,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';
import Head from 'next/head';
import HeroWithForm from '@/components/services/blocks/HeroWithForm';
import StickyAnchorNav from '@/components/services/layout/StickyAnchorNav';
import EnquiryForm from '@/components/services/forms/EnquiryForm';
import CanvasGrid from '@/components/ui/CanvasGrid';

export default function PropertyManagementPage() {
  const stats = [
    { label: 'Average occupancy', value: '96%' },
    { label: 'Avg. days to lease', value: '12' },
    { label: 'Units managed', value: '8,500+' },
    { label: 'Client satisfaction', value: '98%' },
  ];

  const landlordBenefits = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: 'Quality tenants, faster',
      desc: 'Targeted marketing and strict screening reduce vacancy and risk.',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: 'Compliance handled',
      desc: 'Up-to-date documentation, inspections and legal support.',
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: 'Proactive maintenance',
      desc: 'Preventive plans and rapid repairs protect asset value.',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: 'Optimized returns',
      desc: 'Smart pricing, renewals and expense control to maximize NOI.',
    },
  ];

  const servicesWeHandle = [
    'Marketing & professional photography',
    'Tenant screening & lease execution',
    'Rent collection & arrears management',
    'Inspections (move-in, routine, move-out)',
    'Maintenance coordination & vendor management',
    'Legal and regulatory compliance',
    'Detailed financial reporting & statements',
    'End-of-lease turnovers & make-readies',
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Onboarding',
      desc: 'Property assessment, pricing strategy, and documentation.',
    },
    {
      step: '02',
      title: 'Marketing & Viewings',
      desc: 'Launch listing, schedule viewings and qualify applicants.',
    },
    {
      step: '03',
      title: 'Screen & Lease',
      desc: 'Background checks, references and secure digital lease.',
    },
    {
      step: '04',
      title: 'Move-in & Handover',
      desc: 'Condition report, deposits and keys managed end-to-end.',
    },
    {
      step: '05',
      title: 'Manage & Maintain',
      desc: 'Rent collection, maintenance and tenant relations.',
    },
    {
      step: '06',
      title: 'Report & Renew',
      desc: 'Monthly statements, performance insights and renewals.',
    },
  ];

  const feePackages = [
    {
      name: 'Let Only',
      price: 'One-month rent',
      points: [
        'Marketing & viewings',
        'Tenant screening',
        'Lease preparation',
        'Move-in checklist',
      ],
    },
    {
      name: 'Full Management',
      price: '7% of rent',
      popular: true,
      points: [
        'Everything in Let Only',
        'Rent collection & statements',
        'Maintenance coordination',
        'Routine inspections',
      ],
    },
    {
      name: 'Premium Management',
      price: '10% of rent',
      points: [
        'Everything in Full',
        'Annual maintenance plan',
        'Priority repairs',
        'Dedicated manager',
      ],
    },
  ];

  const faqs = [
    {
      q: 'How do you determine the rental price?',
      a: 'We combine local comparables, demand trends, property condition and seasonality to recommend a data-backed price that optimizes occupancy and income.',
    },
    {
      q: "What if a tenant doesn't pay on time?",
      a: 'We apply clear payment policies, proactive reminders and structured arrears follow-up. Where required, we support legal processes per local regulations.',
    },
    {
      q: 'How are maintenance requests handled?',
      a: 'Tenants raise requests via our portal. We triage by priority, dispatch vetted vendors, and keep owners informed with quotes, photos and invoices.',
    },
    {
      q: 'Can I switch from my current manager?',
      a: 'Yes. We provide a seamless handover template to collect files, deposits and keys, minimizing disruption to your tenants.',
    },
  ];

  const [form] = Form.useForm();
  const onSubmit = (values) => {
    // Placeholder submission handler
    console.log('Property Management enquiry:', values);
    alert("Thanks! We'll be in touch shortly.");
    form.resetFields();
  };

  // Key Stats Section

  // Why Choose Us Section
  const whyChooseUs = [
    '96% average occupancy across managed portfolio',
    'Strict tenant screening and fast leasing',
    'Transparent fees, no hidden charges',
    'Dedicated property managers and support',
    'Real-time owner portal for statements and updates',
    'Comprehensive compliance and legal support',
  ];

  // Our Services Section
  const services = [
    'Marketing & professional photography',
    'Tenant screening & lease execution',
    'Rent collection & arrears management',
    'Inspections (move-in, routine, move-out)',
    'Maintenance coordination & vendor management',
    'Legal and regulatory compliance',
    'Detailed financial reporting & statements',
    'End-of-lease turnovers & make-readies',
  ];

  // How It Works Section

  // Fee Packages Section

  // Technology Section

  // Areas We Cover Section

  // Testimonials Section

  // FAQs Section

  // Navigation Items
  const navItems = [
    { href: '#hero', label: 'Overview' },
    { href: '#stats', label: 'Key Stats' },
    { href: '#whychooseus', label: 'Why Choose Us' },
    { href: '#services', label: 'Our Services' },
    { href: '#process', label: 'How It Works' },
    { href: '#fees', label: 'Fee Packages' },
    { href: '#tech', label: 'Technology' },
    { href: '#areas', label: 'Areas We Cover' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faqs', label: 'FAQs' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <>
      <Head>
        <title>Property Management | Coast Planet</title>
        <meta
          name="description"
          content="Turnkey property management for residential and commercial assets. Marketing, leasing, rent collection, maintenance and reporting—done right."
        />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Property Management
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
            Professional management for your residential or commercial property.
            Maximize returns, minimize hassle, and enjoy peace of mind.
          </p>
          <Button type="primary" size="large" href="#contact">
            Get a Free Appraisal
          </Button>
        </section>

        <StickyAnchorNav items={navItems} />

        {/* Key Stats Section */}
        <section id="stats" className="relative bg-gray-50 py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid
              className="h-full w-full"
              density={44}
              color="#e2e8f0"
              accent="#334155"
            />
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {s.value}
                </div>
                <div className="text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="whychooseus" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              Why Choose Us
            </h2>
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
        <section
          id="services"
          className="relative scroll-mt-24 bg-gray-50 py-16"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
            <CanvasGrid
              className="h-full w-full"
              density={44}
              color="#e5e7eb"
              accent="#0f172a"
            />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Everything you need to lease, manage and maintain your
                property—under one roof.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm"
                >
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-gray-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="scroll-mt-24 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                A clear, streamlined process that keeps you informed at every
                step.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-teal-400 md:block" />
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
                {processSteps.map((s, i) => (
                  <div key={i} className="relative text-center">
                    <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-lg font-bold text-white">
                      {s.step}
                    </div>
                    <h4 className="mb-1 text-base font-semibold text-gray-900">
                      {s.title}
                    </h4>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fee Packages Section */}
        <section id="fees" className="scroll-mt-24 bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">Fee Packages</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Flexible packages to suit your needs. No hidden charges.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {feePackages.map((pkg, idx) => (
                <Card
                  key={idx}
                  className={`border-2 ${pkg.popular ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'} shadow-sm`}
                >
                  <div className="p-6 text-center">
                    {pkg.popular && (
                      <div className="mb-4 inline-block rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                        Most Popular
                      </div>
                    )}
                    <h4 className="mb-2 text-xl font-bold">{pkg.name}</h4>
                    <div className="mb-4 text-2xl font-bold text-blue-600">
                      {pkg.price}
                    </div>
                    <div className="mx-auto mb-6 max-w-xs space-y-2 text-left">
                      {pkg.points.map((pt, pi) => (
                        <div key={pi} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                          <span className="text-gray-700">{pt}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="large"
                      type={pkg.popular ? 'primary' : 'default'}
                      className={pkg.popular ? 'border-0 bg-blue-600' : ''}
                    >
                      Choose {pkg.name}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="tech" className="scroll-mt-24 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="mb-3 text-3xl font-bold text-gray-900">
                  Owner & Tenant Portal
                </h2>
                <p className="mb-6 text-gray-600">
                  Real-time visibility into statements, work orders and tenancy
                  documents—all in one place.
                </p>
                <div className="space-y-3">
                  {[
                    'Online statements & payouts',
                    'Maintenance tracking & approvals',
                    'Secure document vault',
                    'Instant messaging & updates',
                  ].map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                    <Zap className="h-6 w-6 text-blue-700" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Technology that works for you
                  </h3>
                  <p className="text-gray-600">
                    Stay informed and in control without the admin burden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Cover Section */}
        <section id="areas" className="scroll-mt-24 bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Areas We Cover
            </h2>
            <p className="mb-6 max-w-2xl text-gray-600">
              We manage properties across key suburbs and communities. Get in
              touch to confirm coverage for your address.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                'Downtown',
                'Mid-City',
                'Beverly Hills',
                'Santa Monica',
                'Pasadena',
                'Westwood',
                'Hollywood',
                'Culver City',
              ].map((area) => (
                <div
                  key={area}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm"
                >
                  <MapPin className="mr-2 inline h-4 w-4 text-blue-600" />
                  {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="scroll-mt-24 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                What Our Clients Say
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                Trusted by owners and investors for responsive, results-driven
                management.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'Owner, Beverly Hills',
                  text: 'Professional, proactive and transparent. My vacancy times and maintenance costs are down.',
                },
                {
                  name: 'Michael Chen',
                  role: 'Developer, Downtown LA',
                  text: 'They set up our leasing program and kept the building at near-full occupancy through launch.',
                },
                {
                  name: 'Lisa Rodriguez',
                  role: 'Owner, Santa Monica',
                  text: 'Great communication and fast resolutions. The portal makes everything simple.',
                },
              ].map((t, i) => (
                <Card key={i} className="border-0 shadow-lg">
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-current text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-gray-700 italic">"{t.text}"</p>
                    <div className="border-t pt-3">
                      <div className="font-semibold text-gray-900">
                        {t.name}
                      </div>
                      <div className="text-sm text-gray-600">{t.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="scroll-mt-24 bg-gray-50 py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <Collapse
              accordion
              items={faqs.map((f, i) => ({
                key: String(i + 1),
                label: <span className="text-gray-900">{f.q}</span>,
                children: <p className="text-gray-600">{f.a}</p>,
              }))}
            />
          </div>
        </section>

        {/* Contact Us Section (Single Form) */}
        <section
          id="contact"
          className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 text-white"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold">
                Ready to get started?
              </div>
              <h3 className="mb-4 text-3xl font-bold md:text-5xl">
                Let's manage your property
              </h3>
              <p className="mx-auto max-w-2xl text-lg text-gray-300">
                Book a free consultation and discover how we can improve your
                returns while reducing hassle.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
                <EnquiryForm
                  context="property-management"
                  variant="dark"
                  fields={[
                    {
                      name: 'name',
                      label: 'Full name',
                      required: true,
                      type: 'input',
                      placeholder: 'Jane Doe',
                    },
                    {
                      name: 'email',
                      label: 'Email',
                      required: true,
                      type: 'email',
                      placeholder: 'you@example.com',
                    },
                    {
                      name: 'phone',
                      label: 'Phone',
                      type: 'input',
                      placeholder: '+1 555 123 4567',
                    },
                    {
                      name: 'message',
                      label: 'Message',
                      type: 'textarea',
                      rows: 4,
                      placeholder: 'Tell us about your property',
                    },
                  ]}
                />
                <div className="mt-6 text-center">
                  <Button
                    type="default"
                    href="https://wa.me/your-number"
                    target="_blank"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Contact via WhatsApp
                  </Button>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>services@coastplanet.com</span>
                </div>
                <p className="text-gray-300">
                  Prefer messaging? Use WhatsApp for a quick response.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
