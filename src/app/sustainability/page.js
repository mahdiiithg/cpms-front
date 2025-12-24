'use client';

import { useState } from 'react';
import { Button, Card } from 'antd';
import { 
  Leaf, 
  Sun, 
  Droplets, 
  Recycle, 
  Home, 
  Award, 
  Target,
  TrendingUp,
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const SustainabilityPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sustainabilityPillars = [
    {
      icon: <Sun className="h-8 w-8" />,
      title: 'Clean Energy',
      description: 'Promoting solar-powered homes and energy-efficient properties',
      metrics: '85% of our properties feature renewable energy solutions',
      color: 'bg-yellow-500'
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: 'Water Conservation',
      description: 'Smart irrigation systems and water-efficient fixtures',
      metrics: '40% reduction in water usage across managed properties',
      color: 'bg-blue-500'
    },
    {
      icon: <Recycle className="h-8 w-8" />,
      title: 'Waste Reduction',
      description: 'Comprehensive recycling and waste management programs',
      metrics: '70% waste diversion from landfills',
      color: 'bg-green-500'
    },
    {
      icon: <Home className="h-8 w-8" />,
      title: 'Green Building',
      description: 'LEED certified properties and sustainable construction',
      metrics: '95% of new developments meet green building standards',
      color: 'bg-emerald-500'
    }
  ];

  const initiatives = [
    {
      title: 'Carbon Neutral Properties',
      description: 'Achieving net-zero carbon emissions across our property portfolio by 2025.',
      progress: 78,
      impact: 'Reduced 2,500 tons of CO2 emissions annually'
    },
    {
      title: 'Smart Home Technology',
      description: 'Installing IoT devices for energy monitoring and optimization.',
      progress: 65,
      impact: '30% average energy savings per property'
    },
    {
      title: 'Sustainable Materials',
      description: 'Using eco-friendly materials in all renovations and new constructions.',
      progress: 82,
      impact: '50% reduction in construction waste'
    },
    {
      title: 'Community Gardens',
      description: 'Creating green spaces in residential communities.',
      progress: 45,
      impact: '25 community gardens established'
    }
  ];

  const certifications = [
    {
      name: 'LEED Platinum',
      description: 'Leadership in Energy and Environmental Design',
      icon: <Award className="h-6 w-6" />,
      count: '150+ properties'
    },
    {
      name: 'ENERGY STAR',
      description: 'Energy efficiency certification',
      icon: <Award className="h-6 w-6" />,
      count: '300+ properties'
    },
    {
      name: 'Green Building Council',
      description: 'Sustainable building practices',
      icon: <Award className="h-6 w-6" />,
      count: 'Member since 2019'
    },
    {
      name: 'Carbon Trust',
      description: 'Carbon footprint certification',
      icon: <Award className="h-6 w-6" />,
      count: 'Verified annually'
    }
  ];

  return (    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 0c16.569 0 30 13.431 30 30s-13.431 30-30 30S0 46.569 0 30 13.431 0 30 0zm0 6c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24S43.255 6 30 6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 text-center text-white">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Leaf className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Our Commitment to
              <span className="block text-green-300">Sustainability</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Building a greener future, one property at a time
            </p>
            <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
              At Coast Planet, we believe that sustainable living shouldn&apos;t be a luxury. That&apos;s why we&apos;re committed to creating eco-friendly properties that benefit both our clients and the planet.
            </p>
            <Button 
              size="large" 
              className="bg-green-500 text-white border-0 h-12 px-8 text-lg font-semibold hover:bg-green-400"
            >
              Explore Green Properties
            </Button>
          </div>
        </div>
      </div>

      {/* Sustainability Pillars */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Sustainability Pillars</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We focus on four key areas to ensure our properties contribute to a sustainable future while providing exceptional living experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sustainabilityPillars.map((pillar, index) => (
              <Card key={index} className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center p-6">
                  <div className={`w-16 h-16 mx-auto mb-6 ${pillar.color} rounded-full flex items-center justify-center text-white`}>
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 mb-6">{pillar.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-900">{pillar.metrics}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Current Initiatives */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Current Initiatives</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track our progress on key sustainability projects that are making a real difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{initiative.title}</h3>
                  <p className="text-gray-600 mb-6">{initiative.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-green-600">{initiative.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${initiative.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-sm font-medium text-green-800">{initiative.impact}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Environmental Impact</h2>
              <p className="text-lg text-gray-600 mb-8">
                Since 2018, we&apos;ve been measuring and reducing our environmental footprint while helping our clients do the same.
              </p>
              
              <div className="space-y-6">
                {[
                  { metric: '2,500 tons', label: 'CO2 emissions reduced annually' },
                  { metric: '40%', label: 'Water consumption decreased' },
                  { metric: '70%', label: 'Waste diverted from landfills' },
                  { metric: '30%', label: 'Energy savings per property' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                    <div>
                      <span className="text-2xl font-bold text-gray-900 mr-2">{item.metric}</span>
                      <span className="text-gray-600">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">2025 Goal</h3>
                  <p className="text-lg text-gray-600">Carbon Neutral Portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Certifications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards through recognized certifications and partnerships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    {cert.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
                  <div className="bg-green-50 rounded-lg py-2 px-3">
                    <p className="text-sm font-semibold text-green-800">{cert.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Join Our Mission */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Sustainability Mission</h2>
          <p className="text-lg mb-8 opacity-90">
            Be part of the solution. Choose eco-friendly properties and help us create a more sustainable future.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Choose Green', desc: 'Select from our eco-certified properties' },
              { title: 'Save Energy', desc: 'Reduce your carbon footprint with smart homes' },
              { title: 'Make Impact', desc: 'Contribute to environmental conservation' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="large" 
              className="bg-white text-green-600 border-0 h-12 px-8 text-lg font-semibold hover:bg-green-50"
            >
              Browse Green Properties
            </Button>
            <Button 
              size="large" 
              className="bg-transparent border-white text-white h-12 px-8 text-lg hover:bg-white hover:text-green-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
