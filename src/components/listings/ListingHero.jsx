'use client';

/**
 * Shared listings hero: title, supporting copy, search slot, optional footer (e.g. price pills).
 * Denser padding than the pre-audit buy/rent heroes so search + filters enter the viewport sooner.
 */
export default function ListingHero({
  title,
  description,
  children,
  footer,
  className = '',
}) {
  return (
    <section
      className={`bg-gradient-to-br from-[#171717] via-[#1a1a1a] to-[#171717] py-4 sm:py-5 lg:py-6 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="mb-3 text-center sm:mb-4">
          <h1 className="mb-2 text-2xl font-bold text-white sm:mb-2.5 sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mx-auto mb-3 max-w-3xl text-base text-gray-400 sm:mb-4 sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </div>
        {footer}
      </div>
    </section>
  );
}
