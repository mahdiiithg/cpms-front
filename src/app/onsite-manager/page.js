'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Card, Row, Col, Statistic, Form, Select, Badge, Tag } from 'antd';
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
  Building,
  DollarSign,
  Calendar,
  User,
  Briefcase,
  TrendingUp,
  FileText,
  Clock,
  Target
} from 'lucide-react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import Header from '@/components/Header';

const { Option } = Select;

export default function OnsiteManagerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const { ensureAuth } = useRequireAuth();

  const handleJoinAgency = () => {
    if (!ensureAuth('Please login or create an account to join our agency.')) return;
    // Handle agency join logic
  };

  const handleLiteJoin = () => {
    if (!ensureAuth('Please login or create an account for LITE membership.')) return;
    // Handle lite membership logic
  };

  const handleFullJoin = () => {
    if (!ensureAuth('Please login or create an account for FULL membership.')) return;
    // Handle full membership logic
  };

  const featuredProperties = [
    {
      id: 1,
      type: "Resort / Holiday",
      location: "Broadbeach",
      price: "$1,795,000",
      netIncome: "$219,017",
      remuneration: "$61,953",
      lettingPool: 19,
      managerUnitValue: "$850,000",
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      type: "Permanent",
      location: "Varsity Lakes",
      price: "$1,690,000",
      netIncome: "$200,255",
      remuneration: "$148,906",
      lettingPool: 21,
      managerUnitValue: "$820,000",
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 3,
      type: "Resort / Holiday",
      location: "Coolangatta",
      price: "$1,615,000",
      netIncome: "$221,798",
      remuneration: "$57,092",
      lettingPool: 18,
      managerUnitValue: "$750,000",
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 4,
      type: "Permanent",
      location: "Carrara",
      price: "$1,980,000",
      netIncome: "$185,935",
      remuneration: "$185,935",
      lettingPool: 0,
      managerUnitValue: "$1,080,000",
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 5,
      type: "Permanent",
      location: "Dinmore",
      price: "Make An Offer",
      netIncome: "$497,335",
      remuneration: "$225,982",
      lettingPool: 105,
      managerUnitValue: "$630,000",
      bedrooms: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop",
      featured: false
    },
    {
      id: 6,
      type: "Resort / Holiday",
      location: "Clifton Beach",
      price: "$1,595,000",
      netIncome: "$312,000",
      remuneration: "$80,000",
      lettingPool: 29,
      managerUnitValue: "$675,000",
      bedrooms: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
      featured: false
    }
  ];

  const newsArticles = [
    {
      id: 1,
      title: "Queensland's New Seller Disclosure Regime Has Commenced",
      category: "Legal",
      date: "28 August 2025",
      comments: 0,
      excerpt: "From 'Buyer Beware' to 'Seller Must Declare' On 1 August 2025, Queensland's property landscape fundamentally changed. The new seller dis...",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Building Your Business",
      category: "General Interest",
      date: "28 August 2025",
      comments: 0,
      excerpt: "For this month, we have focused our Insights on the SME Business sector, with commentary on recent General Interest Charge updates and TPAR...",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Real Estate's New Reality: AML/CTF Overhaul, Fresh Funding and What It Means for Agents",
      category: "Real Estate",
      date: "27 August 2025",
      comments: 0,
      excerpt: "Brisbane, 26 August 2025 — Australia's real estate sector is hurtling toward its biggest compliance shake-up in decades, with the federal go...",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Strata Seminar 15th October 2025 – Mackay",
      date: "15 Oct 2025",
      location: "Mackay",
      host: "Archers the Strata Professionals",
      description: "Clarifying Maintenance & Improvement Works to Common Property, Investigating Common Property Defects...",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Strata Seminar 22nd October 2025 – Brisbane",
      date: "22 Oct 2025",
      location: "Brisbane",
      host: "Archers the Strata Professionals",
      description: "Clarifying Maintenance & Improvement Works to Common Property, Investigating Common Property Defects...",
      image: "https://images.unsplash.com/photo-1559223607-a43c990c692d?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Strata Seminar 30th October 2025 – Cairns",
      date: "30 Oct 2025",
      location: "Cairns",
      host: "Archers the Strata Professionals",
      description: "Clarifying Maintenance & Improvement Works to Common Property, Investigating Common Property Defects...",
      image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&h=250&fit=crop"
    }
  ];

  const employmentOpportunities = [
    {
      id: 1,
      title: "Sales And Marketing Employment",
      type: "Agent/Partner for MRAgents",
      salary: "Individual agreement to be negotiated",
      location: "Robina",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Property Manager",
      type: "Full-time Position",
      salary: "$65,000 - $80,000",
      location: "Gold Coast",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-blue-600">Coast Planet Management Rights</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6">
            Australia&apos;s Leading Management Rights Website
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
            The only website with every management rights, and every management rights broker, listed in one place.
          </p>
          
          {/* Search Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Search Here</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
              <Select
                placeholder="Management Rights"
                size="large"
                className="w-full"
                options={[
                  { value: 'all', label: 'All Management Rights' },
                  { value: 'permanent', label: 'Permanent' },
                  { value: 'resort', label: 'Resort / Holiday' },
                  { value: 'retirement', label: 'Retirement' },
                  { value: 'off-plan', label: 'Off Plan' },
                  { value: 'corporate', label: 'Corporate' }
                ]}
              />
              <Select
                placeholder="Motels & Hosp."
                size="large"
                className="w-full"
                options={[
                  { value: 'all', label: 'All Hospitality' },
                  { value: 'motels', label: 'Motels' },
                  { value: 'hotels', label: 'Hotels' },
                  { value: 'resorts', label: 'Resorts' }
                ]}
              />
              <Select
                placeholder="Rentals"
                size="large"
                className="w-full"
                options={[
                  { value: 'all', label: 'All Rentals' },
                  { value: 'residential', label: 'Residential' },
                  { value: 'commercial', label: 'Commercial' }
                ]}
              />
              <Select
                placeholder="Investment Property"
                size="large"
                className="w-full"
                options={[
                  { value: 'all', label: 'All Investment' },
                  { value: 'units', label: 'Units' },
                  { value: 'houses', label: 'Houses' },
                  { value: 'commercial', label: 'Commercial' }
                ]}
              />
            </div>
            <Button 
              type="primary" 
              size="large" 
              className="w-full md:w-auto mt-4 bg-gradient-to-r from-blue-600 to-teal-600 border-0"
            >
              <Search className="h-4 w-4 mr-2" />
              SEARCH
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Listing of the Month */}
      <section className="py-8 sm:py-12 lg:py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-4">
              <Badge.Ribbon text="Oct Listing Of The Month" color="gold">
                <div className="w-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                    Featured Management Rights
                  </h2>
                </div>
              </Badge.Ribbon>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <img
                  src={featuredProperties[0].image}
                  alt="Featured Property"
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
              </div>
              <div>
                <Tag color="blue" className="mb-2">{featuredProperties[0].type} management rights</Tag>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {featuredProperties[0].location}
                </h3>
                <div className="space-y-2 text-sm sm:text-base text-gray-600">
                  <p><strong>{featuredProperties[0].price}</strong></p>
                  <p>Net Income: <strong>{featuredProperties[0].netIncome} (actual)</strong></p>
                  <p>Remuneration: <strong>{featuredProperties[0].remuneration}</strong></p>
                  <p>Letting Pool: <strong>{featuredProperties[0].lettingPool}</strong></p>
                  <p>Manager Unit Value: <strong>{featuredProperties[0].managerUnitValue}</strong></p>
                  <p>Manager Unit: <strong>{featuredProperties[0].bedrooms} Bedrooms</strong></p>
                </div>
                <Button type="primary" className="mt-4">View Details</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Agency Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Join Our Agency */}
            <div className="bg-blue-50 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Join Our Agency</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Coast Planet isn&apos;t just the number one MLR portal, but also a real estate agency for onsite managers.
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  We are the number 1 agency of onsite managers for the past 20 years!
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Over 650 onsite managers in the agency
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  The widest range of agency services
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Bulk discounts on Signage, Photography, Virtual Tours
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  We have a 100% &apos;best price&apos; guarantee
                </li>
              </ul>
              <Button 
                type="primary" 
                size="large" 
                className="w-full"
                onClick={handleJoinAgency}
              >
                JOIN COAST PLANET NOW!
              </Button>
            </div>

            {/* LITE Deskfee */}
            <div className="bg-green-50 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">LITE Deskfee</h3>
              <p className="text-lg font-semibold text-green-600 mb-4">$449+GST/PA</p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                For managers who rent lots in their scheme (no sales). Annual deskfee includes:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Market unlimited rental listings on every property portal
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  National PriceFinder access
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  National Tenancy Database
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Inspect Real Estate lead management
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  SMS auto responders
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  2Apply Tenancy Applications
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  PDF Brochures on all your listings
                </li>
              </ul>
              <Button 
                type="primary" 
                size="large" 
                className="w-full bg-green-600 hover:bg-green-700 border-green-600"
                onClick={handleLiteJoin}
              >
                JOIN COAST PLANET NOW!
              </Button>
            </div>

            {/* FULL Deskfee */}
            <div className="bg-purple-50 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">FULL Deskfee</h3>
              <p className="text-lg font-semibold text-purple-600 mb-4">$999+GST/PA</p>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                For onsite managers who rent and sell lots in their scheme. Annual deskfee includes:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-gray-600 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Everything in the LITE Deskfee is included, plus:
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Zero (yes zero!) Agency Commission Split
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Realworks for all your forms and paperwork
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Inspect Real Estate Sales System
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  24hr 7day technical support
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  REIQ Membership
                </li>
              </ul>
              <Button 
                type="primary" 
                size="large" 
                className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600"
                onClick={handleFullJoin}
              >
                JOIN COAST PLANET NOW!
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Management Rights */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Featured Management Rights
          </h2>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-8 gap-2">
            {['All', 'Permanent', 'Resort', 'Retirement', 'Off Plan', 'Corporate'].map((category) => (
              <Button
                key={category}
                type={category === 'All' ? 'primary' : 'default'}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <Card
                key={property.id}
                cover={
                  <img
                    src={property.image}
                    alt={property.location}
                    className="h-48 object-cover"
                  />
                }
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <Tag color="blue">{property.type}</Tag>
                  {property.featured && <Badge color="gold" text="Featured" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.location}</h3>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p><strong>{property.price}</strong></p>
                  <p>Net Income: <strong>{property.netIncome}</strong></p>
                  <p>Remuneration: <strong>{property.remuneration}</strong></p>
                  <p>Letting Pool: <strong>{property.lettingPool}</strong></p>
                  {property.bedrooms && (
                    <p>Bedrooms: <strong>{property.bedrooms}</strong></p>
                  )}
                </div>
                <Button type="primary" className="w-full">
                  View Details
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button type="primary" size="large">
              View All Management Rights
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Industry News */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Latest Industry News!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-6">
              Receive monthly industry news updates from leading professionals, commentators and experts. Simply enter your details below.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button type="primary">SUBSCRIBE</Button>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mb-8">
            Sponsored by: <a href="#" className="text-blue-600 hover:underline">Australian Resort Management Sales</a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newsArticles.map((article) => (
              <Card
                key={article.id}
                cover={
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-48 object-cover"
                  />
                }
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <Tag color="blue">{article.category}</Tag>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.comments} Comments</span>
                  <Button type="link" className="p-0">
                    READ MORE
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
            Upcoming Events
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                cover={
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 object-cover"
                  />
                }
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <Tag color="orange" icon={<Calendar className="h-3 w-3" />}>
                    Event
                  </Tag>
                  <span className="text-sm font-semibold text-orange-600">{event.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Hosted by:</strong> {event.host}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>
                <Button type="primary" className="w-full">
                  READ MORE
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-lg text-center">
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Most of the events promoted on this page are put on by ARAMA. Support the association that supports your industry and make sure you are an ARAMA member. ARAMA Members receive a 10% lifetime discount to Coast Planet.
            </p>
            <Button type="primary" size="large" className="bg-yellow-600 hover:bg-yellow-700 border-yellow-600">
              JOIN ARAMA TODAY!
            </Button>
          </div>
        </div>
      </section>

      {/* Employment Opportunities */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Employment Opportunities
          </h2>
          
          <div className="text-center mb-8 space-y-2">
            <Button type="link" className="text-blue-600">VIEW MORE JOBS HERE.</Button>
            <br />
            <Button type="link" className="text-blue-600">ADVERTISE JOBS NOW (IT&apos;S FREE!).</Button>
            <br />
            <Button type="link" className="text-blue-600">REGISTER AS A SERVICE PROVIDER.</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {employmentOpportunities.map((job) => (
              <Card
                key={job.id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{job.type}</p>
                    <p className="text-sm text-gray-600 mb-1">{job.salary}</p>
                    <p className="text-sm text-gray-600 mb-3">{job.location}</p>
                    <Button type="primary" size="small">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Are Management Rights */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            What Are Management Rights?
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <p className="mb-4">
              &apos;Management Rights&apos; or &apos;Management Letting Rights&apos; (MRs and MLRs, respectively), are businesses concerned with the maintenance and management of community titled complexes.
            </p>
            <p className="mb-4">
              Management Rights consist of three components: The caretaking agreement to maintain the complex for the body corporate; The letting business allowing the manager to manage rentals within the complex; and The Lot which is the unit, car space, storage areas and office that are owned by the manager in which to reside and run their business.
            </p>
            <p className="font-semibold text-blue-600">
              Essentially, a management rights is a business, and a house, combined.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">If you&apos;re interested in a property advertised on this website, please call the manager or broker whose details are on the listing.</p>
              <div className="space-y-2 text-sm">
                <p><strong>Head Office:</strong> Brisbane Q 4000</p>
                <p><strong>Call:</strong> 07 3868 4047</p>
                <p><strong>Principal (24x7):</strong> 0407 769 944</p>
                <p><strong>Email:</strong> info@CoastPlanet.com.au</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-xl font-bold mb-4">Social</h3>
              <div className="flex space-x-4">
                <Button type="text" icon={<Play className="h-4 w-4" />} className="text-white">
                  Youtube
                </Button>
                <Button type="text" icon={<Users className="h-4 w-4" />} className="text-white">
                  LinkedIn
                </Button>
                <Button type="text" icon={<Users className="h-4 w-4" />} className="text-white">
                  Facebook
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <p><a href="#" className="text-gray-300 hover:text-white">Management Rights QLD</a></p>
                <p><a href="#" className="text-gray-300 hover:text-white">Management Rights Brisbane</a></p>
                <p><a href="#" className="text-gray-300 hover:text-white">Management Rights Gold Coast</a></p>
                <p><a href="#" className="text-gray-300 hover:text-white">Investment Property</a></p>
                <p><a href="#" className="text-gray-300 hover:text-white">Units For Rent</a></p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Coast Planet LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
