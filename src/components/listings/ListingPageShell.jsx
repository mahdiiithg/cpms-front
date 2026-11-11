'use client';

/**
 * Shared two-column layout: sticky filter sidebar + main results.
 */
export default function ListingPageShell({
  showFilters = false,
  sidebar,
  children,
}) {
  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {sidebar}
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
