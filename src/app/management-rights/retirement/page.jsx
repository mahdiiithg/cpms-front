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

export default function RetirementManagementRightsPage() {
  const meta = managementRights.retirement;
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('date');
  const [listingType, setListingType] = useState('sale');
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Extra filters (client-side for now)
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasManagerUnit, setHasManagerUnit] = useState(false);
  const [featurePool, setFeaturePool] = useState(false);
  const [featureGym, setFeatureGym] = useState(false);
  const [featureAccessible, setFeatureAccessible] = useState(false);

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
    const base = 'retirement management rights';
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

  // Apply client-side filters based on tags/features
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const tags = new Set((p.tags || []).map((t) => String(t).toLowerCase()));
      if (petFriendly && !tags.has('pet-friendly')) return false;
      if (hasManagerUnit && !tags.has('manager-unit')) return false;
      if (featurePool && !(p.features || []).some((f) => String(f).toLowerCase().includes('pool'))) return false;
      if (featureGym && !(p.features || []).some((f) => String(f).toLowerCase().includes('gym'))) return false;
      if (featureAccessible && !(p.tags || []).some((t) => String(t).toLowerCase().includes('accessible'))) return false;
      return true;
    });
  }, [properties, petFriendly, hasManagerUnit, featurePool, featureGym, featureAccessible]);

  const displayedTotal = filteredProperties.length;
  const listingOfTheMonth = useMemo(() => featured[0] || null, [featured]);

  const flags = {
    'Pet friendly': petFriendly,
    "Manager's unit": hasManagerUnit,
    'Pool': featurePool,
    'Gym': featureGym,
    'Accessible': featureAccessible,
  };
  const setFlags = (next) => {
    // Map UI flags back to state
    setPetFriendly(!!next['Pet friendly']);
    setHasManagerUnit(!!next["Manager's unit"]);
    setFeaturePool(!!next['Pool']);
    setFeatureGym(!!next['Gym']);
    setFeatureAccessible(!!next['Accessible']);
  };

  return (
    <div className="min-h-screen bg-[#171717]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/" className="text-gray-400 hover:text-[#ccff00]">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings" className="text-gray-400 hover:text-[#ccff00]">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item className="text-white">Retirement</Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#212121] rounded-xl p-6 mb-6 border border-gray-800 shadow-[0_0_30px_rgba(204,255,0,0.1)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">{meta.title}</h1>
            <p className="mt-1 text-gray-300 max-w-2xl">{meta.subtitle}</p>
          </div>
          <div className="flex gap-2">
            {meta.heroCtas.map((c) => (
              <Link key={c.href} href={c.href}><Button>{c.label}</Button></Link>
            ))}
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button type="primary">Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button>Off The Plan</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button>Rentals</Button></Link>
      </div>

      {/* Top search and mobile filters trigger */}
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
        onOpenMobileFilters={()=>setMobileFiltersOpen(true)}
        placeholder="e.g., community, onsite, Brisbane"
      />

      {/* Main grid with sidebar filters + results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:col-span-3">
          <MRSidebarFilters
            priceRange={priceRange}
            setPriceRange={(r)=>{ setPriceRange(r); }}
            flags={flags}
            setFlags={setFlags}
            onApply={()=> setPage(1)}
            onReset={()=>{
              setFlags({ 'Pet friendly': false, "Manager's unit": false, 'Pool': false, 'Gym': false, 'Accessible': false });
            }}
          />
        </aside>

        {/* Results panel */}
        <div className="md:col-span-9">
          <MRResultsHeader loading={loading} total={displayedTotal} sortBy={sortBy} setSortBy={(v)=>{ setSortBy(v); setPage(1); }} />

          {/* Browse by region */}
          <MRRegionChips regions={meta.regions} active={city} onSelect={(r)=>{ setCity(r); setPage(1); }} />

          <MRFeaturedSection
            listingOfTheMonth={listingOfTheMonth}
            featured={featured.slice(1, 4)}
            title="Featured Retirement Opportunities"
          />

          {/* Results */}
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
        onReset={()=>{ setFlags({ 'Pet friendly': false, "Manager's unit": false, 'Pool': false, 'Gym': false, 'Accessible': false }); }}
      />

      {/* Informational sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">What are Retirement Management Rights?</h2>
            <p className="text-gray-400">These rights involve managing retirement living complexes with a focus on resident wellbeing, compliance, and consistent service standards.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">Why consider Retirement MR?</h2>
            <ul className="list-disc ml-5 text-gray-400 space-y-1">
              <li>Stable occupancy dynamics and predictable operations.</li>
              <li>Service-led roles with strong community engagement.</li>
              <li>Clear compliance frameworks and documented processes.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">How the process works</h2>
            <ol className="list-decimal ml-5 text-gray-400 space-y-1">
              <li>Review agreements, duties, and remuneration models.</li>
              <li>Run financial, legal, and compliance due diligence.</li>
              <li>Secure appropriate finance and plan transition.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">FAQs</h2>
            <div className="space-y-3">
              <div><p className="font-medium text-white">What qualifications help?</p><p className="text-gray-400">Operational management, compliance, and strong communication are valuable skillsets.</p></div>
              <div><p className="font-medium text-white">How is resident support managed?</p><p className="text-gray-400">Support processes are outlined by operators and regulators; on-site teams coordinate services.</p></div>
              <div><p className="font-medium text-white">Are there specific regulations?</p><p className="text-gray-400">Yes, frameworks vary by state and provider; advisors can guide the detail.</p></div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Talk to an MR Specialist</h3><p className="text-gray-400 mb-3">Questions about retirement rights? Our team can assist.</p><Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold" href="/contact">Request a callback</Button></div>
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Resources</h3><ul className="list-disc ml-5 text-gray-400 space-y-1"><li>Compliance overview</li><li>Operator handbook</li><li>Due diligence guide</li></ul></div>
        </aside>
      </div>
    </div>
    </div>
  );
}
