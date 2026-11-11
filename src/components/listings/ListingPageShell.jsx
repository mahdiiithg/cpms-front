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
    <section className="py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {sidebar}
          </div>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
