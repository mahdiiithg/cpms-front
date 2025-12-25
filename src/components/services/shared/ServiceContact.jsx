'use client';

import { Button } from 'antd';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import EnquiryForm from '@/components/services/forms/EnquiryForm';

export default function ServiceContact({ 
  title = "Let's work together", 
  subtitle = "Book a free consultation and discover how we can help.",
  context,
  badge = "Ready to get started?"
}) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-16 text-white"
    >
      {/* Animated Neon Balloons */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-[#ccff00]/30 to-[#ccff00]/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-float-delayed rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-72 w-72 animate-pulse-slow rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-3xl" />
      </div>

      {/* Glass Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/20 to-[#171717]/40 backdrop-blur-[2px]"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-block animate-fade-in rounded-full border border-[#ccff00]/20 bg-[#ccff00]/10 px-5 py-2 text-sm font-semibold text-[#ccff00]">
            {badge}
          </div>
          <h3 className="mb-4 animate-slide-up text-3xl font-bold drop-shadow-[0_0_20px_rgba(204,255,0,0.3)] md:text-5xl">
            {title}
          </h3>
          <p className="mx-auto animate-slide-up-delayed max-w-2xl text-lg text-gray-300">
            {subtitle}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="animate-fade-in rounded-2xl border border-gray-800 bg-[#212121]/40 p-6 backdrop-blur-lg">
            <EnquiryForm
              context={context}
              variant="dark"
              fields={[
                {
                  name: 'name',
                  label: 'Full name',
                  required: true,
                  type: 'input',
                  placeholder: 'Jane Doe',
                },
                {
                  name: 'email',
                  label: 'Email',
                  required: true,
                  type: 'email',
                  placeholder: 'you@example.com',
                },
                {
                  name: 'phone',
                  label: 'Phone',
                  type: 'input',
                  placeholder: '+1 555 123 4567',
                },
                {
                  name: 'message',
                  label: 'Message',
                  type: 'textarea',
                  rows: 4,
                  placeholder: 'Tell us about your needs',
                },
              ]}
            />
            <div className="mt-6 text-center">
              <Button
                className="h-12 rounded-xl border-2 border-[#ccff00] bg-transparent font-semibold text-[#ccff00] transition-all duration-300 hover:bg-[#ccff00] hover:text-[#171717]"
                href="https://wa.me/your-number"
                target="_blank"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Contact via WhatsApp
              </Button>
            </div>
          </div>
          <div className="animate-fade-in-delayed rounded-2xl border border-gray-800 bg-[#212121]/30 p-6 backdrop-blur-lg">
            <div className="mb-4 flex items-center gap-2 text-gray-300">
              <Phone className="h-5 w-5 text-[#ccff00]" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-gray-300">
              <Mail className="h-5 w-5 text-[#ccff00]" />
              <span>services@coastplanet.com</span>
            </div>
            <p className="text-gray-400">
              Prefer messaging? Use WhatsApp for a quick response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
