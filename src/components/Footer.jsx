import Link from 'next/link';
import { Waves } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Waves className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">Coast Planet</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
              Vision Tower 42nd floor, Business Bay, Miami
            </p>
            <p className="text-sm sm:text-base text-gray-400">+1 (555) 123-4567</p>
          </div>

          {/* Explore Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Explore</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-400">
              <li>
                <Link href="/buy" className="hover:text-white transition-colors">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-white transition-colors">
                  Rent
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  New Projects
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Property Developers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-400">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Property Management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Development Sales and Consultancy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Mortgage Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Conveyancing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Coast Planet</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our Management
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our Agents
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm sm:text-base text-gray-400">
            © Coast Planet LLC. All Rights Reserved
          </p>
          <div className="flex space-x-4 sm:space-x-6 mt-3 sm:mt-4 md:mt-0">
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="#" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
