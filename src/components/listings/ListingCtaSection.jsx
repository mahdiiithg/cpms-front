'use client';

import { Button } from 'antd';

export default function ListingCtaSection({
  title = "Can't find what you're looking for?",
  description = 'Our experts can help you find the perfect property that matches your requirements.',
  primaryHref = '/contact',
  primaryLabel = 'Contact an Agent',
  secondaryLabel = 'Create Property Alert',
  onSecondaryClick,
}) {
  return (
    <section className="border-t border-gray-800 bg-[#1a1a1a] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
          {title}
        </h2>
        <p className="mb-6 text-sm text-gray-400 sm:mb-8 sm:text-base">
          {description}
        </p>
        <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
          <Button
            type="default"
            size="large"
            className="flex-1 bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
            href={primaryHref}
          >
            {primaryLabel}
          </Button>
          <Button
            type="default"
            size="large"
            className="flex-1 bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
