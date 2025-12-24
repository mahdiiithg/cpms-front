'use client';

import { useState } from 'react';
import { Button, Card } from 'antd';
import Header from '@/components/Header';
import { ChevronRight, Globe, Users, MapPin, Download, Phone, Shield, Award, CheckCircle } from 'lucide-react';
import ContactLeadForm from '@/components/contact/ContactLeadForm';


export default function GlobalAffiliationsPage() {
  const clientLogos = [
    'https://d33om22pidobo4.cloudfront.net/clients/logo/manision-globalwebp-aabab87a-4968-44ed-9855-4120ee4e7b98.webp',
    'https://d33om22pidobo4.cloudfront.net/clients/logo/manision-globalwebp-aabab87a-4968-44ed-9855-4120ee4e7b98.webp',
    'https://d33om22pidobo4.cloudfront.net/clients/logo/country-life-magazinewebp-b93c264e-3a0b-4625-b8f4-853ca059e08b.webp',
    'https://d33om22pidobo4.cloudfront.net/clients/logo/james-editionswebp-e7537e9c-6a34-41dc-8c0b-8f597f366077.webp',
    'https://d33om22pidobo4.cloudfront.net/clients/logo/luxury-portfilowebp-1b0311bc-e1a6-442e-b087-4d7a15d81542.webp',
  ];

  const networkStats = [
    { label: 'Countries', value: 70 },
    { label: 'Companies', value: 550 },
    { label: 'Offices', value: 4800 },
    { label: 'Associates', value: 134000 },
  ];

  const handleScheduleCall = () => {
    const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE?.replace(/\D/g, '');
    if (!adminPhone) return;
    window.location.href = `tel:+${adminPhone}`;
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      {/* Breadcrumb */}
      <div className="bg-[#1a1a1a] py-2 sm:py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
            <a href="/" className="hover:text-[#ccff00] transition-colors">Home</a>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-[#ccff00]">Global Affiliations</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3">
                Your property goals aren't limited by borders, and neither are we
              </h1>
              <div className="h-1 w-20 sm:w-24 bg-[#ccff00] rounded-full shadow-[0_0_10px_rgba(204,255,0,0.6)] mb-4 sm:mb-6" />
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
                We connect local expertise with a trusted global network so you can buy, sell, or invest with confidence—wherever opportunity takes you.
                With regional specialists and international partners working together, your goals stay front and center from first conversation to final handshake.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button type="primary" size="large" className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)] transition-all duration-300 hover:scale-105" onClick={handleScheduleCall}>
                  Enquire Now
                </Button>
                <Button type="default" size="large" className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00] transition-all duration-300 hover:scale-105" href="/dashboard">
                  Explore Portal
                </Button>
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://www.pngplay.com/wp-content/uploads/7/Networking-Diagram-Transparent-Background.png"
                alt="Global Network"
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {networkStats.map((stat) => (
                  <Card key={stat.label} className="text-center bg-[#1a1a1a] border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] transition-all duration-300">
                    <div className="text-2xl font-bold text-[#ccff00] drop-shadow-[0_0_10px_rgba(204,255,0,0.6)]">
                      {stat.value.toLocaleString()}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Global Partners */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-6">Our Global Partners</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-4">
                We collaborate with a curated network of international real estate firms, boutique brokerages, and private offices across major markets. This gives our clients access to vetted buyers, premium inventory, and on-the-ground expertise in 70+ countries.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start space-x-2"><Shield className="h-4 w-4 text-[#ccff00] mt-1" /> <span>Trusted introductions to reputable agencies worldwide</span></li>
                <li className="flex items-start space-x-2"><Globe className="h-4 w-4 text-[#ccff00] mt-1" /> <span>Seamless cross-border coordination for buying, selling, and renting</span></li>
                <li className="flex items-start space-x-2"><Award className="h-4 w-4 text-[#ccff00] mt-1" /> <span>Curated marketing channels for luxury and investment-grade assets</span></li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 bg-[#1a1a1a] border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-white">Global Brokerage Network</h3>
                <p className="text-gray-400 text-sm">A community of independent firms sharing market intelligence, referrals, and best practices to elevate results for clients.</p>
              </Card>
              <Card className="p-5 bg-[#1a1a1a] border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 text-white">Luxury Alliances</h3>
                <p className="text-gray-400 text-sm">Access to high-profile publications, private buyer pools, and international showcases for premium properties.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local / Global */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-6">We're Local. We're Global</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                Through our global partnerships, we expand your reach and unlock opportunities across key international markets—while keeping you guided by local experts.
              </p>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base mb-6 sm:mb-8">
                <li className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all duration-300">
                  <Globe className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                  <span>Global reach across 70+ countries</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all duration-300">
                  <Users className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                  <span>Partnerships with leading international networks</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all duration-300">
                  <Shield className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                  <span>Dedicated consultants for cross-border transactions</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.2)] transition-all duration-300">
                  <Award className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]" />
                  <span>Access to premium properties around the world</span>
                </li>
              </ul>
              
              {/* Trust indicators */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all duration-300">
                  <div className="text-[#ccff00] text-lg sm:text-xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
                <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all duration-300">
                  <div className="text-[#ccff00] text-lg sm:text-xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">&lt;24h</div>
                  <div className="text-xs text-gray-400">Response</div>
                </div>
                <div className="text-center p-3 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-[#ccff00]/40 hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] transition-all duration-300">
                  <div className="text-[#ccff00] text-lg sm:text-xl font-bold drop-shadow-[0_0_8px_rgba(204,255,0,0.6)]">100%</div>
                  <div className="text-xs text-gray-400">Confidential</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced Form Container */}
            <div className="relative">
              {/* Neon accent corner */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#ccff00]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-[#ccff00]/10 rounded-full blur-2xl"></div>
              
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#212121] p-6 sm:p-8 rounded-2xl border-2 border-gray-800 shadow-[0_0_30px_rgba(204,255,0,0.15)] hover:border-[#ccff00]/40 hover:shadow-[0_0_40px_rgba(204,255,0,0.25)] transition-all duration-300">
                {/* Top badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 bg-[#ccff00]/10 text-[#ccff00] px-3 py-1.5 rounded-full text-xs font-semibold border border-[#ccff00]/20">
                    <Phone className="h-3 w-3" />
                    <span>Free Consultation</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                    <span>Available Now</span>
                  </div>
                </div>

                {/* Header with better hierarchy */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Schedule Your Consultation
                  </h3>
                  <p className="text-sm text-gray-400">
                    Connect with our Global Affiliations specialist. We'll respond within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <ContactLeadForm
                  title=""
                  subtitle=""
                  darkMode={true}
                  services={[
                    'International Buying',
                    'International Selling',
                    'Investor Services',
                    'Relocation Support',
                    'Property Management',
                    'General Inquiry',
                  ]}
                />

                {/* Trust footer */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-[#ccff00]" />
                      <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-[#ccff00]" />
                      <span>No Obligation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-[#ccff00]" />
                      <span>Expert Guidance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Our Clients</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
            {clientLogos.map((logo, index) => (
              <div key={index} className="bg-[#1a1a1a] p-4 rounded-lg border border-gray-800 flex items-center justify-center hover:border-[#ccff00]/40 hover:shadow-[0_0_18px_rgba(204,255,0,0.3)] transition-all duration-300">
                <img src={logo} alt={`Client ${index + 1}`} className="h-10 sm:h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Property Listings */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <div className="inline-block bg-[#ccff00]/10 text-[#ccff00] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 border border-[#ccff00]/20 shadow-[0_0_10px_rgba(204,255,0,0.15)]">
                International Property Listings
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-6">
                Explore handpicked opportunities across the globe
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
                From Mediterranean villas to island retreats, we connect you with trusted partners and verified listings in sought-after destinations.
              </p>
              <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)] transition-all duration-300 hover:scale-105" href="/buy">
                Browse International Listings
              </Button>
            </div>
            <div className="text-center">
              <img
                src="https://www.bhomes.com/_next/image?url=https%3A%2F%2Fd33om22pidobo4.cloudfront.net%2Fpages%2Fblocks%2Fimages%2Ffabiopng-f97abade-22d4-49de-9083-b8ed22c04d39d951fc92-6a2c-4f2c-84be-aa6536274c0b.png&w=828&q=75"
                alt="International Properties"
                className="w-full rounded-lg shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* We believe real estate is personal. */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            We believe real estate is personal.
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-4">
            Behind every property is a story—families growing, investors planning, and people moving forward. We focus on the human side of real estate while delivering results.
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Since our beginning, we’ve built trust through clear advice, honest guidance, and long-lasting relationships. Because real estate isn’t just about homes—it’s about you.
          </p>
        </div>
      </section>

      {/* Why choose our global team */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Why choose our global team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[{
              icon: <CheckCircle className="h-7 w-7 text-[#ccff00]" />, title: 'Single point of contact',
              desc: 'Work with one dedicated consultant who orchestrates every moving part across borders.'
            },{
              icon: <Globe className="h-7 w-7 text-[#ccff00]" />, title: 'Real reach, not just listings',
              desc: 'Benefit from real partner intros, not just portal exposure, to move faster with confidence.'
            },{
              icon: <Shield className="h-7 w-7 text-[#ccff00]" />, title: 'Vetted partners',
              desc: 'Only established, reputable firms—protecting your privacy, timelines, and objectives.'
            },{
              icon: <Award className="h-7 w-7 text-[#ccff00]" />, title: 'Marketing that travels',
              desc: 'Tailored campaigns that reach the right audience locally and internationally.'
            }].map((f, i) => (
              <div key={i} className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-800 hover:shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:border-[#ccff00]/40 transition-all duration-300 hover:scale-105">
                <div className="mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-1 text-white">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Popular destinations</h2>
          <p className="text-gray-400 text-center mb-6 sm:mb-8">Explore international opportunities across established and emerging markets.</p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {['Montenegro','Cyprus','Spain','Greece','Portugal','Mauritius'].map((d) => (
              <a key={d} href="/buy" className="px-3 py-1.5 rounded-full bg-[#212121] border border-gray-700 text-gray-300 text-sm hover:border-[#ccff00] hover:text-[#ccff00] hover:shadow-[0_0_12px_rgba(204,255,0,0.4)] transition-all duration-300">
                {d}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Meet our global affiliations lead */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#171717]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#1a1a1a] border-2 border-gray-800 rounded-xl p-5 sm:p-6 hover:border-[#ccff00]/40 hover:shadow-[0_0_25px_rgba(204,255,0,0.3)] transition-all duration-300">
            <div className="md:col-span-1 flex items-center justify-center">
                  <img src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=300&q=80" alt="Global Affiliations Lead" className="w-32 h-32 rounded-full object-cover shadow-[0_0_25px_rgba(204,255,0,0.4)] border-2 border-[#ccff00]/30" />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold text-white">Global Affiliations Director</h3>
              <p className="text-sm text-gray-400 mb-3">Your point of contact for cross-border sales, introductions, and private placements.</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                <span className="inline-flex items-center gap-1"><Users className="h-4 w-4 text-[#ccff00]" /> 70+ markets covered</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-[#ccff00]" /> Based in Miami</span>
                <span className="inline-flex items-center gap-1"><Award className="h-4 w-4 text-[#ccff00]" /> Luxury & investment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Global Affiliations — FAQs</h2>
          {(() => {
            const faqs = [
              { q: 'How does the international referral process work?', a: 'We introduce you to a vetted partner in your destination market, brief them on your goals, and stay looped in until your objectives are achieved.' },
              { q: 'Can you help me market my property to overseas buyers?', a: 'Yes. We tailor campaigns and leverage partner channels to reach qualified audiences abroad while managing inquiries and viewings with you.' },
              { q: 'Do I pay extra fees for cross-border coordination?', a: 'No hidden fees. Any partner fees are disclosed up front by the receiving brokerage and agreed before proceeding.' },
              { q: 'Which countries can you support?', a: 'We have coverage across 70+ markets spanning Europe, North America, MENA, and Indian Ocean destinations. Tell us where you’re looking and we’ll advise the best route.' },
              { q: 'Is the service only for luxury properties?', a: 'Not at all. We support first-time buyers, portfolio landlords, and high-end sellers alike.' },
            ];
            const [expanded, setExpanded] = useState(null);
            return (
              <div className="space-y-3 sm:space-y-4">
                {faqs.map((item, idx) => (
                  <div key={idx} className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#ccff00]/40 hover:shadow-[0_0_18px_rgba(204,255,0,0.25)] bg-[#212121]">
                    <button className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-[#1a1a1a] transition-colors" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                      <span className="font-semibold text-sm sm:text-base text-white">{item.q}</span>
                      <ChevronRight className={`h-4 w-4 text-gray-500 transition-transform ${expanded === idx ? 'rotate-90 text-[#ccff00]' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${expanded === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-400">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* Investment Guide */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-6">Your guide to investing internationally</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6">
                Get a practical overview of key markets, trends, and strategies for international property investment—designed for buyers, landlords, and investors.
              </p>
              <Button type="primary" icon={<Download className="h-4 w-4" />} className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)] transition-all duration-300 hover:scale-105">
                Download now
              </Button>
            </div>
            <div className="text-center">
              <img
                src="https://d33om22pidobo4.cloudfront.net/pages/blocks/images/investment-guidepng-93153d34-d81e-4930-a461-32617752e73e.png"
                alt="Investment Guide"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#1a1a1a] border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            We connect your property to the world
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
            Speak to our Global Affiliations team today and discover how we can unlock international opportunities for you.
          </p>
          <Button type="default" size="large" className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]" onClick={handleScheduleCall}>
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
