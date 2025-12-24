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
import MRPageHero from '@/components/management-rights/MRPageHero';

export default function RentalsPropertyPage() {
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('date');
  const [listingType, setListingType] = useState('rent');
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Rentals-specific flags
  const [flagPets, setFlagPets] = useState(false);
  const [flagFurnished, setFlagFurnished] = useState(false);
  const [flagAirCon, setFlagAirCon] = useState(false);
  const [flagParking, setFlagParking] = useState(false);
  const [flagPool, setFlagPool] = useState(false);
  const [flagAccessible, setFlagAccessible] = useState(false);

  const filters = useMemo(() => ({
    limit: pageSize,
    offset,
    listingStatus: 'active',
    listingType: 'rent',
    minBedrooms: beds || undefined,
    minPrice: priceRange?.[0] || undefined,
    maxPrice: priceRange?.[1] || undefined,
    ...(city ? { city } : {}),
    ...(suburb ? { suburb } : {}),
    sortBy,
    sortOrder: sortBy === 'date' ? 'desc' : 'asc',
  }), [pageSize, offset, beds, priceRange, sortBy, city, suburb]);

  const searchQuery = useMemo(() => {
    const base = 'rental property';
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
  const featured = useMemo(() => properties.filter((p) => p.featured).slice(0, 4), [properties]);

  // Client-side flags mapped to tags/features
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const tags = (p.tags || []).map((t) => String(t).toLowerCase());
      const features = (p.features || []).map((f) => String(f).toLowerCase());
      if (flagPets && !(tags.includes('pet-friendly') || !tags.includes('no-pet'))) return false;
      if (flagFurnished && !(tags.includes('furnished') || features.some((f) => f.includes('furnished')))) return false;
      if (flagAirCon && !features.some((f) => f.includes('air') || f.includes('ac') || f.includes('conditioning'))) return false;
      if (flagParking && !features.some((f) => f.includes('car') || f.includes('garage') || f.includes('parking'))) return false;
      if (flagPool && !features.some((f) => f.includes('pool'))) return false;
      if (flagAccessible && !(tags.includes('accessible') || features.some((f) => f.includes('accessible') || f.includes('lift')))) return false;
      return true;
    });
  }, [properties, flagPets, flagFurnished, flagAirCon, flagParking, flagPool, flagAccessible]);

  const displayedTotal = filteredProperties.length;
  const listingOfTheMonth = useMemo(() => featured[0] || null, [featured]);
  const heroCtas = useMemo(() => ([
    { label: 'Management Rights', href: '/management-rights/permanent', variant: 'secondary' },
    { label: 'Investment', href: '/investment-property', variant: 'secondary' },
  ]), []);

  const flags = {
    'Pet friendly': flagPets,
    'Furnished': flagFurnished,
    'Air conditioning': flagAirCon,
    'Parking': flagParking,
    'Pool': flagPool,
    'Accessible': flagAccessible,
  };
  const setFlags = (next) => {
    setFlagPets(!!next['Pet friendly']);
    setFlagFurnished(!!next['Furnished']);
    setFlagAirCon(!!next['Air conditioning']);
    setFlagParking(!!next['Parking']);
    setFlagPool(!!next['Pool']);
    setFlagAccessible(!!next['Accessible']);
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 text-sm">
          <Breadcrumb.Item><Link href="/" className="text-gray-400 hover:text-[#ccff00]">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link href="/listings" className="text-gray-400 hover:text-[#ccff00]">Property Listings</Link></Breadcrumb.Item>
          <Breadcrumb.Item className="text-white">Rentals</Breadcrumb.Item>
        </Breadcrumb>

        <MRPageHero
          title="Rentals"
          subtitle="Find your next home. Browse rentals across Brisbane, Gold Coast, Sunshine Coast and beyond."
          ctas={heroCtas}
        />

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/management-rights/permanent"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Permanent</Button></Link>
          <Link href="/management-rights/resort-holiday"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Resort | Holiday</Button></Link>
          <Link href="/management-rights/retirement"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Retirement</Button></Link>
          <Link href="/management-rights/off-the-plan"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Off The Plan</Button></Link>
          <Link href="/investment-property"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Investment Property</Button></Link>
          <Link href="/rentals-property"><Button className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)]">Rentals</Button></Link>
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
        placeholder="e.g., near transport, pets, AC"
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
              setFlags({ 'Pet friendly': false, 'Furnished': false, 'Air conditioning': false, 'Parking': false, 'Pool': false, 'Accessible': false });
            }}
            title="Refine Results"
            priceLabel="Weekly budget ($)"
            featuresLabel="Features"
          />
        </aside>

        {/* Results panel */}
        <div className="md:col-span-9">
          <div className="flex items-center justify-between mb-3">
            <a
              href="#"
              className="text-sm text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]"
              onClick={(e)=>{ e.preventDefault(); if (typeof window !== 'undefined') window.print(); }}
            >
              Print stocklist of top results
            </a>
          </div>

          <MRResultsHeader loading={loading} total={displayedTotal} sortBy={sortBy} setSortBy={(v)=>{ setSortBy(v); setPage(1); }} />

          {/* Browse by region */}
          <MRRegionChips regions={[ 'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns', 'Townsville', 'Toowoomba' ]} active={city} onSelect={(r)=>{ setCity(r); setPage(1); }} />

          {/* Listing of the Month + featured */}
          <MRFeaturedSection
            listingOfTheMonth={listingOfTheMonth}
            featured={featured.slice(1, 4)}
            title="Listing of the Month"
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
        onReset={()=>{ setFlags({ 'Pet friendly': false, 'Furnished': false, 'Air conditioning': false, 'Parking': false, 'Pool': false, 'Accessible': false }); }}
        title="Refine Results"
        priceLabel="Weekly budget ($)"
        featuresLabel="Features"
      />

      {/* Informational sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Industry news</h2>
            <p className="text-gray-400">Latest tenancy updates, market insights, and rental trends from industry experts.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Employment opportunities</h2>
            <p className="text-gray-400">Discover roles in property management, leasing, and operations.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Upcoming events</h2>
            <p className="text-gray-400">See upcoming seminars and training events relevant to tenants and managers.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Find an industry supplier</h2>
            <p className="text-gray-400">Get quotes from trusted service providers across the industry.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Useful links</h2>
            <ul className="list-disc ml-5 text-gray-400 space-y-1">
              <li><Link href="/rentals-property" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Units For Rent</Link></li>
              <li><Link href="/investment-property" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Investment Property</Link></li>
              <li><Link href="/management-rights/permanent" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Management Rights</Link></li>
              <li><Link href="/contact" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Contact Us</Link></li>
            </ul>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Don't miss out</h3><p className="text-gray-400 mb-3">Receive monthly industry news updates from leading professionals.</p><Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold" href="/subscribe">Subscribe</Button></div>
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Contact details</h3><p className="text-gray-400">For enquiries about listings or services, reach out to our team.</p><div className="text-sm text-gray-500 mt-2">Office: 111 Example St, City 4000<br/>Call: +61 7 0000 0000<br/>Mail: info@example.com</div></div>
        </aside>
      </div>
      </div>
    </div>
  );
}
