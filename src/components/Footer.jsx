import Link from 'next/link';
import { Waves, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-cp-stroke bg-gradient-to-b from-[#0a0a0a] to-[#000000] py-12 text-white sm:py-16 lg:py-20">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cp-lime/5 blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-cp-lime/5 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center space-x-2 sm:space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cp-lime shadow-[0_0_20px_rgba(204,255,0,0.55)] sm:h-12 sm:w-12">
                <Waves className="h-5 w-5 text-cp-surface sm:h-7 sm:w-7" />
              </div>
              <span className="text-2xl font-bold tracking-tight sm:text-3xl">Coast Planet</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-cp-subtle sm:text-base">
              Your trusted partner in coastal property management, delivering excellence since 1985.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3 text-cp-muted hover:text-cp-lime transition-colors group">
                <MapPin className="h-5 w-5 text-cp-lime flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Vision Tower 42nd floor,<br />Business Bay, Miami</span>
              </div>
              <div className="flex items-center space-x-3 text-cp-muted hover:text-cp-lime transition-colors group">
                <Phone className="h-5 w-5 text-cp-lime flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-cp-muted hover:text-cp-lime transition-colors group">
                <Mail className="h-5 w-5 text-cp-lime flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">info@coastplanet.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 border border-cp-stroke bg-cp-raised hover:border-cp-lime rounded-lg flex items-center justify-center text-cp-muted hover:text-cp-lime transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-cp-stroke bg-cp-raised hover:border-cp-lime rounded-lg flex items-center justify-center text-cp-muted hover:text-cp-lime transition-all duration-300 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-cp-stroke bg-cp-raised hover:border-cp-lime rounded-lg flex items-center justify-center text-cp-muted hover:text-cp-lime transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-cp-stroke bg-cp-raised hover:border-cp-lime rounded-lg flex items-center justify-center text-cp-muted hover:text-cp-lime transition-all duration-300 hover:scale-110">
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
                <Link href="/buy" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link href="/rent" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  New Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Property Developers
                </Link>
              </li>
              <li>
                <Link href="/list-your-property" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
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
                <Link href="/services" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Property Management
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Sales & Consultancy
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Mortgage Services
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
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
                <Link href="/about" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Our Management
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Our Agents
                </Link>
              </li>
              <li>
                <Link href="#" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="inline-block text-cp-muted transition-colors hover:translate-x-1 hover:text-cp-lime">
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
            <Link href="#" className="text-sm sm:text-base text-cp-muted hover:text-cp-lime transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm sm:text-base text-cp-muted hover:text-cp-lime transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="text-sm sm:text-base text-cp-muted hover:text-cp-lime transition-colors">
              Cookie Policy
            </Link>
            <Link href="#" className="text-sm sm:text-base text-cp-muted hover:text-cp-lime transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
