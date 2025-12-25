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

      <div className="min-h-screen bg-[#171717]">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-20 text-center"
        >
          {/* Neon Balloons Background with Glass Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-1/4 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-[#ccff00]/20 to-[#ccff00]/5 blur-3xl"></div>
            <div className="absolute bottom-10 left-1/3 h-96 w-96 animate-float-delayed rounded-full bg-gradient-to-br from-blue-500/15 to-purple-500/10 blur-3xl"></div>
            <div className="absolute top-1/3 left-1/4 h-64 w-64 animate-pulse-slow rounded-full bg-gradient-to-br from-teal-500/15 to-cyan-500/10 blur-2xl"></div>
          </div>

          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/20 to-[#171717]/40 backdrop-blur-[1px]"></div>

          <div className="relative z-10">
            <div className="mb-6 inline-block animate-fade-in">
              <span className="rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-4 py-2 text-sm font-semibold text-[#ccff00]">
                PROFESSIONAL PROPERTY MANAGEMENT
              </span>
            </div>
            <h1 className="mb-4 animate-slide-up text-4xl font-bold text-white drop-shadow-[0_0_20px_rgba(204,255,0,0.3)] md:text-5xl">
              Property Management
            </h1>
            <p className="mx-auto mb-8 max-w-2xl animate-slide-up-delayed text-lg text-gray-300">
              Professional management for your residential or commercial property.
              Maximize returns, minimize hassle, and enjoy peace of mind.
            </p>
            <Button
              size="large"
              className="h-12 animate-fade-in-up rounded-xl border-0 bg-[#ccff00] px-8 text-base font-semibold text-[#171717] shadow-[0_0_20px_rgba(204,255,0,0.5)] transition-all duration-300 hover:scale-105 hover:bg-[#ccff00] hover:shadow-[0_0_30px_rgba(204,255,0,0.8)]"
              href="#contact"
            >
              Get a Free Appraisal
            </Button>
          </div>
        </section>

        <StickyAnchorNav items={navItems} />

        {/* Key Stats Section */}
        <section id="stats" className="relative bg-[#1a1a1a] py-10">
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
            <CanvasGrid
              className="h-full w-full"
              density={44}
              color="#ccff00"
              accent="#ccff00"
            />
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group animate-fade-in rounded-xl border border-gray-800 bg-[#212121] p-6 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#ccff00]/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-1 text-3xl font-bold text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.6)]">
                  {s.value}
                </div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="whychooseus" className="bg-[#171717] py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                Why Choose Us
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Why Choose Us
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-gray-300">
              {whyChooseUs.map((reason, i) => (
                <li key={i} className="flex items-center gap-3 animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#ccff00]" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Our Services Section */}
        <section
          id="services"
          className="relative scroll-mt-24 bg-[#1a1a1a] py-16"
        >
          {/* Neon Balloon */}
          <div className="pointer-events-none absolute top-1/4 right-10 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/10 blur-3xl"></div>
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
            <CanvasGrid
              className="h-full w-full"
              density={44}
              color="#ccff00"
              accent="#ccff00"
            />
          </div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                Our Services
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">Our Services</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-400">
                Everything you need to lease, manage and maintain your
                property—under one roof.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((f, i) => (
                <div
                  key={i}
                  className="group flex animate-fade-in items-start gap-3 rounded-lg border border-gray-800 bg-[#212121]/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[#ccff00]/30 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#ccff00]" />
                  <span className="text-gray-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="process" className="scroll-mt-24 bg-[#171717] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                How It Works
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">How It Works</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-400">
                A clear, streamlined process that keeps you informed at every
                step.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 bg-gradient-to-r from-[#ccff00]/50 to-teal-500/50 md:block" />
              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
                {processSteps.map((s, i) => (
                  <div key={i} className="group relative animate-fade-in text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="relative z-10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#ccff00] to-teal-500 text-lg font-bold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(204,255,0,0.6)]">
                      {s.step}
                    </div>
                    <h4 className="mb-1 text-base font-semibold text-white">
                      {s.title}
                    </h4>
                    <p className="text-sm text-gray-400">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Fee Packages Section */}
        <section id="fees" className="relative scroll-mt-24 bg-[#1a1a1a] py-16">
          {/* Neon Balloon */}
          <div className="pointer-events-none absolute bottom-1/4 left-10 h-80 w-80 animate-float-delayed rounded-full bg-gradient-to-br from-blue-500/15 to-teal-500/10 blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                Fee Packages
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">Fee Packages</h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-400">
                Flexible packages to suit your needs. No hidden charges.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {feePackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className={`animate-fade-in rounded-xl border-2 p-6 ${pkg.popular ? 'border-[#ccff00] bg-[#212121]/80 shadow-[0_0_30px_rgba(204,255,0,0.3)]' : 'border-gray-800 bg-[#212121]/60'} backdrop-blur-sm transition-all duration-300 hover:scale-105 ${!pkg.popular && 'hover:border-[#ccff00]/50'}`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-center">
                    {pkg.popular && (
                      <div className="mb-4 inline-block animate-pulse rounded-full bg-[#ccff00] px-3 py-1 text-xs font-semibold text-[#171717]">
                        Most Popular
                      </div>
                    )}
                    <h4 className="mb-2 text-xl font-bold text-white">{pkg.name}</h4>
                    <div className="mb-4 text-2xl font-bold text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.6)]">
                      {pkg.price}
                    </div>
                    <div className="mx-auto mb-6 max-w-xs space-y-2 text-left">
                      {pkg.points.map((pt, pi) => (
                        <div key={pi} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#ccff00]" />
                          <span className="text-gray-300">{pt}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      size="large"
                      className={pkg.popular ? 'h-12 w-full rounded-xl border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.5)] transition-all duration-300 hover:bg-[#ccff00] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]' : 'h-12 w-full rounded-xl border-2 border-[#ccff00] bg-transparent font-semibold text-[#ccff00] transition-all duration-300 hover:bg-[#ccff00] hover:text-[#171717]'}
                    >
                      Choose {pkg.name}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section id="tech" className="scroll-mt-24 bg-[#171717] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="animate-slide-in-left">
                <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                  Technology
                </span>
                <h2 className="mb-3 mt-3 text-3xl font-bold text-white">
                  Owner & Tenant Portal
                </h2>
                <p className="mb-6 text-gray-400">
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
                    <div key={i} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ccff00]" />
                      <span className="text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="animate-slide-in-right">
                <div className="rounded-2xl border border-gray-800 bg-[#212121]/60 p-8 text-center backdrop-blur-sm shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(204,255,0,0.2)]">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ccff00]/20">
                    <Zap className="h-6 w-6 text-[#ccff00]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Technology that works for you
                  </h3>
                  <p className="text-gray-400">
                    Stay informed and in control without the admin burden.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Areas We Cover Section */}
        <section id="areas" className="relative scroll-mt-24 bg-[#1a1a1a] py-16">
          {/* Neon Balloon */}
          <div className="pointer-events-none absolute top-10 right-1/3 h-64 w-64 animate-pulse-slow rounded-full bg-gradient-to-br from-pink-500/15 to-orange-500/10 blur-3xl"></div>
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                Coverage Areas
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Areas We Cover
              </h2>
            </div>
            <p className="mb-6 max-w-2xl text-gray-400">
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
              ].map((area, i) => (
                <div
                  key={area}
                  className="group animate-fade-in rounded-lg border border-gray-800 bg-[#212121]/60 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#ccff00]/30 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <MapPin className="mr-2 inline h-4 w-4 text-[#ccff00]" />
                  <span className="text-gray-300">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="scroll-mt-24 bg-[#171717] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                Testimonials
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                What Our Clients Say
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-400">
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
                <div
                  key={i}
                  className="animate-fade-in rounded-xl border-2 border-gray-800 bg-[#212121]/80 p-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#ccff00]/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-3 flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-current text-[#ccff00]"
                      />
                    ))}
                  </div>
                  <p className="mb-4 italic text-gray-300">"{t.text}"</p>
                  <div className="border-t border-gray-800 pt-3">
                    <div className="font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-sm text-gray-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="scroll-mt-24 bg-[#1a1a1a] py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#ccff00] drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">
                FAQs
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <Collapse
              accordion
              className="border-gray-800 bg-transparent"
              items={faqs.map((f, i) => ({
                key: String(i + 1),
                label: <span className="font-semibold text-white">{f.q}</span>,
                children: <p className="text-gray-400">{f.a}</p>,
                className: 'bg-[#212121]/60 border-gray-800 backdrop-blur-sm mb-2',
              }))}
            />
          </div>
        </section>

        {/* Contact Us Section (Single Form) */}
        <section
          id="contact"
          className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-16 text-white"
        >
          {/* Animated Neon Balloons */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-[#ccff00]/30 to-[#ccff00]/10 blur-3xl" />
            <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-float-delayed rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-72 w-72 animate-pulse-slow rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-3xl" />
          </div>

          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/20 to-[#171717]/40 backdrop-blur-[2px]"></div>

          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block animate-fade-in rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-5 py-2 text-sm font-semibold text-[#ccff00]">
                Ready to get started?
              </div>
              <h3 className="mb-4 animate-slide-up text-3xl font-bold drop-shadow-[0_0_20px_rgba(204,255,0,0.3)] md:text-5xl">
                Let's manage your property
              </h3>
              <p className="mx-auto animate-slide-up-delayed max-w-2xl text-lg text-gray-300">
                Book a free consultation and discover how we can improve your
                returns while reducing hassle.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="animate-fade-in rounded-2xl border border-gray-800 bg-[#212121]/40 p-6 backdrop-blur-lg">
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
                    className="h-12 rounded-xl border-2 border-[#ccff00] bg-transparent font-semibold text-[#ccff00] transition-all duration-300 hover:bg-[#ccff00] hover:text-[#171717]"
                    href="https://wa.me/your-number"
                    target="_blank"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Contact via WhatsApp
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in-delayed rounded-2xl border border-gray-800 bg-[#212121]/30 p-6 backdrop-blur-lg">
                <div className="mb-4 flex items-center gap-2 text-gray-300">
                  <Phone className="h-5 w-5 text-[#ccff00]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="mb-4 flex items-center gap-2 text-gray-300">
                  <Mail className="h-5 w-5 text-[#ccff00]" />
                  <span>services@coastplanet.com</span>
                </div>
                <p className="text-gray-400">
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
