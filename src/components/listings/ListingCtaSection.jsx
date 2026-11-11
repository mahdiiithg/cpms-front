'use client';

import { Button } from 'antd';
import { outlineCtaClass, solidCtaClass } from '@/lib/brandTheme';

export default function ListingCtaSection({
  title = "Can't find what you're looking for?",
  description = 'Our experts can help you find the perfect property that matches your requirements.',
  primaryHref = '/contact',
  primaryLabel = 'Contact an Agent',
  secondaryLabel = 'Create Property Alert',
  onSecondaryClick,
}) {
  return (
    <section className="border-t border-cp-stroke bg-cp-raised py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-3 text-center sm:px-4 lg:px-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white sm:mb-6 sm:text-3xl">
          {title}
        </h2>
        <p className="mb-6 text-sm text-cp-subtle sm:mb-8 sm:text-base">
          {description}
        </p>
        <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
          <Button
            type="default"
            size="large"
            className={`flex-1 ${outlineCtaClass}`}
            href={primaryHref}
          >
            {primaryLabel}
          </Button>
          <Button
            type="default"
            size="large"
            className={`flex-1 ${solidCtaClass}`}
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
