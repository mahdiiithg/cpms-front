'use client';

import { useState, useEffect } from 'react';
import { Button, Input, Card, Row, Col, Statistic, Form, Select } from 'antd';
import { 
  Search, 
  MapPin, 
  Star, 
  Shield, 
  Users, 
  Globe, 
  Phone, 
  Mail,
  ChevronRight,
  ChevronLeft,
  Home,
  Waves,
  Sun,
  Heart,
  Award,
  CheckCircle,
  Play,
  Download,
  ArrowRight,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';

const { Option } = Select;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { ensureAuth } = useRequireAuth();

  const handleNewClientEnquiry = () => {
    if (!ensureAuth('Please login or create an account to submit your enquiry.')) return;
    // Handle enquiry submission logic here
    // Could open a contact form or redirect to enquiry page
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const testimonials = [
    {
      name: "Mohamed Abu Ghazaleh",
      role: "Owner, Oceanfront Tower, Miami",
      text: "Coast Planet has managed Oceanfront Tower since 2010, and I'm very happy with their service. With 216 apartments, managing this building isn't easy, but they handle everything seamlessly—from leasing to maintenance. Their structured processes, proactive solutions, and commitment to tenant satisfaction keep the building well-run, ensuring smooth operations and high occupancy. Coast Planet has been a trusted partner, and I am proud to have them as our property manager. I look forward to continuing our successful relationship.",
      rating: 5
    },
    {
      name: "Rashid H.R",
      role: "Co-owner, Coastal Villas, Malibu",
      text: "Coast Planet has been a trusted partner for our company as a property owner, especially during challenging times. From the design phase of Coastal Villas to managing the defect liability period (DLP) and tenant needs, their team has handled everything smoothly. They've kept our property well-maintained, our tenants happy, and our rental income growing. Their dedication and professionalism have given us true peace of mind—we couldn't be happier with their service. I would highly recommend Coast Planet to anyone looking for a reliable, top-tier property management team.",
      rating: 5
    },
    {
      name: "Sarah Martinez",
      role: "Property Investor, Palm Beach",
      text: "Working with Coast Planet for the past 3 years has been exceptional. Their attention to detail and proactive approach to property management has increased my rental income by 25%. They handle everything from tenant screening to emergency repairs, allowing me to focus on expanding my portfolio. The monthly reports are comprehensive and the online portal makes tracking everything so easy.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Owner, Seaside Condominiums, San Diego",
      text: "Coast Planet transformed how I manage my properties. Before working with them, I was constantly dealing with tenant issues and maintenance headaches. Now, everything runs smoothly. Their team is professional, responsive, and truly cares about maximizing property value. The peace of mind they provide is worth every penny.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Real Estate Developer, Newport Beach",
      text: "As a developer, I need property management partners who understand the luxury market. Coast Planet exceeds expectations in every aspect - from marketing high-end properties to maintaining premium standards. Their tenant retention rate is impressive and they consistently achieve above-market rents for our properties.",
      rating: 5
    },
    {
      name: "James Rodriguez",
      role: "Portfolio Manager, Laguna Beach Properties",
      text: "Coast Planet has been managing our 50-unit portfolio for 2 years now. Their technology platform is outstanding, providing real-time insights into property performance. The team is always available and their maintenance network is top-notch. Our occupancy rates have never been higher.",
      rating: 5
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const whyChooseFeatures = [
    {
      icon: <TrendingUp className="h-6 w-6 text-[#ccff00]" />,
      title: "Optimised occupancy",
      description: "With occupancy rates averaging 96%, we attract high-quality tenants to your property."
    },
    {
      icon: <Award className="h-6 w-6 text-[#ccff00]" />,
      title: "Trusted name",
      description: "A highly regarded, award winning company in business for almost 40 years, we have an impeccable track record in coastal real estate management."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-[#ccff00]" />,
      title: "Quality guaranteed",
      description: "Our dedicated property managers are committed to service excellence, and our extensive network of contract partners have all been personally vetted."
    },
    {
      icon: <Shield className="h-6 w-6 text-[#ccff00]" />,
      title: "Unparalleled accountability",
      description: "We promise to keep you in the loop with detailed quarterly or time-specified reports all part of the service, wherever you are in the world."
    },
    {
      icon: <Heart className="h-6 w-6 text-[#ccff00]" />,
      title: "Happy tenants",
      description: "Well maintained and professionally managed properties attract and retain happy tenants, which means reduced vacant periods between tenancies."
    }
  ];

  

  const faqData = [
    {
      question: "What services do you offer and how much does it cost?",
      answer: "We offer full-service management. This can include marketing and leasing, tenant screening, documentation, accounting and reporting, inspection and maintenance, and handling disputes. Depending on the package, the cost ranges from 5-10% of the total lease value. We can also tailor-make a package to suit your requirements."
    },
    {
      question: "Why do I need property management?",
      answer: "Property management takes the weight off your shoulders. We act as a point of contact for tenants, handling payment collection, repairs and maintenance, not to mention the paperwork involved. This is especially helpful if you do not have previous property experience or have a busy schedule."
    },
    {
      question: "What does your tenant screening entail?",
      answer: "We verify a tenant's work-related details and collect valid proof of identification, including passport, visa, and ID copies. If required, we may request supporting documents, e.g. salary certificate."
    },
    {
      question: "How do property inspections work?",
      answer: "For single units, we conduct check-in and check-out inspections. We also conduct a routine inspection upon lease renewal. In the case of building management, we conduct quarterly fire audits and building inspections, and detailed annual inspections with repair and upgrade recommendations."
    },
    {
      question: "What happens when a tenant vacates a property?",
      answer: "When a tenant vacates a property, we carry out end-of-lease evaluations. If any repairs are required, we will share a report with both parties to determine who will bear the costs. Once this is settled, repair and maintenance work is initiated followed by property remarketing."
    }
  ];

  const clientLogos = [
    "https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg",
    "https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg",
    "https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg",
    "https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
  ];

  return (    <div className="min-h-screen bg-[#171717]">
      {/* Breadcrumb */}
      <div className="bg-[#1a1a1a] py-2 sm:py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
            <a href="/" className="hover:text-[#ccff00] transition-colors">Home</a>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[#ccff00]">Property Management</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-[#ccff00]/10 border border-[#ccff00]/20 rounded-full text-[#ccff00] text-sm font-semibold">
                ONE SUBSCRIPTION, UNLIMITED PROPERTIES
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              All-inclusive property<br />
              <span className="text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.6)]">management services</span><br />
              in coastal areas
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Experience hassle-free property management with Coast Planet's premium services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button 
                size="large" 
                className="flex-1 h-14 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.5)] hover:shadow-[0_0_30px_rgba(204,255,0,0.8)]"
                onClick={handleNewClientEnquiry}
              >
                New client? Enquire now
              </Button>
              <Button 
                size="large" 
                className="flex-1 h-14 bg-transparent border-2 border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-[#171717] font-semibold text-base rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(204,255,0,0.6)]"
                href="/auth/signin"
              >
                Existing client? Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Why choose Coast Planet?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Experience the difference with our award-winning property management services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#212121] p-6 rounded-2xl border border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_20px_rgba(204,255,0,0.2)] group"
              >
                <div className="w-14 h-14 bg-[#ccff00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#ccff00]/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-16 bg-gradient-to-br from-[#212121] to-[#1a1a1a] p-8 rounded-2xl border border-gray-800 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-center text-white">Schedule a call with a<br /><span className="text-[#ccff00]">property manager</span></h3>
            <Form layout="vertical">
              <Form.Item>
                <Select 
                  placeholder="United States +1" 
                  className="w-full custom-select" 
                  size="large"
                  style={{
                    backgroundColor: '#171717',
                  }}
                >
                  <Option value="+1">United States +1</Option>
                  <Option value="+44">United Kingdom +44</Option>
                  <Option value="+971">UAE +971</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Input 
                  placeholder="Phone number" 
                  size="large" 
                  className="bg-[#171717] border-gray-700 text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] rounded-lg h-12"
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  size="large" 
                  className="w-full h-12 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.5)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>

      {/* Survey Results Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Data That Matters</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Our Latest Survey Revealed
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-[#212121] p-6 rounded-2xl border border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300">
                <div className="text-5xl font-bold text-[#ccff00] mb-2">75%</div>
                <p className="text-gray-300">of tenants said they prefer managed properties.</p>
              </div>
              
              <div className="bg-[#212121] p-6 rounded-2xl border border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300">
                <div className="text-5xl font-bold text-[#ccff00] mb-2">69%</div>
                <p className="text-gray-300">of tenants chose not to renew their tenancy due to poor landlord management.</p>
              </div>
              
              <div className="bg-[#212121] p-6 rounded-2xl border border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300">
                <div className="text-5xl font-bold text-[#ccff00] mb-2">80%</div>
                <p className="text-gray-300">of tenants will pay slightly more for a managed property.</p>
              </div>
              
              <div className="bg-gradient-to-br from-[#ccff00]/10 to-[#ccff00]/5 p-6 rounded-2xl border border-[#ccff00]/20">
                <p className="text-gray-300 mb-4">
                  Discover key insights from our latest tenant satisfaction survey, exploring preferences, priorities, and expectations. Essential reading for landlords and investors.
                </p>
                <Button 
                  icon={<Download className="h-4 w-4" />} 
                  className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-11 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Download now
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Survey Results"
                className="relative w-full rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fully Managed Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Full Service</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Fully Managed by Us
              </h2>
              <p className="text-xl text-[#ccff00] mb-6">
                We're available, so you don't have to be
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Experience complete peace of mind with our comprehensive property management services. From tenant screening to maintenance coordination, we handle every aspect of property management so you can focus on what matters most.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">24/7 Support</h4>
                    <p className="text-gray-400 text-sm">Round-the-clock assistance for you and your tenants</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Professional Maintenance</h4>
                    <p className="text-gray-400 text-sm">Vetted contractors for all property needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Transparent Reporting</h4>
                    <p className="text-gray-400 text-sm">Regular updates on property performance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/20 to-[#ccff00]/5 rounded-3xl blur-2xl group-hover:blur-3xl group-hover:from-[#ccff00]/30 transition-all duration-300"></div>
              <div className="relative">
                <img
                  src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                  alt="Fully Managed Properties"
                  className="w-full rounded-2xl border border-gray-800 shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    shape="circle"
                    size="large"
                    icon={<Play className="h-8 w-8" />}
                    className="w-20 h-20 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] transition-all duration-300 hover:scale-110 shadow-[0_0_25px_rgba(204,255,0,0.7)] hover:shadow-[0_0_35px_rgba(204,255,0,0.9)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Management Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Property Management Brochure"
                className="relative w-full rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Excellence</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Trusted Management for<br />Your <span className="text-[#ccff00]">Property</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Discover why thousands of owners trust us with their investments. Explore our comprehensive brochure to learn how we manage, maintain, and maximise the value of your property.
              </p>
              <Button 
                icon={<Download className="h-5 w-5" />} 
                className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-12 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.6)] hover:shadow-[0_0_30px_rgba(204,255,0,0.9)]">
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#ccff00]/10 border border-[#ccff00]/20 px-4 py-2 rounded-full text-[#ccff00] text-sm font-semibold mb-4">
                PROPERTY MANAGEMENT
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Hassle-free property<br /><span className="text-[#ccff00]">management</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Coast Planet manages the largest portfolio of residential and commercial coastal properties, with over 8,500 units and over 65 buildings under management.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                We offer a turnkey service that covers property marketing and tenant screening right through to rent collection and maintenance – as well as ensuring you get the best market rate.
              </p>
              <Button 
                className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-12 px-8 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Building Management"
                className="relative w-full rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Building Management Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Property Management"
                className="relative w-full rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-[#ccff00]/10 border border-[#ccff00]/20 px-4 py-2 rounded-full text-[#ccff00] text-sm font-semibold mb-4">
                BUILDING MANAGEMENT
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Turnkey building<br /><span className="text-[#ccff00]">management</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Whether you own a single property or have an extensive asset portfolio, you naturally want to maximise your return on investment. But, if your property isn't being managed properly, you could end up out of pocket. Our 50-strong team of residential and commercial property management professionals are your eyes and ears on the ground.
              </p>
              <Button 
                className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-12 px-8 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Snagging Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Quality Assurance</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6">
                Snagging and<br /><span className="text-[#ccff00]">Inspection</span>
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3 bg-[#212121] p-4 rounded-xl border border-gray-800">
                  <Zap className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">
                    Snagging is the process of identifying and rectifying defects or issues in a newly constructed property.
                  </p>
                </div>
                <div className="flex items-start space-x-3 bg-[#212121] p-4 rounded-xl border border-gray-800">
                  <CheckCircle className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">
                    Our experienced professionals will conduct thorough inspections of your property and provide a detailed report highlighting any problem areas with photos and recommendations.
                  </p>
                </div>
                <div className="flex items-start space-x-3 bg-[#212121] p-4 rounded-xl border border-gray-800">
                  <Clock className="h-6 w-6 text-[#ccff00] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">
                    A second visit will be conducted by the team to ensure all issues have been addressed and that the property meets the required standards and specifications promised.
                  </p>
                </div>
              </div>
              <Button 
                className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-12 px-8 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get in Touch
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">TRUSTED BY</p>
                <div className="grid grid-cols-2 gap-4">
                  {clientLogos.map((logo, index) => (
                    <div key={index} className="bg-[#212121] p-3 rounded-xl border border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300 group">
                      <img
                        src={logo}
                        alt={`Client ${index + 1}`}
                        className="w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Customer Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              We always go the extra mile<br />for our <span className="text-[#ccff00]">clients</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about their Coast Planet experience.
            </p>
          </div>

          {/* Testimonial Slider */}
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-[#212121] hover:bg-[#ccff00] rounded-full p-3 border border-gray-800 text-gray-400 hover:text-[#171717] transition-all duration-300 hover:scale-110 hover:border-[#ccff00]"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-[#212121] hover:bg-[#ccff00] rounded-full p-3 border border-gray-800 text-gray-400 hover:text-[#171717] transition-all duration-300 hover:scale-110 hover:border-[#ccff00]"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Testimonial Card */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 bg-gradient-to-br from-[#212121] to-[#1a1a1a] border border-gray-800 p-8 lg:p-12"
                  >
                    <div className="flex items-center mb-6">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-[#ccff00] fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#ccff00] to-[#ccff00] rounded-full flex items-center justify-center text-[#171717] font-bold text-base mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8">
              <div className="flex space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-[#ccff00] w-8' 
                        : 'bg-gray-700 w-2 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 max-w-xs mx-auto">
              <div className="bg-gray-800 rounded-full h-1.5">
                <div 
                  className="bg-gradient-to-r from-[#ccff00] to-[#ccff00] h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{currentTestimonial + 1} of {testimonials.length}</span>
                <span>Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">Technology</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Forward thinking property<br /><span className="text-[#ccff00]">management</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Equipped with best-in-class technology, our end-to-end service spans marketing and tenant management through to accounting and reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ccff00]/10 rounded-3xl blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=333&fit=crop"
                alt="Landlord Portal"
                className="relative w-full rounded-2xl border border-gray-800 shadow-2xl"
              />
            </div>
            
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Log in to our<br /><span className="text-[#ccff00]">Landlord Portal</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                As a Coast Planet Property Management client, you get access to our Landlord Portal. Here you'll find notices, maintenance requests, work orders and financial reports for all your properties that are managed by Coast Planet.
              </p>
              <Button 
                href="/dashboard"
                className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold h-12 px-8 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Access Landlord Portal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#171717]">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-semibold text-sm uppercase tracking-wider">FAQs</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
              Your questions<br /><span className="text-[#ccff00]">answered</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about property management services.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#212121] border border-gray-800 rounded-xl overflow-hidden hover:border-[#ccff00]/30 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-[#1a1a1a] transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold text-base text-white pr-4">{faq.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-[#ccff00] transform transition-all duration-300 ease-in-out flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden border-t border-gray-800">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ccff00]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8 relative z-10">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full text-[#ccff00] text-sm font-semibold">
              GET STARTED TODAY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            We give your property the<br />management it <span className="text-[#ccff00] italic">deserves</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with our professional team and let us help you increase returns on your property with our award-winning management services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="large"
              className="h-14 px-10 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(204,255,0,0.6)] hover:shadow-[0_0_30px_rgba(204,255,0,0.9)]">
            
              Get in Touch
            </Button>
            <Button 
              size="large"
              className="h-14 px-10 bg-transparent border-2 border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-[#171717] font-semibold text-base rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(204,255,0,0.7)]">
            
              View Our Services
            </Button>
          </div>
        </div>
      </section>    </div>
  );
}
