'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { Play, CheckCircle } from 'lucide-react';
import Head from 'next/head';

// SEO Metadata
const metadata = {
  title:
    'About Coast Planet - Our Story & Journey | Premier Property Management',
  description:
    "Discover Coast Planet's journey from a small startup to a leading property management company. Learn about our mission, values, and commitment to excellence since 2018.",
  keywords:
    'Coast Planet, property management, real estate, company history, about us, Los Angeles properties, sustainable housing',
  openGraph: {
    title: 'About Coast Planet - Our Story & Journey',
    description:
      "Discover Coast Planet's journey from a small startup to a leading property management company.",
    type: 'website',
    url: 'https://coastplanet.com/about',
    images: [
      {
        url: 'https://coastplanet.com/images/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Coast Planet Company Story',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Coast Planet - Our Story & Journey',
    description:
      "Discover Coast Planet's journey from a small startup to a leading property management company.",
    images: ['https://coastplanet.com/images/about-hero.jpg'],
  },
};

const timelineData = [
  {
    year: 2018,
    title: 'The Beginning',
    description:
      'Coast Planet was founded with a vision to transform property management and make beautiful homes accessible to everyone.',
    image: '/images/timeline/founding.jpg',
    details:
      'Starting from a small office in Los Angeles, Coast Planet set out to revolutionize how people find, rent, and buy properties. Our founder recognized the need for a more transparent, efficient, and customer-focused approach to real estate.',
  },
  {
    year: 2019,
    title: 'First Major Expansion',
    description:
      'Expanded operations to serve the greater Los Angeles metropolitan area with our innovative property management platform.',
    image: '/images/timeline/expansion.jpg',
    details:
      'With our proven model, we expanded across LA, establishing partnerships with property owners and building a network of trusted agents. This year marked our transition from startup to established company.',
  },
  {
    year: 2020,
    title: 'Digital Innovation',
    description:
      'Launched our comprehensive digital platform, making property search and management completely online.',
    image: '/images/timeline/digital.jpg',
    details:
      'The pandemic accelerated our digital transformation. We launched virtual tours, online property management tools, and a mobile-first platform that allowed clients to manage everything remotely.',
  },
  {
    year: 2021,
    title: 'Sustainability Initiative',
    description:
      'Introduced our comprehensive sustainability program focusing on eco-friendly properties and green building practices.',
    image: '/images/timeline/sustainability.jpg',
    details:
      'Recognizing our responsibility to the environment, we launched initiatives to promote sustainable properties, energy-efficient homes, and green building practices across our portfolio.',
  },
  {
    year: 2022,
    title: 'Technology Integration',
    description:
      'Integrated AI and smart home technologies to provide cutting-edge property solutions.',
    image: '/images/timeline/technology.jpg',
    details:
      'We embraced emerging technologies, incorporating AI for property matching, smart home integrations, and predictive analytics to better serve our clients and optimize property management.',
  },
  {
    year: 2023,
    title: 'Market Leadership',
    description:
      'Became one of the leading property management companies in California with over 10,000 satisfied clients.',
    image: '/images/timeline/leadership.jpg',
    details:
      'Through consistent growth and innovation, Coast Planet established itself as a market leader, serving thousands of clients and managing a diverse portfolio of premium properties.',
  },
  {
    year: 2024,
    title: 'Future Vision',
    description:
      'Continuing to innovate with new technologies and expanding our reach to serve more communities.',
    image: '/images/timeline/future.jpg',
    details:
      'Today, we continue to push boundaries with new technologies, sustainable practices, and a commitment to making exceptional properties accessible to everyone.',
  },
];

const AboutPage = () => {
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
        <link rel="canonical" href="https://coastplanet.com/about" />      </Head>
      <div className="min-h-screen bg-white">
        {/* Enhanced Hero Section */}
        <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-teal-700/90">
              {/* Animated background elements */}
              <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl"></div>
              <div
                className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl"
                style={{ animationDelay: '1s' }}
              ></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="text-center text-white">
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
                    <Play className="ml-1 h-10 w-10 text-white" />
                  </div>
                  <p className="text-xl font-medium opacity-80">
                    Watch our story unfold
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto max-w-5xl px-6 text-center text-white">
              <div className="mb-8">
                <div className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm">
                  Our Story Since 2018
                </div>
              </div>
              <h1 className="mb-8 text-6xl leading-tight font-bold md:text-8xl">
                The Coast Planet
                <span className="block bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Story
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-4xl text-2xl leading-relaxed font-light opacity-90 md:text-3xl">
                From a small office to transforming how people find their
                perfect home
              </p>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed opacity-80">
                It all began with a simple vision: making beautiful properties
                accessible to everyone through innovation, transparency, and
                exceptional service that exceeds expectations.
              </p>
              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Button
                  size="large"
                  className="h-16 transform rounded-2xl border-0 bg-white px-10 text-xl font-semibold text-blue-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50"
                >
                  <span className="mr-2">👥</span>
                  Meet Our Team
                </Button>
                <Button
                  size="large"
                  className="h-16 transform rounded-2xl border-white/30 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-900"
                >
                  <span className="mr-2">📖</span>
                  Read Our Story
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm opacity-80">Scroll to explore</p>
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
        </section>{' '}
        {/* Vertical Timeline */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-block rounded-full bg-blue-100 px-6 py-3 text-sm font-semibold text-blue-800">
                Our Journey
              </div>
              <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
                Our Journey Through Time
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                From humble beginnings to industry leadership - discover the
                milestones that shaped Coast Planet into the premier property
                management company we are today.
              </p>
            </div>

            <div className="relative">
              {/* Enhanced Vertical Line with Gradient */}
              <div className="absolute top-0 bottom-0 left-6 w-1 transform rounded-full bg-gradient-to-b from-blue-400 via-teal-400 to-blue-600 shadow-sm md:left-1/2 md:-translate-x-1"></div>

              {timelineData.map((item, index) => (
                <div key={item.year} className="relative mb-12 last:mb-0">
                  {/* Enhanced Timeline Point */}
                  <div className="absolute left-2 z-20 flex h-12 w-12 transform items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-xl md:left-1/2 md:-translate-x-1/2">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500"></div>
                  </div>

                  {/* Enhanced Content Cards */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 lg:w-5/12 ${index % 2 === 0 ? 'md:pr-12 lg:pr-16' : 'md:ml-auto md:pl-12 lg:pl-16'}`}
                  >
                    <div className="relative transform overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      {/* Background Pattern */}
                      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-24 w-24 rounded-full bg-gradient-to-br from-blue-50 to-teal-50 opacity-50"></div>

                      {/* Year Badge - Enhanced */}
                      <div className="mb-6 inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 text-base font-bold text-white shadow-lg">
                        <span className="mr-2">📅</span>
                        {item.year}
                      </div>

                      {/* Enhanced Image Placeholder */}
                      <div className="relative mb-6 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-teal-500/10">
                          <div className="text-center text-gray-600">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-lg">
                              <span className="text-xl font-bold text-blue-600">
                                {item.year}
                              </span>
                            </div>
                            <p className="text-base font-medium">
                              Milestone Achievement
                            </p>
                          </div>
                        </div>
                        {/* Subtle overlay pattern */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                      </div>

                      {/* Enhanced Content */}
                      <h3 className="mb-4 text-2xl leading-tight font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="mb-4 text-lg leading-relaxed font-medium text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-base leading-relaxed text-gray-700">
                        {item.details}
                      </p>
                      {/* Enhanced Timeline Direction Indicator */}
                      <div
                        className={`absolute top-8 hidden lg:block ${index % 2 === 0 ? '-right-3' : '-left-3'} h-0 w-0 ${index % 2 === 0 ? 'border-l-6 border-l-white' : 'border-r-6 border-r-white'} border-t-6 border-b-6 border-t-transparent border-b-transparent shadow-lg`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>{' '}
        {/* Enhanced Stats Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 py-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 h-72 w-72 -translate-y-1/2 rounded-full bg-white"></div>
            <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-y-1/2 rounded-full bg-white"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h3 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Coast Planet Today
              </h3>
              <p className="mx-auto max-w-3xl text-xl text-blue-100">
                Our journey in numbers - a testament to our commitment to
                excellence and client satisfaction
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: '10,000+',
                  label: 'Happy Clients',
                  icon: '👥',
                  description: 'Satisfied customers nationwide',
                },
                {
                  number: '5,000+',
                  label: 'Properties Managed',
                  icon: '🏢',
                  description: 'Premium properties in our portfolio',
                },
                {
                  number: '50+',
                  label: 'Expert Agents',
                  icon: '⭐',
                  description: 'Professional real estate specialists',
                },
                {
                  number: '6',
                  label: 'Years of Excellence',
                  icon: '🏆',
                  description: 'Building trust since 2018',
                },
              ].map((stat, index) => (
                <div key={index} className="group text-center">
                  <div className="transform rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                    <div className="mb-4 text-3xl">{stat.icon}</div>
                    <div className="mb-2 text-4xl font-bold text-white transition-transform duration-300 group-hover:scale-110 lg:text-5xl">
                      {stat.number}
                    </div>
                    <div className="mb-2 text-xl font-semibold text-blue-100">
                      {stat.label}
                    </div>
                    <div className="text-sm text-blue-200 opacity-80">
                      {stat.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Enhanced CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <div className="mb-12">
              <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                Join Our Community
              </div>
              <h3 className="mb-8 text-4xl leading-tight font-bold md:text-6xl">
                Ready to Be Part of
                <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Our Story?
                </span>
              </h3>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300">
                Join thousands of satisfied clients who have found their perfect
                home with Coast Planet. Experience the difference that comes
                with six years of excellence and innovation.
              </p>
            </div>

            <div className="mb-12 flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                size="large"
                type="primary"
                className="h-16 transform rounded-2xl border-0 bg-gradient-to-r from-blue-600 to-teal-600 px-10 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-teal-700"
              >
                <span className="mr-2">🏠</span>
                Explore Properties
              </Button>
              <Button
                size="large"
                className="h-16 transform rounded-2xl border-white/30 bg-white/10 px-10 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-900"
              >
                <span className="mr-2">💬</span>
                Contact Us
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12 md:grid-cols-4">
              {[
                { label: 'Trusted by 10,000+ clients', icon: '🌟' },
                { label: 'Award-winning service', icon: '🏆' },
                { label: '24/7 customer support', icon: '📞' },
                { label: 'Transparent pricing', icon: '💎' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2 text-2xl">{item.icon}</div>
                  <p className="text-sm text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
