'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button } from 'antd';
import MRTopSearchBar from '@/components/management-rights/MRTopSearchBar';
import MRSidebarFilters from '@/components/management-rights/MRSidebarFilters';
import MRMobileFiltersDrawer from '@/components/management-rights/MRMobileFiltersDrawer';
import MRRegionChips from '@/components/management-rights/MRRegionChips';
import MRResultsHeader from '@/components/management-rights/MRResultsHeader';
import MRFeaturedSection from '@/components/management-rights/MRFeaturedSection';
import MRResultsGrid from '@/components/management-rights/MRResultsGrid';
import { managementRights } from '@/data/managementRightsData';
import MRPageHero from '@/components/management-rights/MRPageHero';

export default function OffThePlanManagementRightsPage() {
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [sortBy, setSortBy] = useState('date');
  const [listingType, setListingType] = useState('sale');
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extra flags (client-side checks using tags/features)
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasManagerUnit, setHasManagerUnit] = useState(false);
  const [flagProjected, setFlagProjected] = useState(false);
  const [flagCaretakingOnly, setFlagCaretakingOnly] = useState(false);
  const [flagBusinessOnly, setFlagBusinessOnly] = useState(false);

  const filters = useMemo(() => ({
    limit: pageSize,
    offset,
    listingStatus: 'active',
    minBedrooms: beds || undefined,
    minPrice: priceRange?.[0] || undefined,
    maxPrice: priceRange?.[1] || undefined,
    ...(listingType !== 'all' ? { listingType } : {}),
    ...(city ? { city } : {}),
    ...(suburb ? { suburb } : {}),
    sortBy,
    sortOrder: sortBy === 'date' ? 'desc' : 'asc',
  }), [pageSize, offset, beds, priceRange, sortBy, listingType, city, suburb]);

  const searchQuery = useMemo(() => {
    const base = 'off the plan management rights';
    const q = [base, keywords].filter(Boolean).join(' ');
    return q.trim();
  }, [keywords]);

  const { data, loading, error } = useQuery(SEARCH_PROPERTIES, {
    variables: { query: searchQuery, filters },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const res = data?.searchProperties;
  const properties = res?.properties || [];
  const total = res?.totalCount || 0;

  const featured = useMemo(() => properties.filter(p => p.featured).slice(0, 3), [properties]);
  const listingOfTheMonth = useMemo(() => featured[0] || null, [featured]);

  // Client-side additional filtering
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const tags = new Set((p.tags || []).map((t) => String(t).toLowerCase()));
      if (petFriendly && !tags.has('pet-friendly')) return false;
      if (hasManagerUnit && !tags.has('manager-unit')) return false;
      if (flagProjected && !(tags.has('projected') || (p.description||'').toLowerCase().includes('projected'))) return false;
      if (flagCaretakingOnly && !(tags.has('caretaking-only') || (p.title||'').toLowerCase().includes('caretaking'))) return false;
      if (flagBusinessOnly && !(tags.has('business-only') || (p.title||'').toLowerCase().includes('business only'))) return false;
      return true;
    });
  }, [properties, petFriendly, hasManagerUnit, flagProjected, flagCaretakingOnly, flagBusinessOnly]);

  const displayedTotal = filteredProperties.length;

  // Map flags to component shape
  const flags = {
    'Pet friendly': petFriendly,
    "Manager's unit": hasManagerUnit,
    'Projected': flagProjected,
    'Caretaking only': flagCaretakingOnly,
    'Business only': flagBusinessOnly,
  };
  const setFlags = (next) => {
    setPetFriendly(!!next['Pet friendly']);
    setHasManagerUnit(!!next["Manager's unit"]);
    setFlagProjected(!!next['Projected']);
    setFlagCaretakingOnly(!!next['Caretaking only']);
    setFlagBusinessOnly(!!next['Business only']);
  };

  const meta = managementRights.offThePlan;

  return (
    <div className="min-h-screen bg-[#171717]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/" className="text-gray-400 hover:text-[#ccff00]">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings" className="text-gray-400 hover:text-[#ccff00]">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item className="text-white">Off The Plan</Breadcrumb.Item>
      </Breadcrumb>

      <MRPageHero
        title={meta.title}
        subtitle={meta.subtitle}
        ctas={meta.heroCtas.map((cta, index) => ({ ...cta, variant: index === 0 ? 'primary' : 'secondary' }))}
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button type="primary">Off The Plan</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button>Rentals</Button></Link>
      </div>

      {/* Top search */}
      <MRTopSearchBar
        keywords={keywords}
        setKeywords={(v)=>{ setKeywords(v); setPage(1); }}
        beds={beds}
        setBeds={(v)=>{ setBeds(v); setPage(1); }}
        listingType={listingType}
        setListingType={(v)=>{ setListingType(v); setPage(1); }}
        city={city}
        setCity={(v)=>{ setCity(v); setPage(1); }}
        suburb={suburb}
        setSuburb={(v)=>{ setSuburb(v); setPage(1); }}
        onOpenMobileFilters={()=> setMobileFiltersOpen(true)}
        placeholder="e.g., Brisbane, new build, project"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:col-span-3">
          <MRSidebarFilters
            priceRange={priceRange}
            setPriceRange={(r)=> setPriceRange(r)}
            flags={flags}
            setFlags={setFlags}
            onApply={()=> setPage(1)}
            onReset={()=> setFlags({ 'Pet friendly': false, "Manager's unit": false, 'Projected': false, 'Caretaking only': false, 'Business only': false })}
            title="Refine Results"
            priceLabel="Price range (sale)"
            featuresLabel="Attributes"
          />
        </aside>

        {/* Results panel */}
        <div className="md:col-span-9">
          <div className="flex items-center justify-between mb-4">
            <MRResultsHeader loading={loading} total={displayedTotal} sortBy={sortBy} setSortBy={(v)=>{ setSortBy(v); setPage(1); }} />
            <Button href="#" size="small">Print stocklist (PDF)</Button>
          </div>

          {/* Region chips */}
          <MRRegionChips
            regions={meta.regions}
            active={city}
            onSelect={(r)=>{ setCity(r); setPage(1); }}
          />

          {/* Featured + Listing of the Month */}
          <MRFeaturedSection
            listingOfTheMonth={listingOfTheMonth}
            featured={featured.slice(1, 4)}
            title="Featured Off The Plan Opportunities"
          />

          {/* Results grid */}
          <MRResultsGrid
            loading={loading}
            error={error}
            properties={filteredProperties}
            page={page}
            total={total}
            pageSize={pageSize}
            onChangePage={setPage}
          />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <MRMobileFiltersDrawer
        open={mobileFiltersOpen}
        onClose={()=> setMobileFiltersOpen(false)}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        flags={flags}
        setFlags={setFlags}
        onApply={()=>{ setMobileFiltersOpen(false); setPage(1); }}
        onReset={()=> setFlags({ 'Pet friendly': false, "Manager's unit": false, 'Projected': false, 'Caretaking only': false, 'Business only': false })}
        title="Refine Results"
        priceLabel="Price range (sale)"
        featuresLabel="Attributes"
      />

      {/* Informational sections (mirroring structure) */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">What does Off The Plan mean?</h2>
            <p className="text-gray-700">Off the plan projects are developments sold before construction is completed. Opportunities can include caretaking and letting agreements established at settlement.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Why consider Off The Plan?</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Position early in growth areas and flagship projects.</li>
              <li>Shape operational design and systems from day one.</li>
              <li>Leverage developer presales momentum and marketing.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How it works</h2>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              <li>Review disclosure material and scheme structure.</li>
              <li>Engage legal and finance advisors experienced in MR.</li>
              <li>Plan operational setup and recruitment before settlement.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Industry News</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Queensland’s seller disclosure changes explained</li>
              <li>Building your MR business: practical tips</li>
              <li>AML/CTF updates and what they mean for agents</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">Upcoming Events</h2>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Strata seminar – Brisbane</li>
              <li>Strata seminar – Cairns</li>
              <li>MR Industry Training Program – Gold Coast</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">Find an Industry Supplier</h2>
            <p className="text-gray-400 text-sm">Tell us what you need and we'll connect you with leading MR brokers and suppliers.</p>
            <div className="flex gap-2 max-w-md">
              <input className="bg-[#212121] border border-gray-700 rounded px-3 py-2 flex-1 text-white placeholder:text-gray-500 focus:border-[#ccff00] focus:outline-none" placeholder="What do you need done?" />
              <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold">Get quotes</Button>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Don't miss out!</h3>
            <p className="text-gray-400 mb-3 text-sm">Receive monthly industry news and new listings.</p>
            <div className="flex gap-2">
              <input className="bg-[#212121] border border-gray-700 rounded px-3 py-2 flex-1 text-white placeholder:text-gray-500 focus:border-[#ccff00] focus:outline-none" placeholder="Your email" />
              <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold">Subscribe</Button>
            </div>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Talk to an MR Specialist</h3>
            <p className="text-gray-400 mb-3">Questions about off the plan? Our team can assist.</p>
            <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold" href="/contact">Request a callback</Button>
          </div>
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Useful Links</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li><Link href="/rentals-property" className="hover:text-[#ccff00]">Units For Rent</Link></li>
              <li><Link href="/investment-property" className="hover:text-[#ccff00]">Investment Property</Link></li>
              <li><Link href="/listings" className="hover:text-[#ccff00]">Management Rights</Link></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
    </div>
  );
}
