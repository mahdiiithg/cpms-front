'use client';

import { useState } from 'react';
import { Button, Input, Form, Select, Row, Col, Card } from 'antd';
import { 
  Phone, 
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  User,
  Building,
  Globe,
  Calendar,
  CheckCircle
} from 'lucide-react';
import ContactLeadForm from '@/components/contact/ContactLeadForm';

const { Option } = Select;
const { TextArea } = Input;

export default function ContactPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      console.log('Form submitted:', values);
      form.resetFields();
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Telephone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
      description: "Call us directly"
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      value: "customercare@coastplanet.com",
      href: "mailto:customercare@coastplanet.com",
      description: "Send us an email"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "WhatsApp",
      value: "Click to WhatsApp",
      href: "https://api.whatsapp.com/send?phone=15551234567",
      description: "Message us on WhatsApp"
    }
  ];

  const officeLocations = [
    {
      city: "Miami",
      address: "Vision Tower 42nd floor, Business Bay, Miami",
      phone: "+1 (555) 123-4567",
      email: "miami@coastplanet.com",
      hours: "Mon - Sun: 9:00 AM - 6:00 PM"
    },
    {
      city: "Malibu",
      address: "Pacific Coast Highway, Suite 300, Malibu, CA",
      phone: "+1 (555) 123-4568",
      email: "malibu@coastplanet.com",
      hours: "Mon - Sun: 9:00 AM - 6:00 PM"
    },
    {
      city: "Newport Beach",
      address: "Newport Center Drive, Suite 200, Newport Beach, CA",
      phone: "+1 (555) 123-4569",
      email: "newport@coastplanet.com",
      hours: "Mon - Sun: 9:00 AM - 6:00 PM"
    }
  ];

  const services = [
    "Property Management",
    "Property Sales",
    "Property Rental",
    "Investment Consultation",
    "Property Valuation",
    "Legal Services",
    "Mortgage Services",
    "General Inquiry"
  ];

  return (
    <div className="min-h-screen bg-white">      {/* Breadcrumb */}
      <div className="bg-gray-50 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-blue-600">Contact</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              CONTACT
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              We're here to help
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Seven days a week, 365 days of the year, our friendly, expert team is just a phone call or email away.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 bg-blue-50 rounded-lg">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                    <a 
                      href={method.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                    >
                      {method.value}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <ContactLeadForm
                title="Schedule a call with our property consultants"
                subtitle="Fill out the form below and one of our experts will get back to you within 24 hours."
                services={services}
                onSubmit={handleSubmit}
              />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Office Locations
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8">
                Visit us at any of our locations or schedule an appointment with our team.
              </p>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                        {office.city} Office
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{office.address}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-700">
                            {office.phone}
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="text-blue-600 hover:text-blue-700">
                            {office.email}
                          </a>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">{office.hours}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Coast Planet?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              With decades of experience in coastal real estate, we provide unparalleled service and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                title: "Expert Team",
                description: "Experienced professionals with deep market knowledge"
              },
              {
                icon: <Globe className="h-8 w-8 text-blue-600" />,
                title: "Global Reach",
                description: "Serving coastal properties across multiple countries"
              },
              {
                icon: <Building className="h-8 w-8 text-blue-600" />,
                title: "Comprehensive Services",
                description: "Full-service real estate solutions under one roof"
              },
              {
                icon: <Calendar className="h-8 w-8 text-blue-600" />,
                title: "24/7 Support",
                description: "Always available when you need us most"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-3 sm:px-4 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
            Ready to find your dream coastal property?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 mb-6 sm:mb-8">
            Let our experts help you navigate the coastal real estate market with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button type="default" size="large" className="flex-1">
              Browse Properties
            </Button>
            <Button type="default" size="large" className="flex-1" href="tel:+15551234567">
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
