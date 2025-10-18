'use client';

import { useState, useEffect } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { 
  MapPin, 
  Star, 
  Users, 
  Shield, 
  Search,
  ChevronRight,
  Play,
  Check,
  ArrowRight,
  Waves,
  Home,
  Heart,
  Globe
} from 'lucide-react';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Waves className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Coast Planet
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How it Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Reviews
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/signin"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <Button 
                  type="primary" 
                  className="bg-gradient-to-r from-blue-500 to-teal-500 border-0 hover:from-blue-600 hover:to-teal-600"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-60 h-60 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium">
                  <Waves className="h-4 w-4 mr-2" />
                  World's Premier Coastal Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Your Perfect
                  <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Coastal Escape
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Book stunning beachfront properties or swap your coastal home with fellow ocean lovers. 
                  Experience the world's most beautiful coastlines with trusted hosts.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button 
                    size="large"
                    type="primary" 
                    className="bg-gradient-to-r from-blue-500 to-teal-500 border-0 hover:from-blue-600 hover:to-teal-600 h-14 px-8 text-lg font-medium"
                    icon={<Search className="h-5 w-5" />}
                  >
                    Explore Properties
                  </Button>
                </Link>
                <Button 
                  size="large"
                  className="h-14 px-8 text-lg font-medium border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500"
                  icon={<Play className="h-5 w-5" />}
                >
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Coastal Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-1">
                <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-8 text-white">
                  <div className="space-y-6">
                    {/* Property Card Preview */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <Home className="h-4 w-4" />
                          </div>
                          <span className="font-medium">Beachfront Villa</span>
                        </div>
                        <Heart className="h-5 w-5" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Malibu, California</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4" />
                            <span className="text-sm">4.9 (127 reviews)</span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">$450</div>
                            <div className="text-xs opacity-80">per night</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Waves className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium">Ocean View</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium">Verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Star className="h-6 w-6 text-yellow-800" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <Check className="h-6 w-6 text-green-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Coast Planet?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another booking platform. We're your gateway to unforgettable coastal experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-white transition-colors group-hover:shadow-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Discovery</h3>
                <p className="text-gray-600 mb-6">
                  AI-powered search helps you find the perfect coastal property based on your preferences, budget, and travel dates.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 font-medium group/link">
                  Learn more 
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-white transition-colors group-hover:shadow-xl">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Properties</h3>
                <p className="text-gray-600 mb-6">
                  Every property is personally verified by our team. We ensure quality, safety, and authentic photos for peace of mind.
                </p>
                <a href="#" className="inline-flex items-center text-green-600 font-medium group/link">
                  Learn more 
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-8 bg-gray-50 rounded-2xl hover:bg-white transition-colors group-hover:shadow-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Home Swapping</h3>
                <p className="text-gray-600 mb-6">
                  Exchange your coastal property with other owners worldwide. Experience new destinations while earning from your own property.
                </p>
                <a href="#" className="inline-flex items-center text-purple-600 font-medium group/link">
                  Learn more 
                  <ArrowRight className="h-4 w-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Coast Planet Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to your perfect coastal getaway
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Search & Discover</h3>
              <p className="text-gray-600">
                Browse our curated collection of coastal properties. Filter by beachfront, ocean view, amenities, and more.
              </p>
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Book or Swap</h3>
              <p className="text-gray-600">
                Instantly book your perfect property or request a home swap with verified coastal property owners.
              </p>
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-200 to-transparent"></div>
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoy & Review</h3>
              <p className="text-gray-600">
                Enjoy your coastal escape with 24/7 support. Share your experience to help other travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Trusted by Travelers Worldwide
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join millions of travelers who choose Coast Planet for their coastal adventures. 
                Our platform prioritizes safety, quality, and unforgettable experiences.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Customer Support</h4>
                    <p className="text-gray-600">Our dedicated team is always here to help you.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Payments</h4>
                    <p className="text-gray-600">Bank-level security for all transactions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Global Network</h4>
                    <p className="text-gray-600">Properties in 50+ countries worldwide.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl p-8 text-white">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold">4.9</div>
                  <div className="flex justify-center space-x-1 mt-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <div className="mt-2 opacity-90">Based on 10,000+ reviews</div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      <div>
                        <div className="font-medium">Sarah Johnson</div>
                        <div className="text-sm opacity-80">Verified Traveler</div>
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      "Amazing beachfront villa in Santorini. The booking process was seamless!"
                    </p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      <div>
                        <div className="font-medium">Michael Chen</div>
                        <div className="text-sm opacity-80">Property Owner</div>
                      </div>
                    </div>
                    <p className="text-sm opacity-90">
                      "Home swapping through Coast Planet has been incredible. Highly recommended!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Your Coastal Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of travelers discovering amazing coastal properties worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button 
                size="large"
                className="bg-white text-blue-600 border-0 hover:bg-gray-100 h-14 px-8 text-lg font-medium"
              >
                Start Exploring
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                size="large"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 h-14 px-8 text-lg font-medium"
              >
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>      </section>
    </div>
  );
};

export default LandingPage;
