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

export default function InvestmentPropertyPage() {
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

  // Investment-specific client-side flags
  const [flagHighYield, setFlagHighYield] = useState(false);
  const [flagFurnished, setFlagFurnished] = useState(false);
  const [flagNewBuild, setFlagNewBuild] = useState(false);
  const [flagWaterfront, setFlagWaterfront] = useState(false);
  const [flagCityViews, setFlagCityViews] = useState(false);

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
    const base = 'investment property';
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
  const featured = useMemo(() => properties.filter(p => p.featured).slice(0, 4), [properties]);

  // Apply client-side flags using tags/features heuristics
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const tags = new Set((p.tags || []).map((t) => String(t).toLowerCase()));
      const features = (p.features || []).map((f) => String(f).toLowerCase());
      const yearBuilt = Number(p.yearBuilt || 0);

      if (flagHighYield && !(tags.has('high-yield') || tags.has('yield'))) return false;
      if (flagFurnished && !(tags.has('furnished') || features.some((f) => f.includes('furnished')))) return false;
      if (flagNewBuild && !(tags.has('new-build') || yearBuilt >= 2020)) return false;
      if (flagWaterfront && !(tags.has('waterfront') || features.some((f) => f.includes('water') || f.includes('canal') || f.includes('broadwater')))) return false;
      if (flagCityViews && !(tags.has('city-views') || features.some((f) => f.includes('city view') || f.includes('view')))) return false;
      return true;
    });
  }, [properties, flagHighYield, flagFurnished, flagNewBuild, flagWaterfront, flagCityViews]);

  const displayedTotal = filteredProperties.length;
  const listingOfTheMonth = useMemo(() => featured[0] || null, [featured]);
  const heroCtas = useMemo(() => ([
    { label: 'Permanent', href: '/management-rights/permanent', variant: 'secondary' },
    { label: 'Resort | Holiday', href: '/management-rights/resort-holiday', variant: 'secondary' },
    { label: 'Retirement', href: '/management-rights/retirement', variant: 'secondary' },
    { label: 'Off The Plan', href: '/management-rights/off-the-plan', variant: 'secondary' },
    { label: 'Rentals', href: '/rentals-property', variant: 'secondary' },
  ]), []);

  const flags = {
    'High yield': flagHighYield,
    'Furnished': flagFurnished,
    'New build': flagNewBuild,
    'Waterfront': flagWaterfront,
    'City views': flagCityViews,
  };
  const setFlags = (next) => {
    setFlagHighYield(!!next['High yield']);
    setFlagFurnished(!!next['Furnished']);
    setFlagNewBuild(!!next['New build']);
    setFlagWaterfront(!!next['Waterfront']);
    setFlagCityViews(!!next['City views']);
  };

  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/" className="text-gray-400 hover:text-[#ccff00]">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings" className="text-gray-400 hover:text-[#ccff00]">Property Listings</Link></Breadcrumb.Item>
        <Breadcrumb.Item className="text-white">Investment Property</Breadcrumb.Item>
      </Breadcrumb>

      <MRPageHero
        title="Investment Property"
        subtitle="Browse residential assets with attractive yield and growth profiles across key regions."
        ctas={heroCtas}
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Off The Plan</Button></Link>
        <Link href="/investment-property"><Button className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)]">Investment Property</Button></Link>
        <Link href="/rentals-property"><Button className="bg-[#212121] border-gray-700 text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">Rentals</Button></Link>
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
        placeholder="e.g., unit, CBD, renovated"
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
              setFlags({ 'High yield': false, 'Furnished': false, 'New build': false, 'Waterfront': false, 'City views': false });
            }}
            title="Refine Results"
            priceLabel="Price range (sale)"
            featuresLabel="Attributes"
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
        onReset={()=>{ setFlags({ 'High yield': false, 'Furnished': false, 'New build': false, 'Waterfront': false, 'City views': false }); }}
        title="Refine Results"
        priceLabel="Price range (sale)"
        featuresLabel="Attributes"
      />

      {/* Informational sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Industry news</h2>
            <p className="text-gray-400">Stay informed with insights and updates affecting investors. We curate relevant articles and market commentary.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Employment opportunities</h2>
            <p className="text-gray-400">Explore roles in property and asset management across the industry.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Upcoming events</h2>
            <p className="text-gray-400">Workshops, seminars, and networking events for property investors and professionals.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Find an industry supplier</h2>
            <p className="text-gray-400">Connect with trusted brokers, agents, and service providers to support your investment journey.</p>
          </section>
          <section className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Useful links</h2>
            <ul className="list-disc ml-5 text-gray-400 space-y-1">
              <li><Link href="/property-listings" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Property Listings</Link></li>
              <li><Link href="/blog" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Investor Blog</Link></li>
              <li><Link href="/directory" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Suppliers Directory</Link></li>
              <li><Link href="/contact" className="text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.7)]">Contact Us</Link></li>
            </ul>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Don't miss out</h3><p className="text-gray-400 mb-3">Receive monthly updates from industry professionals and commentators.</p><Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold" href="/subscribe">Subscribe</Button></div>
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4"><h3 className="font-semibold mb-2 text-white">Contact details</h3><p className="text-gray-400">Have a question about a listing or service? Reach out to our team.</p><div className="text-sm text-gray-500 mt-2">Office: 111 Example St, City 4000<br/>Call: +61 7 0000 0000<br/>Mail: info@example.com</div></div>
        </aside>
      </div>
      </div>
    </div>
  );
}
