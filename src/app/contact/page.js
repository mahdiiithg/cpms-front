'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'antd';
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  ChevronRight,
  Building,
  Globe,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import ContactLeadForm from '@/components/contact/ContactLeadForm';
import {
  pageSurfaceClass,
  panelClass,
  detailCardClass,
  solidCtaClass,
  outlineCtaClass,
  iconWellClass,
} from '@/lib/brandTheme';
import {
  DEMO_ADMIN_PHONE,
  DEMO_WHATSAPP_NUMBER,
  digitsOnly,
  telHref,
  whatsappHref,
} from '@/lib/demoContact';
import { toast } from 'sonner';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Message sent. Our team will reply within 24 hours.');
    } finally {
      setSubmitting(false);
    }
  };

  const phoneDisplay = DEMO_ADMIN_PHONE;
  const phoneHref = telHref(DEMO_ADMIN_PHONE);
  const waHref = whatsappHref(
    'Hello Coast Planet, I would like to speak with your team.',
    DEMO_WHATSAPP_NUMBER,
  );

  const contactMethods = [
    {
      icon: Phone,
      title: 'Telephone',
      value: phoneDisplay,
      href: phoneHref,
      description: 'Call us directly',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'customercare@coastplanet.com',
      href: 'mailto:customercare@coastplanet.com',
      description: 'Send us an email',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      value: 'Message on WhatsApp',
      href: waHref,
      description: 'Chat with our team',
    },
  ];

  const officeLocations = [
    {
      city: 'Gold Coast',
      address: 'Surfers Paradise Blvd, Gold Coast QLD',
      phone: phoneDisplay,
      email: 'goldcoast@coastplanet.com',
      hours: 'Mon – Sun: 9:00 AM – 6:00 PM',
    },
    {
      city: 'Sydney',
      address: 'Coastal Precinct, Bondi NSW',
      phone: phoneDisplay,
      email: 'sydney@coastplanet.com',
      hours: 'Mon – Sun: 9:00 AM – 6:00 PM',
    },
    {
      city: 'Miami',
      address: 'Vision Tower, Business Bay, Miami',
      phone: phoneDisplay,
      email: 'miami@coastplanet.com',
      hours: 'Mon – Sun: 9:00 AM – 6:00 PM',
    },
  ];

  const services = [
    'Property Management',
    'Property Sales',
    'Property Rental',
    'Investment Consultation',
    'Property Valuation',
    'Legal Services',
    'Mortgage Services',
    'General Inquiry',
  ];

  const features = [
    {
      icon: CheckCircle,
      title: 'Expert Team',
      description: 'Experienced professionals with deep coastal market knowledge',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving coastal properties across key lifestyle markets',
    },
    {
      icon: Building,
      title: 'Full-service',
      description: 'Sales, leasing, and management under one roof',
    },
    {
      icon: Calendar,
      title: 'Always on',
      description: 'Responsive support when buyers and sellers need us',
    },
  ];

  return (
    <div className={pageSurfaceClass}>
      <div className="border-b border-cp-stroke bg-cp-raised/60 py-3">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 text-sm text-cp-subtle sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-cp-lime">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-cp-faint" />
          <span className="text-cp-lime">Contact</span>
        </div>
      </div>

      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-cp-lime/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex rounded-full border border-cp-lime/30 bg-cp-lime/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cp-lime">
            Contact
          </p>
          <h1 className="mb-4 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mx-auto max-w-3xl text-base text-cp-muted sm:text-lg">
            Seven days a week, our Coast Planet team is a call, email, or
            WhatsApp away for buyers, sellers, and property managers.
          </p>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.title}
                href={method.href}
                className={`${panelClass} block p-6 transition hover:border-cp-lime/40`}
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cp-lime/20 bg-cp-lime/10">
                  <Icon className="h-5 w-5 text-cp-lime" />
                </div>
                <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                <p className="mt-1 text-sm text-cp-subtle">{method.description}</p>
                <p className="mt-3 inline-flex items-center gap-1 font-medium text-cp-lime">
                  {method.value}
                  <ChevronRight className="h-4 w-4" />
                </p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-t border-cp-stroke py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:gap-14 sm:px-6 lg:px-8">
          <div className={`${panelClass} p-6 sm:p-8`}>
            <ContactLeadForm
              title="Schedule a call with our property consultants"
              subtitle="Fill out the form below and one of our experts will get back to you within 24 hours."
              services={services}
              onSubmit={handleSubmit}
              darkMode
            />
            {submitting ? (
              <p className="mt-2 text-xs text-cp-faint">Sending…</p>
            ) : null}
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
              Our office locations
            </h2>
            <p className="mb-6 text-cp-muted">
              Visit us or book an appointment with a coastal specialist.
            </p>
            <div className="space-y-4">
              {officeLocations.map((office) => (
                <div key={office.city} className={`${detailCardClass}`}>
                  <h3 className="mb-3 text-lg font-semibold text-white">
                    {office.city} Office
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 text-cp-muted">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cp-lime" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-cp-lime" />
                      <a
                        href={telHref(office.phone)}
                        className="text-cp-lime hover:underline"
                      >
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-cp-lime" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-cp-lime hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-cp-muted">
                      <Clock className="h-4 w-4 shrink-0 text-cp-lime" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-cp-stroke bg-cp-raised/40 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
              Why choose Coast Planet?
            </h2>
            <p className="mx-auto max-w-3xl text-cp-muted">
              Decades of coastal real estate expertise with modern tools and
              local relationships.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`${panelClass} p-6 text-center`}>
                  <div className={iconWellClass}>
                    <Icon className="h-5 w-5 text-cp-lime" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-cp-muted">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-cp-stroke py-12 sm:py-16">
        <div className={`${panelClass} mx-auto max-w-4xl px-6 py-10 text-center sm:px-10`}>
          <h2 className="mb-3 text-2xl font-semibold text-white sm:text-3xl">
            Ready to find your dream coastal property?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-cp-muted">
            Let our experts help you navigate the coastal market with
            confidence.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="large" className={solidCtaClass} href="/listings">
              Browse properties
            </Button>
            <Button size="large" className={outlineCtaClass} href={phoneHref}>
              Call now
            </Button>
          </div>
          <p className="mt-4 text-xs text-cp-faint">
            Demo line {phoneDisplay} · digits {digitsOnly(DEMO_ADMIN_PHONE)}
          </p>
        </div>
      </section>
    </div>
  );
}
