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

  const serviceCategories = [
    {
      id: 'property-management',
      title: 'Property Management',
      icon: <Building className="h-8 w-8" />,
      shortDescription:
        'Complete turnkey property management solutions for residential and commercial properties',
      description:
        'Coast Planet manages one of the largest portfolios of residential and commercial properties in Los Angeles, with over 8,500 units under management. We offer a turnkey service that covers property marketing and tenant screening right through to rent collection and maintenance – as well as ensuring you get the best market rate.',
      features: [
        'Professional tenant screening & placement with 96% success rate',
        'Automated rent collection & comprehensive financial reporting',
        'Proactive property maintenance & 24/7 emergency response',
        'Legal compliance support & documentation management',
        'Regular property inspections & detailed evaluations',
        'Advanced property management software & landlord portal',
      ],
      benefits: [
        {
          title: '96% Occupancy Rate',
          description:
            'We maintain industry-leading occupancy rates through strategic marketing and quality tenant placement',
          icon: <Target className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Expert Management Team',
          description:
            'Dedicated property managers with years of experience and local market expertise',
          icon: <Users className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Technology-Driven Solutions',
          description:
            'Advanced property management software with landlord portal for real-time access',
          icon: <Zap className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Comprehensive Service',
          description:
            'From marketing to maintenance, we handle every aspect of property management',
          icon: <Shield className="h-6 w-6 text-blue-600" />,
        },
      ],
      packages: [
        {
          name: 'Silver Package',
          price: '5% of rental income',
          features: [
            'Property listing & marketing',
            'Tenant screening & leasing',
            'Tenancy contract creation',
            'Move-in/out inspections',
            'Rental payment collection',
            'Basic reporting',
          ],
        },
        {
          name: 'Gold Package',
          price: '7% of rental income',
          features: [
            'All Silver Package features',
            'Maintenance coordination',
            'Utility bill management',
            'Service charge payments',
            'Enhanced reporting',
            'Priority support',
          ],
          popular: true,
        },
        {
          name: 'Platinum Package',
          price: '10% of rental income',
          features: [
            'All Gold Package features',
            'Annual maintenance package',
            'Unlimited emergency callouts',
            'Premium response times',
            'Quarterly inspections',
            'Dedicated property manager',
          ],
        },
      ],
    },
    {
      id: 'development-consultancy',
      title: 'Development Sales & Consultancy',
      icon: <TrendingUp className="h-8 w-8" />,
      shortDescription:
        'Expert guidance for property development projects from concept to completion',
      description:
        'Our in-house teams paired with market-leading external consultants allow us to devise tailored strategies to define, design, develop and deliver projects to market. Through our deep local knowledge of the Los Angeles real estate market, we advise our clients at every step of the development cycle.',
      features: [
        'Comprehensive market research & feasibility studies',
        'Project development strategy & planning consultation',
        'Regulatory compliance support & legal guidance',
        'Sales & marketing strategy development',
        'Brand partnership structuring & negotiations',
        'Project management & oversight services',
      ],
      benefits: [
        {
          title: 'Local Market Expertise',
          description:
            'Deep knowledge of Los Angeles real estate market trends and regulations',
          icon: <Eye className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'End-to-End Solutions',
          description:
            'Complete support from initial concept through to project completion and handover',
          icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Strategic Partnerships',
          description:
            'Access to leading consultants, contractors, and industry professionals',
          icon: <Users className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Proven Track Record',
          description:
            'Successful completion of numerous high-value development projects',
          icon: <Award className="h-6 w-6 text-blue-600" />,
        },
      ],
      packages: [
        {
          name: 'Promote Package',
          price: 'Custom Quote',
          features: [
            'Sales & marketing strategy',
            '360° marketing and PR',
            'Sales journey creation',
            'Sales experience center',
            'Launch events coordination',
            'External broker onboarding',
          ],
        },
        {
          name: 'Consult Package',
          price: 'Custom Quote',
          features: [
            'All Promote features',
            'SPA terms & documentation',
            'Branding & design guidance',
            'Product mix & pricing',
            'Amenity planning',
            'Brand partnership structuring',
          ],
          popular: true,
        },
        {
          name: 'Complete Package',
          price: 'Custom Quote',
          features: [
            'All Consult features',
            'Market research & analysis',
            'Investor introductions',
            'Feasibility studies',
            'Regulatory compliance',
            'Management & operations',
          ],
        },
      ],
    },
    {
      id: 'building-management',
      title: 'Building Management',
      icon: <Settings className="h-8 w-8" />,
      shortDescription:
        'Professional building management for commercial and residential complexes',
      description:
        'Whether you own a single property or have an extensive asset portfolio, you naturally want to maximize your return on investment. Our 50-strong team of residential and commercial property management professionals are your eyes and ears on the ground.',
      features: [
        'Comprehensive facility management & daily operations',
        'Common area maintenance & landscaping services',
        'Advanced security systems & access control',
        'Utilities management & cost optimization',
        'Vendor coordination & service management',
        'Emergency preparedness & response protocols',
      ],
      benefits: [
        {
          title: 'Operational Efficiency',
          description:
            'Optimized building operations that reduce overall costs and improve performance',
          icon: <Settings className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Safety & Compliance',
          description:
            'Comprehensive safety protocols with regular inspections and compliance monitoring',
          icon: <Shield className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Tenant Satisfaction',
          description:
            'High-quality service delivery that ensures tenant retention and satisfaction',
          icon: <Star className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Asset Protection',
          description:
            'Proactive maintenance strategies that protect and enhance property value',
          icon: <Building className="h-6 w-6 text-blue-600" />,
        },
      ],
      packages: [
        {
          name: 'Basic Management',
          price: '3-5% of gross income',
          features: [
            'Daily facility operations',
            'Basic maintenance coordination',
            'Vendor management',
            'Financial reporting',
            'Tenant communications',
            'Monthly inspections',
          ],
        },
        {
          name: 'Comprehensive Management',
          price: '5-8% of gross income',
          features: [
            'All Basic features',
            'Security system management',
            'Energy optimization',
            'Preventive maintenance',
            'Emergency response 24/7',
            'Quarterly planning reviews',
          ],
          popular: true,
        },
        {
          name: 'Premium Management',
          price: '8-12% of gross income',
          features: [
            'All Comprehensive features',
            'Dedicated building manager',
            'Advanced analytics',
            'Capital improvement planning',
            'Sustainability initiatives',
            'Premium tenant services',
          ],
        },
      ],
    },
    {
      id: 'additional-services',
      title: 'Additional Services',
      icon: <Star className="h-8 w-8" />,
      shortDescription:
        'Specialized property services to meet all your real estate needs',
      description:
        'Coast Planet offers a comprehensive range of additional services designed to provide complete real estate solutions. From property valuations to legal services, we ensure every aspect of your property needs is covered by experienced professionals.',
      features: [
        'Professional property valuation & appraisal services',
        'Comprehensive investment analysis & ROI reports',
        'Legal compliance support & documentation services',
        'Insurance coordination & risk management',
        'Property staging & interior design consultation',
        'Smart home technology integration services',
      ],
      benefits: [
        {
          title: 'One-Stop Solutions',
          description:
            'Complete property services under one roof for maximum convenience',
          icon: <CheckCircle className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Expert Network',
          description:
            'Access to specialized professionals across all property service areas',
          icon: <Users className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Value Optimization',
          description:
            'Services specifically designed to maximize your property investment value',
          icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
        },
        {
          title: 'Custom Solutions',
          description:
            'Tailored services to meet your specific property requirements',
          icon: <Settings className="h-6 w-6 text-blue-600" />,
        },
      ],
      packages: [
        {
          name: 'Valuation Services',
          price: '$500-2,000',
          features: [
            'Professional property appraisal',
            'Market analysis report',
            'Investment ROI calculation',
            'Comparative market analysis',
            'Digital property report',
            '48-hour turnaround',
          ],
        },
        {
          name: 'Legal & Compliance',
          price: 'Custom Quote',
          features: [
            'Document preparation',
            'Legal compliance audit',
            'Contract review services',
            'Regulatory guidance',
            'Dispute resolution support',
            'Ongoing legal consultation',
          ],
        },
        {
          name: 'Property Enhancement',
          price: 'Custom Quote',
          features: [
            'Interior design consultation',
            'Property staging services',
            'Smart home integration',
            'Energy efficiency upgrades',
            'Photography & marketing',
            'ROI improvement strategies',
          ],
          popular: true,
        },
      ],
    },
  ];
  const clientTestimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Property Owner',
      property: 'Beverly Hills Luxury Apartments',
      rating: 5,
      comment:
        'Coast Planet has managed my properties for over 3 years. Their professionalism and attention to detail is unmatched. My properties maintain 100% occupancy and rental income has increased by 25%.',
      image: '/api/placeholder/80/80',
    },
    {
      name: 'Michael Chen',
      role: 'Real Estate Developer',
      property: 'Downtown LA Mixed-Use Development',
      rating: 5,
      comment:
        'Their development consultancy services were invaluable for our LA project. From market analysis to sales strategy, they guided us through every step and helped us achieve 90% pre-sales before completion.',
      image: '/api/placeholder/80/80',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Commercial Building Owner',
      property: 'Santa Monica Office Complex',
      rating: 5,
      comment:
        'The building management team is exceptional. They handle everything from maintenance to tenant relations seamlessly. Our operating costs decreased by 15% while tenant satisfaction increased significantly.',
      image: '/api/placeholder/80/80',
    },
    {
      name: 'David Park',
      role: 'Investment Portfolio Manager',
      property: 'Multi-Property Portfolio',
      rating: 5,
      comment:
        'Coast Planet manages our entire 50-unit portfolio across LA. Their technology platform gives us real-time insights, and their proactive approach has maximized our ROI consistently.',
      image: '/api/placeholder/80/80',
    },
    {
      name: 'Jennifer Martinez',
      role: 'Luxury Villa Owner',
      property: 'Malibu Oceanfront Villa',
      rating: 5,
      comment:
        'From property staging to tenant screening, Coast Planet delivered exceptional service. They found premium tenants quickly and handle all maintenance issues promptly and professionally.',
      image: '/api/placeholder/80/80',
    },
    {
      name: 'Robert Kim',
      role: 'Commercial Developer',
      property: 'Pasadena Retail Center',
      rating: 5,
      comment:
        'Their development consultancy was crucial for our retail project success. They provided market insights, managed regulatory approvals, and delivered a comprehensive sales strategy that exceeded projections.',
      image: '/api/placeholder/80/80',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description:
        'We begin with a comprehensive consultation to understand your specific needs and property requirements.',
    },
    {
      step: '02',
      title: 'Property Assessment',
      description:
        'Our experts conduct a thorough assessment of your property to identify opportunities and challenges.',
    },
    {
      step: '03',
      title: 'Custom Strategy',
      description:
        "We develop a tailored strategy that aligns with your goals and maximizes your property's potential.",
    },
    {
      step: '04',
      title: 'Implementation',
      description:
        'Our professional team executes the strategy with precision, keeping you informed every step of the way.',
    },
    {
      step: '05',
      title: 'Ongoing Management',
      description:
        'We provide continuous monitoring and optimization to ensure sustained success and growth.',
    },
  ];

  const whyChooseUs = [
    {
      icon: <Award className="h-12 w-12 text-blue-600" />,
      title: 'Industry Expertise',
      description:
        'Over 6 years of experience in Los Angeles real estate market with proven track record of success.',
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: 'Trusted & Reliable',
      description:
        'Licensed and insured with transparent processes and comprehensive reporting for peace of mind.',
    },
    {
      icon: <Clock className="h-12 w-12 text-blue-600" />,
      title: '24/7 Support',
      description:
        'Round-the-clock availability for emergencies and dedicated support for all your property needs.',
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-blue-600" />,
      title: 'Technology-Driven',
      description:
        'Cutting-edge property management software and digital solutions for maximum efficiency.',
    },
  ];

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
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="relative h-full w-full bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-teal-700/90">
              <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl"></div>
              <div
                className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-white/5 blur-3xl"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="mx-auto max-w-6xl px-6 text-center text-white">
              <div className="mb-8">
                <div className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white backdrop-blur-sm">
                  Professional Property Services
                </div>
              </div>
              <h1 className="mb-8 text-6xl leading-tight font-bold md:text-8xl">
                Your Property,
                <span className="block bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
                  Our Expertise
                </span>
              </h1>
              <p className="mx-auto mb-8 max-w-4xl text-2xl leading-relaxed font-light opacity-90 md:text-3xl">
                Comprehensive property services designed to maximize your
                investment returns
              </p>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed opacity-80">
                From property management to development consultancy, we provide
                end-to-end solutions that protect and enhance your real estate
                investments.
              </p>
              <div className="flex flex-col justify-center gap-6 sm:flex-row">
                <Button
                  size="large"
                  className="h-16 transform rounded-2xl border-0 bg-white px-10 text-xl font-semibold text-blue-900 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-blue-50"
                >
                  <span className="mr-2">🏢</span>
                  Explore Our Services
                </Button>
                <Button
                  size="large"
                  className="h-16 transform rounded-2xl border-white/30 bg-white/10 px-10 text-xl font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-900"
                >
                  <span className="mr-2">📞</span>
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm opacity-80">Discover our services</p>
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
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-block rounded-full bg-blue-100 px-6 py-3 text-sm font-semibold text-blue-800">
                Why Choose Coast Planet
              </div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Excellence in Every Service
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                We combine local expertise with innovative technology to deliver
                exceptional results for property owners, tenants, and
                developers.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {whyChooseUs.map((item, index) => (
                <Card
                  key={index}
                  className="transform border-0 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="mb-6">{item.icon}</div>
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Our Comprehensive Services
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
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
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600'
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
                      <h3 className="mb-6 text-3xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                      <p className="mb-8 text-lg leading-relaxed text-gray-600">
                        {category.description}
                      </p>

                      <h4 className="mb-4 text-xl font-semibold text-gray-900">
                        Key Features:
                      </h4>
                      <div className="mb-8 space-y-3">
                        {category.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        size="large"
                        type="primary"
                        className="h-12 rounded-xl border-0 bg-blue-600 px-8"
                      >
                        Learn More About {category.title}
                      </Button>
                    </div>

                    <div className="grid gap-6">
                      {category.benefits.map((benefit, index) => (
                        <Card
                          key={index}
                          className="border border-gray-200 shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="p-6">
                            <h5 className="mb-2 text-lg font-semibold text-gray-900">
                              {benefit.title}
                            </h5>
                            <p className="text-gray-600">
                              {benefit.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Our Process
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                A streamlined approach that ensures exceptional results from
                start to finish.
              </p>
            </div>

            <div className="relative">
              {/* Process Line */}
              <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 transform bg-gradient-to-r from-blue-400 to-teal-400 lg:block"></div>

              <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative text-center">
                    {/* Step Number */}
                    <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-600 text-xl font-bold text-white">
                      {step.step}
                    </div>
                    <h4 className="mb-3 text-lg font-semibold text-gray-900">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages Section */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Service Packages
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
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
                    <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">
                      {category.title} Packages
                    </h3>
                    <div className="grid gap-8 md:grid-cols-3">
                      {category.packages.map((pkg, index) => (
                        <Card
                          key={index}
                          className={`transform border-2 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                            pkg.popular
                              ? 'border-blue-500 ring-4 ring-blue-100'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="p-8 text-center">
                            {pkg.popular && (
                              <div className="mb-6 inline-block rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
                                Most Popular
                              </div>
                            )}
                            <h4 className="mb-4 text-2xl font-bold text-gray-900">
                              {pkg.name}
                            </h4>
                            <div className="mb-6 text-3xl font-bold text-blue-600">
                              {pkg.price}
                            </div>
                            <div className="mb-8 space-y-3">
                              {pkg.features.map((feature, featureIndex) => (
                                <div
                                  key={featureIndex}
                                  className="flex items-center text-left"
                                >
                                  <CheckCircle className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                                  <span className="text-gray-700">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <Button
                              size="large"
                              type={pkg.popular ? 'primary' : 'default'}
                              className={`h-12 w-full rounded-xl font-semibold ${
                                pkg.popular ? 'border-0 bg-blue-600' : ''
                              }`}
                            >
                              Choose {pkg.name}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ),
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Our Track Record
              </h2>
              <p className="mx-auto max-w-3xl text-xl opacity-90">
                Numbers that speak to our expertise and commitment to
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold">
                  <span className="tabular-nums">{stats.occupancyRate}%</span>
                </div>
                <div className="text-lg opacity-90">Average Occupancy Rate</div>
                <Progress
                  percent={stats.occupancyRate}
                  showInfo={false}
                  strokeColor="rgba(255,255,255,0.3)"
                  trailColor="rgba(255,255,255,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold">
                  <span className="tabular-nums">
                    {stats.propertiesManaged.toLocaleString()}+
                  </span>
                </div>
                <div className="text-lg opacity-90">Properties Managed</div>
                <Progress
                  percent={95}
                  showInfo={false}
                  strokeColor="rgba(255,255,255,0.3)"
                  trailColor="rgba(255,255,255,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold">
                  <span className="tabular-nums">
                    {stats.clientSatisfaction}%
                  </span>
                </div>
                <div className="text-lg opacity-90">Client Satisfaction</div>
                <Progress
                  percent={stats.clientSatisfaction}
                  showInfo={false}
                  strokeColor="rgba(255,255,255,0.3)"
                  trailColor="rgba(255,255,255,0.1)"
                  className="mt-4"
                />
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold">
                  <span className="tabular-nums">{stats.yearsExperience}+</span>
                </div>
                <div className="text-lg opacity-90">Years Experience</div>
                <Progress
                  percent={85}
                  showInfo={false}
                  strokeColor="rgba(255,255,255,0.3)"
                  trailColor="rgba(255,255,255,0.1)"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                What Our Clients Say
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Don't just take our word for it. Here's what property owners and
                developers say about our services.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {clientTestimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="mb-4 flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-current text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mb-6 leading-relaxed text-gray-700 italic">
                      "{testimonial.comment}"
                    </p>
                    <div className="border-t pt-4">
                      <h5 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-blue-600">
                        {testimonial.property}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-teal-500 blur-3xl"></div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
            <div className="mb-12">
              <div className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm">
                Ready to Get Started?
              </div>
              <h3 className="mb-8 text-4xl leading-tight font-bold md:text-6xl">
                Let's Maximize Your
                <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                  Property Potential
                </span>
              </h3>
              <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300">
                Contact our expert team today for a free consultation and
                discover how our professional services can transform your
                property investment.
              </p>
            </div>

            <div className="mb-12 flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                size="large"
                type="primary"
                className="h-16 transform rounded-2xl border-0 bg-gradient-to-r from-blue-600 to-teal-600 px-10 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-teal-700"
              >
                <span className="mr-2">📞</span>
                Schedule Free Consultation
              </Button>
              <Button
                size="large"
                className="h-16 transform rounded-2xl border-white/30 bg-white/10 px-10 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-gray-900"
              >
                <span className="mr-2">💬</span>
                Get Quote
              </Button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
              <div className="text-center">
                <Phone className="mx-auto mb-3 h-8 w-8 text-blue-400" />
                <h4 className="mb-2 font-semibold">Call Us</h4>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <Mail className="mx-auto mb-3 h-8 w-8 text-blue-400" />
                <h4 className="mb-2 font-semibold">Email Us</h4>
                <p className="text-gray-400">services@coastplanet.com</p>
              </div>
              <div className="text-center">
                <MapPin className="mx-auto mb-3 h-8 w-8 text-blue-400" />
                <h4 className="mb-2 font-semibold">Visit Us</h4>
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
