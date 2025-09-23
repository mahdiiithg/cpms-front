'use client';

import { useState } from 'react';
import { Button, Dropdown, Avatar } from 'antd';
import { useSession, signOut } from 'next-auth/react';
import {
  Waves,
  Menu,
  X,
  ChevronDown,
  Home,
  Building,
  Settings,
  Users,
  Phone,
  ChevronRight,
  User,
  LogOut,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedItem, setMobileExpandedItem] = useState(null);
  const { data: session } = useSession();

  const navigationItems = [
    {
      id: 'buy',
      label: 'Buy',
      href: '/buy',
      icon: <Home className="h-5 w-5" />,
      description: 'Find your dream property',
      sections: [
        {
          title: 'Property Types',
          items: ['Villas', 'Apartments', 'Penthouses', 'Townhouses'],
        },
      ],
    },
    // {
    //   id: 'rent',
    //   label: 'Rent',
    //   href: '/rent',
    //   icon: <Building className="h-5 w-5" />,
    //   description: 'Discover amazing rental properties',
    //   sections: [
    //     {
    //       title: 'Rental Types',
    //       items: [
    //         'Short Term',
    //         'Long Term',
    //         'Vacation Rentals',
    //         'Corporate Housing',
    //       ],
    //     },
    //     {
    //       title: 'Amenities',
    //       items: ['Pool', 'Gym', 'Spa', 'Concierge'],
    //     },
    //     { title: 'Duration', items: ['Daily', 'Weekly', 'Monthly', 'Yearly'] },
    //   ],
    // },
    // {
    //   id: 'commercial',
    //   label: 'Commercial',
    //   href: '/commercial',
    //   icon: <Briefcase className="h-5 w-5" />,
    //   description: 'Commercial real estate opportunities',
    //   sections: [
    //     {
    //       title: 'Property Types',
    //       items: ['Offices', 'Retail', 'Hotels', 'Restaurants'],
    //     },
    //     {
    //       title: 'Investment',
    //       items: ['REITs', 'Direct Investment', 'Partnerships', 'Development'],
    //     },
    //     {
    //       title: 'Services',
    //       items: ['Valuation', 'Management', 'Consultation', 'Analysis'],
    //     },
    //   ],
    // },
    // {
    //   id: 'off-plan',
    //   label: 'Off-Plan',
    //   href: '/off-plan',
    //   icon: <MapPin className="h-5 w-5" />,
    //   description: 'Invest in future developments',
    //   sections: [
    //     {
    //       title: 'New Projects',
    //       items: [
    //         'Oceanfront Towers',
    //         'Beach Villas',
    //         'Marina District',
    //         'Island Resort',
    //       ],
    //     },
    //     {
    //       title: 'Developers',
    //       items: [
    //         'Premium Builders',
    //         'Luxury Developers',
    //         'Eco-Friendly',
    //         'Smart Homes',
    //       ],
    //     },
    //     {
    //       title: 'Timeline',
    //       items: [
    //         '2024 Delivery',
    //         '2025 Delivery',
    //         '2026 Delivery',
    //         'Future Projects',
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: 'luxury',
    //   label: 'Luxury',
    //   href: '/luxury',
    //   icon: <Crown className="h-5 w-5" />,
    //   description: 'Exclusive luxury properties',
    //   sections: [
    //     {
    //       title: 'Exclusive Properties',
    //       items: [
    //         'Private Islands',
    //         'Mega Mansions',
    //         'Penthouse Suites',
    //         'Historic Estates',
    //       ],
    //     },
    //     {
    //       title: 'Premium Services',
    //       items: [
    //         'Concierge',
    //         'Private Chef',
    //         'Yacht Access',
    //         'Helicopter Pad',
    //       ],
    //     },
    //     {
    //       title: 'Locations',
    //       items: [
    //         'Private Beaches',
    //         'Golf Courses',
    //         'Wine Estates',
    //         'Mountain Retreats',
    //       ],
    //     },
    //   ],
    // },
    // {
    //   id: 'international',
    //   label: 'International',
    //   href: '/international',
    //   icon: <Globe className="h-5 w-5" />,
    //   description: 'Global coastal properties',
    //   sections: [
    //     {
    //       title: 'Destinations',
    //       items: [
    //         'Caribbean',
    //         'Mediterranean',
    //         'Pacific Coast',
    //         'Atlantic Shores',
    //       ],
    //     },
    //     {
    //       title: 'Countries',
    //       items: ['United States', 'Spain', 'France', 'Australia'],
    //     },
    //     {
    //       title: 'Investment',
    //       items: [
    //         'Citizenship Programs',
    //         'Residency Permits',
    //         'Tax Benefits',
    //         'Portfolio Diversification',
    //       ],
    //     },
    //   ],
    // },
    {
      id: 'services',
      label: 'Services',
      href: '/services',
      icon: <Settings className="h-5 w-5" />,
      description: 'Professional property services',
      sections: [
        // {
        //   title: 'Property Management',
        //   items: [
        //     'Rental Management',
        //     'Maintenance',
        //     'Tenant Screening',
        //     'Financial Reporting',
        //   ],
        // },
        // {
        //   title: 'Investment Services',
        //   items: [
        //     'Market Analysis',
        //     'Portfolio Management',
        //     'ROI Optimization',
        //     'Exit Strategies',
        //   ],
        // },
        // {
        //   title: 'Additional Services',
        //   items: [
        //     'Interior Design',
        //     'Legal Services',
        //     'Insurance',
        //     'Home Staging',
        //   ],
        // },
      ],
    },
    // {
    //   id: 'insights',
    //   label: 'Insights',
    //   href: '/insights',
    //   icon: <BookOpen className="h-5 w-5" />,
    //   description: 'Market insights and trends',
    //   sections: [
    //     {
    //       title: 'Market Reports',
    //       items: [
    //         'Monthly Reports',
    //         'Annual Outlook',
    //         'Price Trends',
    //         'Investment Forecast',
    //       ],
    //     },
    //     {
    //       title: 'Research',
    //       items: [
    //         'Market Analysis',
    //         'Neighborhood Guides',
    //         'Investment Tips',
    //         'Buyer Guides',
    //       ],
    //     },
    //     {
    //       title: 'News',
    //       items: [
    //         'Market News',
    //         'Policy Updates',
    //         'Industry Trends',
    //         'Expert Opinions',
    //       ],
    //     },
    //   ],
    // },
    {
      id: 'about',
      label: 'About',
      href: '/about',
      icon: <Users className="h-5 w-5" />,
      description: 'Learn about Coast Planet',
      sections: [
        {
          title: 'Company',
          items: ['Our Story', 
            // 'Sustainability', 'Leadership Team',
             'Awards'],
        },
        // {
        //   title: 'Careers',
        //   items: ['Job Openings', 'Culture', 'Benefits', 'Internships'],
        // },
        // {
        //   title: 'Contact',
        //   items: [
        //     'Contact Us',
        //     'Office Locations',
        //     'Support',
        //     'Partnerships',
        //     'Media Inquiries',
        //   ],
        // },
      ],
    },
  ];

  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleDropdownEnter = () => {
    // Keep dropdown open when mouse enters the dropdown area
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileExpandedItem(null);
  };

  // User dropdown menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <User className="h-4 w-4" />,
      label: (
        <Link href="/dashboard/profile" className="flex items-center space-x-2">
          <span>Profile</span>
        </Link>
      ),
    },
    {
      key: 'dashboard',
      icon: <Home className="h-4 w-4" />,
      label: (
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span>Dashboard</span>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut className="h-4 w-4" />,
      label: 'Logout',
      onClick: () => signOut({ callbackUrl: '/' }),
      danger: true,
    },
  ];

  return (
    <div className="relative ">
      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-3 lg:py-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 transition-opacity hover:opacity-80 sm:space-x-3"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 sm:h-8 sm:w-8 lg:h-10 lg:w-10">
                <Waves className="h-3 w-3 text-white sm:h-4 sm:w-4 lg:h-6 lg:w-6" />
              </div>
              <span className="text-base font-bold text-gray-900 sm:text-lg lg:text-2xl">
                Coast Planet
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-0.5 sm:space-x-1 lg:flex">
              {navigationItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={item.href}>
                    <button
                      className={`flex items-center rounded-lg px-2 py-1.5 transition-all duration-300 ease-in-out sm:py-2 lg:py-2 ${
                        activeDropdown === item.id
                          ? 'scale-105 bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:scale-105 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <span className="text-sm font-medium transition-all duration-300 sm:text-base">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-3 w-3 transition-all duration-300 ease-in-out sm:h-4 sm:w-4 ${
                          activeDropdown === item.id
                            ? 'rotate-180 text-blue-600'
                            : 'group-hover:rotate-180 group-hover:text-blue-600'
                        }`}
                      />
                    </button>
                  </Link>

                  {/* Individual Dropdown for each item */}
                  {activeDropdown === item.id && (
                    <div className="animate-in slide-in-from-top-2 fade-in-0 fixed top-16 left-0 z-40 mt-0 w-full transform border-b border-gray-200 bg-white shadow-2xl duration-300">
                      <div className="animate-in slide-in-from-top-4 fade-in-0 transform px-3 py-4 transition-all duration-300 ease-out sm:px-4 sm:py-6 lg:px-8 lg:py-8">
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
                          {/* Main Content */}
                          <div className="animate-in slide-in-from-left-4 fade-in-0 transform transition-all delay-100 duration-500 lg:col-span-1">
                            <div className="mb-3 flex items-center space-x-2 sm:mb-4 sm:space-x-3">
                              <div className="transform rounded-lg bg-blue-100 p-1.5 transition-all duration-300 hover:scale-110 hover:bg-blue-200 sm:p-2">
                                {item.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">
                                  {item.label}
                                </h3>
                                <p className="text-xs text-gray-600 sm:text-sm">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <Link href={item.href}>
                              <Button
                                type="primary"
                                className="w-full transform border-0 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              >
                                Explore {item.label}
                              </Button>
                            </Link>
                          </div>

                          {/* Sections */}
                          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 lg:col-span-3 lg:gap-6">
                            {item.sections.map((section, index) => (
                              <div
                                key={index}
                                className={`animate-in slide-in-from-right-4 fade-in-0 transform transition-all duration-500 ease-out`}
                                style={{
                                  animationDelay: `${(index + 1) * 100}ms`,
                                }}
                              >
                                <h4 className="mb-2 text-sm font-semibold text-gray-900 sm:mb-3 sm:text-base">
                                  {section.title}
                                </h4>
                                <ul className="space-y-1 sm:space-y-2">
                                  {section.items.map((subItem, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className="transform transition-all duration-300 hover:translate-x-1"
                                    >
                                      <Link
                                        href={item.href}
                                        className="block transform py-0.5 text-xs text-gray-600 transition-all duration-300 hover:translate-x-1 hover:font-medium hover:text-blue-600 sm:py-1 sm:text-sm"
                                      >
                                        {subItem}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* User Profile Section - Show when logged in */}
              {session ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Button
                    type="text"
                    className="flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                  >
                    <Avatar
                      size="small"
                      icon={<UserCircle className="h-4 w-4" />}
                      src={session.user?.image}
                      className="bg-blue-600"
                    />
                    <span className="hidden sm:inline text-sm font-medium text-gray-700">
                      {session.user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className="h-3 w-3 text-gray-500" />
                  </Button>
                </Dropdown>
              ) : (
                // Login button for non-authenticated users
                <Button
                  type="primary"
                  className="hidden sm:block border-0 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg"
                  href="/auth/signin"
                >
                  Login
                </Button>
              )}
              
              <Button
                type="primary"
                className="hidden border-0 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-teal-700 hover:shadow-lg sm:block"
                onClick={() => {
                  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE?.replace(/\D/g, '');
                  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER?.replace(/\D/g, '') || adminPhone;
                  
                  if (!whatsappNumber) {
                    console.error('WhatsApp number not configured');
                    return;
                  }
                  
                  const message = encodeURIComponent(
                    `Hello Coast Planet, I would like to list my property on your platform. Please contact me to discuss the details and process.`
                  );
                  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
                  window.location.href = whatsappUrl;
                }}
              >
                <span className="hidden sm:inline">List Your Property</span>
                <span className="sm:hidden">List</span>
              </Button>
              <Button
                type="default"
                icon={
                  <Phone className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                }
                className="hidden border-blue-200 text-blue-600 transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:text-blue-700 hover:shadow-md sm:block"
                onClick={() => {
                  const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE?.replace(/\D/g, '');
                  if (!adminPhone) {
                    console.error('Admin phone number not configured');
                    return;
                  }
                  window.location.href = `tel:+${adminPhone}`;
                }}
              >
                <span className="hidden lg:inline">Contact Us</span>
                <span className="lg:hidden">Call</span>
              </Button>
              <div className='block lg:hidden  ' ><Button
                type="text"
                icon={
                  mobileMenuOpen ? (
                    <X className="h-5 w-5 rotate-180 transform transition-all duration-300 ease-in-out sm:h-6 sm:w-6" />
                  ) : (
                    <Menu className="h-5 w-5 transform transition-all duration-300 ease-in-out sm:h-6 sm:w-6" />
                  )
                }
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 transition-all duration-300 hover:scale-110 hover:bg-gray-100 sm:p-2 lg:hidden"
              /> </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="animate-in min-h-screen slide-in-from-top-4 fade-in-0 max-h-80 transform overflow-y-auto border-t border-gray-200 bg-white py-2 transition-all duration-300 ease-in-out sm:max-h-96 sm:py-3 lg:hidden">
              <nav className="flex flex-col space-y-1">
                {navigationItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-in slide-in-from-top-2 fade-in-0 transform transition-all duration-300 ease-out"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Main Item */}
                    <div className="flex items-center justify-between px-3 py-2 transition-colors duration-200 hover:bg-gray-50 sm:px-4 sm:py-2.5">
                      <Link
                        href={item.href}
                        className="flex flex-1 items-center space-x-2 sm:space-x-3"
                      >
                        <div className="flex items-center space-x-2 text-gray-700 transition-all duration-300 hover:translate-x-1 hover:text-blue-600 sm:space-x-3">
                          <div className="h-4 w-4 transition-transform duration-300 hover:scale-110 sm:h-5 sm:w-5">
                            {item.icon}
                          </div>
                          <span className="text-sm font-medium transition-all duration-300 sm:text-base">
                            {item.label}
                          </span>
                        </div>
                      </Link>
                      <Button
                        type="text"
                        icon={
                          <ChevronRight
                            className={`h-3 w-3 transition-all duration-300 ease-in-out sm:h-4 sm:w-4 ${
                              mobileExpandedItem === item.id
                                ? 'rotate-90 text-blue-600'
                                : 'hover:text-blue-600'
                            }`}
                          />
                        }
                        onClick={() =>
                          setMobileExpandedItem(
                            mobileExpandedItem === item.id ? null : item.id,
                          )
                        }
                        className="p-1 text-gray-400 hover:text-blue-600"
                      />
                    </div>

                    {/* Expanded Sections */}
                    {mobileExpandedItem === item.id && (
                      <div className="animate-in slide-in-from-top-2 fade-in-0 overflow-hidden transition-all duration-300 ease-in-out">
                        <div className="transform space-y-2 px-3 pb-2 transition-all duration-300 ease-out sm:space-y-3 sm:px-4 sm:pb-3">
                          {item.sections.map((section, sectionIndex) => (
                            <div
                              key={sectionIndex}
                              className="animate-in slide-in-from-left-2 fade-in-0 ml-4 transform transition-all duration-300 ease-out sm:ml-6 lg:ml-8"
                              style={{
                                animationDelay: `${sectionIndex * 100}ms`,
                              }}
                            >
                              <h5 className="mb-1.5 text-xs font-semibold text-gray-900 transition-colors duration-300 sm:mb-2 sm:text-sm">
                                {section.title}
                              </h5>
                              <div className="space-y-0.5 sm:space-y-1">
                                {section.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={item.href}
                                    className="block py-0.5 text-xs text-gray-600 transition-all duration-300 hover:translate-x-1 hover:font-medium hover:text-blue-600 sm:py-1 sm:text-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {subItem}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Action Buttons */}
                <div className="mt-3 space-y-2 border-t border-gray-200 px-3 pt-3 sm:mt-4 sm:space-y-3 sm:px-4 sm:pt-4">
                  {/* User Profile Section for Mobile */}
                  {session ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                        <Avatar
                          size="small"
                          icon={<UserCircle className="h-4 w-4" />}
                          src={session.user?.image}
                          className="bg-blue-600"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {session.user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {session.user?.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="default"
                        icon={<User className="h-3 w-3 sm:h-4 sm:w-4" />}
                        className="w-full text-sm"
                        href="/dashboard/profile"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Button>
                      <Button
                        type="default"
                        icon={<Home className="h-3 w-3 sm:h-4 sm:w-4" />}
                        className="w-full text-sm"
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Button>
                      <Button
                        type="default"
                        icon={<LogOut className="h-3 w-3 sm:h-4 sm:w-4" />}
                        className="w-full text-sm"
                        onClick={() => {
                          signOut({ callbackUrl: '/' });
                          setMobileMenuOpen(false);
                        }}
                        danger
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="primary"
                      className="w-full border-0 bg-gradient-to-r from-blue-600 to-teal-600 text-sm"
                      href="/auth/signin"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  )}
                  
                  <Button
                    type="primary"
                    className="w-full border-0 bg-gradient-to-r from-blue-600 to-teal-600 text-sm"
                    onClick={() => {
                      const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE?.replace(/\D/g, '');
                      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER?.replace(/\D/g, '') || adminPhone;
                      
                      if (!whatsappNumber) {
                        console.error('WhatsApp number not configured');
                        return;
                      }
                      
                      const message = encodeURIComponent(
                        `Hello Coast Planet, I would like to list my property on your platform. Please contact me to discuss the details and process.`
                      );
                      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
                      window.location.href = whatsappUrl;
                      setMobileMenuOpen(false);
                    }}
                  >
                    List Your Property
                  </Button>
                  <Button
                    type="default"
                    icon={<Phone className="h-3 w-3 sm:h-4 sm:w-4" />}
                    className="w-full text-sm"
                    onClick={() => {
                      const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE?.replace(/\D/g, '');
                      if (!adminPhone) {
                        console.error('Admin phone number not configured');
                        return;
                      }
                      window.location.href = `tel:+${adminPhone}`;
                      setMobileMenuOpen(false);
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
};

export default Header;
