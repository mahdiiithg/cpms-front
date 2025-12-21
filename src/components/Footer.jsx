import Link from 'next/link';
import { Waves, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] to-[#000000] text-white py-12 sm:py-16 lg:py-20 border-t border-gray-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-[#ccff00] to-[#ccff00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.6)]">
                <Waves className="h-5 w-5 sm:h-7 sm:w-7 text-[#171717]" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold">Coast Planet</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in coastal property management, delivering excellence since 1985.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3 text-gray-400 hover:text-[#ccff00] transition-colors group">
                <MapPin className="h-5 w-5 text-[#ccff00] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Vision Tower 42nd floor,<br />Business Bay, Miami</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-[#ccff00] transition-colors group">
                <Phone className="h-5 w-5 text-[#ccff00] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-[#ccff00] transition-colors group">
                <Mail className="h-5 w-5 text-[#ccff00] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@coastplanet.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] border border-gray-800 hover:border-[#ccff00] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#ccff00] transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] border border-gray-800 hover:border-[#ccff00] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#ccff00] transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] border border-gray-800 hover:border-[#ccff00] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#ccff00] transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#1a1a1a] border border-gray-800 hover:border-[#ccff00] rounded-lg flex items-center justify-center text-gray-400 hover:text-[#ccff00] transition-all duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ccff00]"></span>
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/buy" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  New Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Property Developers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ccff00]"></span>
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Property Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Sales & Consultancy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Mortgage Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Conveyancing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#ccff00]"></span>
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Our Management
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Our Agents
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#ccff00] transition-colors hover:translate-x-1 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-900 mt-12 sm:mt-16 pt-8 sm:pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm sm:text-base text-gray-400">
            © {new Date().getFullYear()} Coast Planet LLC. All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-[#ccff00] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-[#ccff00] transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-[#ccff00] transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-[#ccff00] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
