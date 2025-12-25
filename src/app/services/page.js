'use client';

import { useState, useEffect } from 'react';
import { Button, Card, Tabs, Progress } from 'antd';
import {
  Home,
  Building,
  Settings,
  Users,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Clock,
  Award,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Quote,
  Target,
  Eye,
  Zap,
} from 'lucide-react';
import Head from 'next/head';
import { serviceCategories, clientTestimonials, processSteps, whyChooseUs } from '@/data/servicesData';

// SEO Metadata
const metadata = {
  title:
    'Comprehensive Property Services | Coast Planet - Management, Development & Consultancy',
  description:
    'All-inclusive property services including property management, development sales, building management, consultancy, and valuation. Professional solutions for property owners, landlords, tenants, and developers in Los Angeles.',
  keywords:
    'property management Los Angeles, real estate consultancy, property development services, building management, tenant services, landlord services, property valuation, maintenance services, Los Angeles real estate, property investment, estate management',
  openGraph: {
    title: 'Comprehensive Property Services | Coast Planet',
    description:
      'All-inclusive property services including property management, development sales, building management, consultancy, and valuation.',
    type: 'website',
    url: 'https://coastplanet.com/services',
    images: [
      {
        url: 'https://coastplanet.com/images/services-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Coast Planet Comprehensive Property Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprehensive Property Services | Coast Planet',
    description:
      'All-inclusive property services including property management, development sales, building management, consultancy, and valuation.',
    images: ['https://coastplanet.com/images/services-hero.jpg'],
  },
};

const ServicesPage = () => {
  const [activeService, setActiveService] = useState('property-management');
  const [stats, setStats] = useState({
    occupancyRate: 0,
    propertiesManaged: 0,
    clientSatisfaction: 0,
    yearsExperience: 0,
  });

  // Sync active tab with URL hash (e.g., /services#property-management)
  useEffect(() => {
    const applyHash = () => {
      const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
      if (hash) {
        setActiveService(hash);
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Scroll into view when activeService changes and matches current hash
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (hash && hash === activeService) {
      // Defer to ensure DOM has rendered
      requestAnimationFrame(() => {
        const el = document.getElementById(activeService);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }, [activeService]);

  useEffect(() => {
    // Animate stats on component mount
    const timer = setTimeout(() => {
      setStats({
        occupancyRate: 96,
        propertiesManaged: 8500,
        clientSatisfaction: 98,
        yearsExperience: 6,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <link rel="canonical" href="https://coastplanet.com/services" />
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Coast Planet Property Services',
            description:
              'Professional property management and real estate services in Los Angeles',
            url: 'https://coastplanet.com/services',
            telephone: '+1-555-123-4567',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Main Street',
              addressLocality: 'Los Angeles',
              addressRegion: 'CA',
              postalCode: '90210',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '34.0522',
              longitude: '-118.2437',
            },
            serviceArea: {
              '@type': 'City',
              name: 'Los Angeles',
            },
            services: [
              'Property Management',
              'Development Consultancy',
              'Building Management',
              'Property Valuation',
            ],
          })}      </script>
      </Head>
      <div className="min-h-screen bg-[#171717]">
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden bg-[#171717]">
          {/* Animated Neon Balloons */}
          <div className="pointer-events-none absolute left-[10%] top-[15%] h-[400px] w-[400px] animate-float rounded-full bg-[#ccff00]/20 blur-3xl" />
          <div className="pointer-events-none absolute right-[15%] top-[40%] h-[300px] w-[300px] animate-float-delayed rounded-full bg-[#ccff00]/15 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[20%] left-[30%] h-[350px] w-[350px] animate-pulse-slow rounded-full bg-[#ccff00]/10 blur-3xl" />

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a]/50 via-transparent to-[#212121]/50 backdrop-blur-sm" />

          {/* Hero Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto max-w-6xl px-6 text-center">
              <div className="mb-8 animate-fade-in">
                <div className="mb-8 inline-block rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-6 py-3 text-lg font-semibold text-[#ccff00] backdrop-blur-sm">
                  Professional Property Services
                </div>
              </div>
              <h1 className="mb-8 animate-slide-up text-6xl leading-tight font-bold text-white md:text-8xl">
                Your Property,
                <span className="block bg-gradient-to-r from-[#ccff00] to-[#9dff00] bg-clip-text text-transparent">
                  Our Expertise
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-4xl animate-slide-up-delayed text-2xl leading-relaxed font-light text-gray-300 md:text-3xl">
                Comprehensive property services designed to maximize your
                investment returns
              </p>
              <p className="mx-auto mb-12 max-w-3xl animate-fade-in-up text-xl leading-relaxed text-gray-400">
                From property management to development consultancy, we provide
                end-to-end solutions that protect and enhance your real estate
                investments.
              </p>
              <div className="flex flex-col justify-center gap-6 sm:flex-row animate-fade-in-up">
                <button className="h-16 transform rounded-2xl border-0 bg-[#ccff00] px-10 text-xl font-semibold text-[#171717] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(204,255,0,0.5)]">
                  <span className="mr-2">🏢</span>
                  Explore Our Services
                </button>
                <button className="h-16 transform rounded-2xl border border-[#ccff00]/30 bg-[#ccff00]/10 px-10 text-xl font-semibold text-[#ccff00] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#ccff00]/20">
                  <span className="mr-2">📞</span>
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-[#ccff00]">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm">Discover our services</p>
              <svg
                className="h-6 w-6 rotate-90 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-[#1a1a1a] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-block rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 px-6 py-3 text-sm font-semibold text-[#ccff00]">
                Why Choose Coast Planet
              </div>
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Excellence in Every Service
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                We combine local expertise with innovative technology to deliver
                exceptional results for property owners, tenants, and
                developers.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item, index) => (
                <div
                  key={index}
                  className="group transform rounded-2xl bg-[#212121]/60 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#212121] hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]"
                >
                  <div className="mb-6 text-[#ccff00] transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h3 className="mb-4 text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-[#171717] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Our Comprehensive Services
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                Choose from our full range of professional property services
                designed to meet every real estate need.
              </p>
            </div>

            {/* Service Category Tabs */}
            <div className="mb-12">
              <div className="flex flex-wrap justify-center gap-4">
                {serviceCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveService(category.id)}
                    className={`flex items-center space-x-3 rounded-2xl border-2 px-6 py-4 transition-all duration-300 ${
                      activeService === category.id
                        ? 'border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.2)]'
                        : 'border-[#333] bg-[#212121]/60 text-gray-400 hover:border-[#ccff00]/50 hover:text-[#ccff00]'
                    }`}
                  >
                    {category.icon}
                    <span className="font-semibold">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Service Details */}
            {serviceCategories.map(
              (category) =>
                activeService === category.id && (
                  <div
                    id={category.id}
                    key={category.id}
                    className="grid items-start gap-12 lg:grid-cols-2"
                  >
                    <div>
                      <h3 className="mb-6 text-3xl font-bold text-white">
                        {category.title}
                      </h3>
                      <p className="mb-8 text-lg leading-relaxed text-gray-400">
                        {category.description}
                      </p>

                      <h4 className="mb-4 text-xl font-semibold text-white">
                        Key Features:
                      </h4>
                      <div className="mb-8 space-y-3">
                        {category.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-[#ccff00]" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <button className="h-12 rounded-xl border-0 bg-[#ccff00] px-8 text-[#171717] font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                        Learn More About {category.title}
                      </button>
                    </div>

                    <div className="grid gap-6">
                      {category.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="rounded-2xl bg-[#212121]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-[#212121] hover:shadow-[0_0_20px_rgba(204,255,0,0.1)]"
                        >
                          <h5 className="mb-2 text-lg font-semibold text-white">
                            {benefit.title}
                          </h5>
                          <p className="text-gray-400">
                            {benefit.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-[#1a1a1a] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Our Process
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                A streamlined approach that ensures exceptional results from
                start to finish.
              </p>
            </div>

            <div className="relative">
              {/* Process Line */}
              <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 transform bg-gradient-to-r from-[#ccff00]/30 to-[#ccff00]/10 lg:block"></div>

              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative text-center group">
                    {/* Step Number */}
                    <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#ccff00] to-[#9dff00] text-xl font-bold text-[#171717] transition-transform duration-300 group-hover:scale-110">
                      {step.step}
                    </div>
                    <h4 className="mb-3 text-lg font-semibold text-white">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages Section */}
        <section className="bg-[#171717] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Service Packages
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                Choose the perfect package that fits your property needs and
                budget.
              </p>
            </div>

            {/* Service Packages */}
            {serviceCategories.map(
              (category) =>
                activeService === category.id &&
                category.packages && (
                  <div key={`${category.id}-packages`} className="mb-16">
                    <h3 className="mb-8 text-center text-2xl font-bold text-white">
                      {category.title} Packages
                    </h3>
                    <div className="grid gap-8 md:grid-cols-3">
                      {category.packages.map((pkg, index) => (
                        <div
                          key={index}
                          className={`group transform rounded-2xl bg-[#212121]/60 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
                            pkg.popular
                              ? 'border-2 border-[#ccff00] shadow-[0_0_30px_rgba(204,255,0,0.2)]'
                              : 'border border-[#333] hover:border-[#ccff00]/50'
                          }`}
                        >
                          {pkg.popular && (
                            <div className="mb-6 inline-block rounded-full bg-[#ccff00] px-4 py-2 text-sm font-semibold text-[#171717]">
                              Most Popular
                            </div>
                          )}
                          <h4 className="mb-4 text-2xl font-bold text-white">
                            {pkg.name}
                          </h4>
                          <div className="mb-6 text-3xl font-bold text-[#ccff00]">
                            {pkg.price}
                          </div>
                          <div className="mb-8 space-y-3">
                            {pkg.features.map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-center text-left"
                              >
                                <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-[#ccff00]" />
                                <span className="text-gray-300">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            className={`h-12 w-full rounded-xl font-semibold transition-all duration-300 ${
                              pkg.popular
                                ? 'bg-[#ccff00] text-[#171717] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]'
                                : 'border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00]/10'
                            }`}
                          >
                            Choose {pkg.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative bg-[#1a1a1a] py-20 overflow-hidden">
          {/* Background neon glow */}
          <div className="pointer-events-none absolute top-0 left-1/4 h-[300px] w-[300px] animate-pulse-slow rounded-full bg-[#ccff00]/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] animate-float rounded-full bg-[#ccff00]/5 blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Our Track Record
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                Numbers that speak to our expertise and commitment to
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div className="text-center group">
                <div className="mb-2 text-5xl font-bold text-[#ccff00] transition-transform duration-300 group-hover:scale-110">
                  <span className="tabular-nums">{stats.occupancyRate}%</span>
                </div>
                <div className="text-lg text-gray-300">Average Occupancy Rate</div>
                <Progress
                  percent={stats.occupancyRate}
                  showInfo={false}
                  strokeColor="#ccff00"
                  trailColor="rgba(204,255,0,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center group">
                <div className="mb-2 text-5xl font-bold text-[#ccff00] transition-transform duration-300 group-hover:scale-110">
                  <span className="tabular-nums">
                    {stats.propertiesManaged.toLocaleString()}+
                  </span>
                </div>
                <div className="text-lg text-gray-300">Properties Managed</div>
                <Progress
                  percent={95}
                  showInfo={false}
                  strokeColor="#ccff00"
                  trailColor="rgba(204,255,0,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center group">
                <div className="mb-2 text-5xl font-bold text-[#ccff00] transition-transform duration-300 group-hover:scale-110">
                  <span className="tabular-nums">
                    {stats.clientSatisfaction}%
                  </span>
                </div>
                <div className="text-lg text-gray-300">Client Satisfaction</div>
                <Progress
                  percent={stats.clientSatisfaction}
                  showInfo={false}
                  strokeColor="#ccff00"
                  trailColor="rgba(204,255,0,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center group">
                <div className="mb-2 text-5xl font-bold text-[#ccff00] transition-transform duration-300 group-hover:scale-110">
                  <span className="tabular-nums">{stats.yearsExperience}+</span>
                </div>
                <div className="text-lg text-gray-300">Years Experience</div>
                <Progress
                  percent={85}
                  showInfo={false}
                  strokeColor="#ccff00"
                  trailColor="rgba(204,255,0,0.1)"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="bg-[#171717] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                What Our Clients Say
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-400">
                Don&apos;t just take our word for it. Here&apos;s what property owners and
                developers say about our services.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {clientTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-[#212121]/60 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-[#212121] hover:shadow-[0_0_30px_rgba(204,255,0,0.1)]"
                >
                  <div className="mb-4 flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-[#ccff00]"
                      />
                    ))}
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-300 italic">
                    &ldquo;{testimonial.comment}&rdquo;
                  </p>
                  <div className="border-t border-[#333] pt-4">
                    <h5 className="font-semibold text-white">
                      {testimonial.name}
                    </h5>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-[#ccff00]">
                      {testimonial.property}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-[#1a1a1a] py-20">
          {/* Background Neon Balloons */}
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-[300px] w-[300px] animate-float rounded-full bg-[#ccff00]/10 blur-3xl" />
          <div className="pointer-events-none absolute right-[10%] bottom-[20%] h-[400px] w-[400px] animate-float-delayed rounded-full bg-[#ccff00]/15 blur-3xl" />
          <div className="pointer-events-none absolute left-[50%] top-[50%] h-[250px] w-[250px] animate-pulse-slow rounded-full bg-[#ccff00]/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <div className="mb-12">
              <div className="mb-6 inline-block rounded-full border border-[#ccff00]/30 bg-[#ccff00]/10 px-6 py-3 text-sm font-semibold text-[#ccff00] backdrop-blur-sm">
                Ready to Get Started?
              </div>
              <h3 className="mb-8 text-4xl leading-tight font-bold text-white md:text-6xl">
                Let&apos;s Maximize Your
                <span className="block bg-gradient-to-r from-[#ccff00] to-[#9dff00] bg-clip-text text-transparent">
                  Property Potential
                </span>
              </h3>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-400">
                Contact our expert team today for a free consultation and
                discover how our professional services can transform your
                property investment.
              </p>
            </div>

            <div className="mb-12 flex flex-col justify-center gap-6 sm:flex-row">
              <button className="h-16 transform rounded-2xl border-0 bg-gradient-to-r from-[#ccff00] to-[#9dff00] px-10 text-lg font-semibold text-[#171717] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(204,255,0,0.4)]">
                <span className="mr-2">📞</span>
                Schedule Free Consultation
              </button>
              <button className="h-16 transform rounded-2xl border border-[#ccff00]/30 bg-[#ccff00]/10 px-10 text-lg font-semibold text-[#ccff00] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-[#ccff00]/20">
                <span className="mr-2">💬</span>
                Get Quote
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-8 border-t border-[#333] pt-12 md:grid-cols-3">
              <div className="text-center group">
                <Phone className="mx-auto mb-3 h-8 w-8 text-[#ccff00] transition-transform duration-300 group-hover:scale-110" />
                <h4 className="mb-2 font-semibold text-white">Call Us</h4>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="text-center group">
                <Mail className="mx-auto mb-3 h-8 w-8 text-[#ccff00] transition-transform duration-300 group-hover:scale-110" />
                <h4 className="mb-2 font-semibold text-white">Email Us</h4>
                <p className="text-gray-400">services@coastplanet.com</p>
              </div>
              <div className="text-center group">
                <MapPin className="mx-auto mb-3 h-8 w-8 text-[#ccff00] transition-transform duration-300 group-hover:scale-110" />
                <h4 className="mb-2 font-semibold text-white">Visit Us</h4>
                <p className="text-gray-400">Los Angeles, California</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
