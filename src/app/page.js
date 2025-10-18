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
  ArrowRight
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
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
      title: "Optimised occupancy",
      description: "With occupancy rates averaging 96%, we attract high-quality tenants to your property."
    },
    {
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
      title: "Trusted name",
      description: "A highly regarded, award winning company in business for almost 40 years, we have an impeccable track record in coastal real estate management."
    },
    {
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
      title: "Quality guaranteed",
      description: "Our dedicated property managers are committed to service excellence, and our extensive network of contract partners have all been personally vetted."
    },
    {
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
      title: "Unparalleled accountability",
      description: "We promise to keep you in the loop with detailed quarterly or time-specified reports all part of the service, wherever you are in the world."
    },
    {
      icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
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

  return (    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-blue-600">Property Management</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              All-inclusive property management services in coastal areas from Coast Planet
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                type="default" 
                size="large" 
                className="flex-1 text-2xl py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={handleNewClientEnquiry}
              >
                New client? Enquire now
              </Button>
              <Button type="primary" size="large" className="flex-1 text-2xl py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg" href="/auth/signin">
                Existing client? Login now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Why choose Coast Planet?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="mt-8 sm:mt-12 bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg max-w-sm sm:max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">Schedule a call with a property manager</h3>
            <Form layout="vertical">
              <Form.Item>
                <Select placeholder="United States +1" className="w-full" size="large">
                  <Option value="+1">United States +1</Option>
                  <Option value="+44">United Kingdom +44</Option>
                  <Option value="+971">UAE +971</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Input placeholder="Phone number" size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="large" className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg">Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </section>

      {/* Survey Results Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Our Latest Survey Revealed
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">75%</div>
                <p className="text-sm sm:text-base text-gray-600">of tenants said they prefer managed properties.</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">69%</div>
                <p className="text-sm sm:text-base text-gray-600">of tenants chose not to renew their tenancy due to poor landlord management.</p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-1 sm:mb-2">80%</div>
                <p className="text-sm sm:text-base text-gray-600">of tenants will pay slightly more for a managed property.</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Discover key insights from our latest tenant satisfaction survey, exploring preferences, priorities, and expectations. Essential reading for landlords and investors.
                </p>
                <Button type="primary" icon={<Download className="h-4 w-4 transition-transform duration-300 hover:scale-110" />} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Download now
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Survey Results"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fully Managed Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                Fully Managed by Us
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                We're available, so you don't have to be
              </p>
            </div>
            
            <div className="relative">
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Fully Managed Properties"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={<Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Management Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Property Management Brochure"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                Trusted Management for Your Property
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Discover why thousands of owners trust us with their investments. Explore our comprehensive brochure to learn how we manage, maintain, and maximise the value of your property.
              </p>
              <Button type="primary" icon={<Download className="h-4 w-4 transition-transform duration-300 hover:scale-110" />} className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Download Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Property Management Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                PROPERTY MANAGEMENT
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                Hassle-free property management
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6">
                Coast Planet manages the largest portfolio of residential and commercial coastal properties, with over 8,500 units and over 65 buildings under management.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                We offer a turnkey service that covers property marketing and tenant screening right through to rent collection and maintenance – as well as ensuring you get the best market rate.
              </p>
              <Button type="primary" className="transition-all duration-300 hover:scale-105 hover:shadow-lg">Get in Touch</Button>
            </div>
            
            <div>
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Building Management"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Building Management Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://cgsfm.com.au/wp-content/uploads/2022/06/blog-post-1.jpg"
                alt="Property Management"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                BUILDING MANAGEMENT
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                Turnkey building management
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Whether you own a single property or have an extensive asset portfolio, you naturally want to maximise your return on investment. But, if your property isn't being managed properly, you could end up out of pocket. Our 50-strong team of residential and commercial property management professionals are your eyes and ears on the ground.
              </p>
              <Button type="primary">Get in Touch</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Snagging Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-6">
                Snagging and Inspection
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                Snagging is the process of identifying and rectifying defects or issues in a newly constructed property.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-4">
                Our experienced professionals will conduct thorough inspections of your property and provide a detailed report highlighting any problem areas with photos and recommendations for you to share with the developer for rectification.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6">
                A second visit will be conducted by the team to ensure all issues have been addressed and that the property meets the required standards and specifications promised.
              </p>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Trust Coast Planet for professional snagging inspection services.
              </p>
              <Button type="primary">Get in Touch</Button>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-3 sm:mb-4">TRUSTED BY</p>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {clientLogos.map((logo, index) => (
                    <div key={index} className="bg-white p-1 rounded-lg shadow-sm">
                      <img
                        src={logo}
                        alt={`Client ${index + 1}`}
                        className="w-full object-cover rounded-lg"
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
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-3 sm:mb-4">CUSTOMER REVIEWS</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              We always go the extra mile for our clients.
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Don't just take our word for it. Here's what our clients have to say about their Coast Planet experience.
            </p>
          </div>

          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Testimonial Card */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 bg-gray-50 p-6 sm:p-8 lg:p-10"
                  >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="flex space-x-0.5 sm:space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-base sm:text-lg text-gray-900">{testimonial.name}</div>
                        <div className="text-sm sm:text-base text-gray-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <div className="flex space-x-2 sm:space-x-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-blue-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6 max-w-xs mx-auto">
              <div className="bg-gray-200 rounded-full h-1 sm:h-1.5">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-teal-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentTestimonial + 1) / testimonials.length) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2">
                <span>{currentTestimonial + 1} of {testimonials.length}</span>
                <span>Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Forward thinking property management
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
            Equipped with best-in-class technology, our end-to-end service spans marketing and tenant management through to accounting and reporting.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=333&fit=crop"
                alt="Landlord Portal"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-6">
                Log in to our Landlord Portal
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                As a Coast Planet Property Management client, you get access to our Landlord Portal. Here you'll find notices, maintenance requests, work orders and financial reports for all your properties that are managed by Coast Planet.
              </p>
              <Button type="primary" href="/dashboard">Access Landlord Portal</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Your questions answered
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-600 mb-8 sm:mb-12">
            Everything you need to know about property management services.
          </p>

          <div className="space-y-3 sm:space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md">
                <button
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold text-sm sm:text-base text-gray-900">{faq.question}</span>
                  <ChevronRight
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-500 transform transition-all duration-300 ease-in-out ${
                      expandedFaq === index ? 'rotate-90 text-blue-600' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4 text-sm sm:text-base text-gray-600 transform transition-all duration-300 ease-in-out">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            We give your property the management it deserves
          </h2>
          <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
            Connect with our professional team and let us help you get increase returns on your property.
          </p>
          <Button type="default" size="large">
            Get in Touch
          </Button>
        </div>
      </section>    </div>
  );
}
