'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Input, Pagination, Select, Spin, Tag, Checkbox, Drawer, Divider } from 'antd';
import { managementRights } from '@/data/managementRightsData';
import MRTopSearchBar from '@/components/management-rights/MRTopSearchBar';
import MRPageHero from '@/components/management-rights/MRPageHero';

const { Option } = Select;

export default function ResortHolidayManagementRightsPage() {
  const meta = managementRights.resortHoliday;
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 4000000]);
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
  const [featureBeachfront, setFeatureBeachfront] = useState(false);

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
    const base = 'resort holiday management rights';
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
      if (featureBeachfront && !(p.tags || []).some((t) => String(t).toLowerCase().includes('beach'))) return false;
      return true;
    });
  }, [properties, petFriendly, hasManagerUnit, featurePool, featureGym, featureBeachfront]);

  const displayedTotal = filteredProperties.length;

  // Pick a listing of the month if available
  const listingOfTheMonth = useMemo(() => featured[0] || null, [featured]);

  return (

    <div className="min-h-screen bg-[#171717]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/" className="text-gray-400 hover:text-[#ccff00]">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings" className="text-gray-400 hover:text-[#ccff00]">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item className="text-white">Resort | Holiday</Breadcrumb.Item>
      </Breadcrumb>

      <MRPageHero
        title={meta.title}
        subtitle={meta.subtitle}
        ctas={meta.heroCtas.map((cta, index) => ({ ...cta, variant: index === 0 ? 'primary' : 'secondary' }))}
      />

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button type="primary">Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button>Off The Plan</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button>Rentals</Button></Link>
      </div>

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
        placeholder="e.g., Surfers Paradise, beachfront, pool"
      />

      {/* Main grid with sidebar filters + results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:col-span-3">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold text-white">Refine Results</h3>
            <Divider className="my-2 border-gray-800" />
            <div>
              <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Price range (sale)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.[0] ?? ''}
                  onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); setPage(1); }}
                  className="bg-[#212121] border-gray-700 text-white placeholder:text-gray-500"
                  styles={{ input: { background: '#212121', color: 'white' } }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.[1] ?? ''}
                  onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); setPage(1); }}
                  className="bg-[#212121] border-gray-700 text-white placeholder:text-gray-500"
                  styles={{ input: { background: '#212121', color: 'white' } }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1 drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">Features</label>
              <div className="space-y-1">
                <Checkbox checked={petFriendly} onChange={(e)=>{ setPetFriendly(e.target.checked); setPage(1); }} className="text-gray-300"><span className="text-gray-300">Pet friendly</span></Checkbox>
                <Checkbox checked={hasManagerUnit} onChange={(e)=>{ setHasManagerUnit(e.target.checked); setPage(1); }} className="text-gray-300"><span className="text-gray-300">Manager's unit</span></Checkbox>
                <Checkbox checked={featurePool} onChange={(e)=>{ setFeaturePool(e.target.checked); setPage(1); }} className="text-gray-300"><span className="text-gray-300">Pool</span></Checkbox>
                <Checkbox checked={featureGym} onChange={(e)=>{ setFeatureGym(e.target.checked); setPage(1); }} className="text-gray-300"><span className="text-gray-300">Gym</span></Checkbox>
                <Checkbox checked={featureBeachfront} onChange={(e)=>{ setFeatureBeachfront(e.target.checked); setPage(1); }} className="text-gray-300"><span className="text-gray-300">Beachfront</span></Checkbox>
              </div>
            </div>
            <Divider className="my-2 border-gray-800" />
            <div className="space-y-2">
              <Button type="primary" className="w-full bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold shadow-[0_0_20px_rgba(204,255,0,0.3)]" onClick={()=>setPage(1)}>Apply</Button>
              <Button className="w-full bg-[#212121] hover:bg-[#2a2a2a] text-white border-gray-700" onClick={()=>{
                setPetFriendly(false); setHasManagerUnit(false); setFeaturePool(false); setFeatureGym(false); setFeatureBeachfront(false);
              }}>Reset</Button>
            </div>
          </div>
        </aside>

        {/* Results panel */}
        <div className="md:col-span-9">
          {/* Sort and count bar */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">{loading ? 'Loading…' : `${displayedTotal} opportunities found`}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Sort by</span>
              <Select size="small" value={sortBy} onChange={(v)=>{ setSortBy(v); setPage(1); }} style={{ width: 160 }}>
                <Option value="date">Most Recent</Option>
                <Option value="price-asc">Price: Low to High</Option>
                <Option value="price-desc">Price: High to Low</Option>
              </Select>
            </div>
          </div>

          {/* Browse by region */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-white mb-2">Browse by region</h2>
            <div className="flex flex-wrap gap-2">
              {meta.regions.map((r) => (
                <Button key={r} size="small" onClick={()=>{ setCity(r); setPage(1); }} className={`border ${city===r?'border-blue-500 text-blue-600':''}`}>{r}</Button>
              ))}
            </div>
          </div>

          {/* Listing of the Month */}
          {listingOfTheMonth && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Listing of the Month</h2>
              <Card
                key={listingOfTheMonth.id}
                cover={<img src={listingOfTheMonth.images?.[0] || '/images/placeholder-property.png'} alt={listingOfTheMonth.title} className="h-64 w-full object-cover" />}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold line-clamp-1">{listingOfTheMonth.title}</h3>
                    <Tag color="purple" className="capitalize">Featured</Tag>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-3">{listingOfTheMonth.description}</p>
                  <p className="text-sm text-gray-500">{listingOfTheMonth.location?.city}, {listingOfTheMonth.location?.state}</p>
                  <Link href={`/property/${listingOfTheMonth.id}`} className="text-blue-600 text-sm">View details</Link>
                </div>
              </Card>
            </div>
          )}

          {/* Featured */}
          {featured.length > 1 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Featured Resort & Holiday Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featured.slice(1, 4).map((p) => (
                  <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.png'} alt={p.title} className="h-48 w-full object-cover" />}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                        <Tag color="blue" className="capitalize">{p.listingType}</Tag>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                      <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                      <Link href={`/property/${p.id}`} className="text-blue-600 text-sm">View details</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center py-12"><Spin size="large" /></div>
          ) : error ? (
            <div className="text-center py-12"><Empty description="Failed to load" /></div>
          ) : filteredProperties.length === 0 ? (
            <Empty description="No properties found" className="py-12" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((p) => (
                  <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.png'} alt={p.title} className="h-56 w-full object-cover" />}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold line-clamp-1">{p.title}</h3>
                        <Tag color="blue" className="capitalize">{p.listingType}</Tag>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                      <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                      <Link href={`/property/${p.id}`} className="text-blue-600 text-sm">View details</Link>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Pagination current={page} total={total} pageSize={pageSize} onChange={setPage} showSizeChanger={false} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <Drawer title="Refine Results" placement="right" onClose={()=>setMobileFiltersOpen(false)} open={mobileFiltersOpen} width={320}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Price range (sale)</label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Min" value={priceRange?.[0] ?? ''} onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); }} />
              <Input type="number" placeholder="Max" value={priceRange?.[1] ?? ''} onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Features</label>
            <div className="space-y-1">
              <Checkbox checked={petFriendly} onChange={(e)=> setPetFriendly(e.target.checked)}>Pet friendly</Checkbox>
              <Checkbox checked={hasManagerUnit} onChange={(e)=> setHasManagerUnit(e.target.checked)}>Manager's unit</Checkbox>
              <Checkbox checked={featurePool} onChange={(e)=> setFeaturePool(e.target.checked)}>Pool</Checkbox>
              <Checkbox checked={featureGym} onChange={(e)=> setFeatureGym(e.target.checked)}>Gym</Checkbox>
              <Checkbox checked={featureBeachfront} onChange={(e)=> setFeatureBeachfront(e.target.checked)}>Beachfront</Checkbox>
            </div>
          </div>
          <Divider className="my-2" />
          <Button type="primary" className="w-full" onClick={()=>{ setMobileFiltersOpen(false); setPage(1); }}>Apply</Button>
          <Button className="w-full" onClick={()=>{ setPetFriendly(false); setHasManagerUnit(false); setFeaturePool(false); setFeatureGym(false); setFeatureBeachfront(false); }}>Reset</Button>
        </div>
      </Drawer>

      {/* Informational sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">What are Resort & Holiday Management Rights?</h2>
            <p className="text-gray-400">Short-stay accommodation businesses within resort or holiday complexes. Managers handle bookings, guest services, and presentation with a focus on high service standards and seasonality.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">Why consider Resort & Holiday MR?</h2>
            <ul className="list-disc ml-5 text-gray-400 space-y-1">
              <li>Leverage tourist demand and peak seasons to drive revenue.</li>
              <li>Apply dynamic pricing with diversified marketing channels.</li>
              <li>Engage guests with hospitality-forward operations.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">How the process works</h2>
            <ol className="list-decimal ml-5 text-gray-400 space-y-1">
              <li>Assess letting pool quality, occupancy trends, and seasonality.</li>
              <li>Review agreements, outgoings, and operational scope.</li>
              <li>Secure specialist finance and plan onboarding for peak periods.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2 text-white">FAQs</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-white">Is revenue highly seasonal?</p>
                <p className="text-gray-400">Seasonality is common; strong operators plan staffing, pricing, and marketing to smooth cycles.</p>
              </div>
              <div>
                <p className="font-medium text-white">Do I need hospitality experience?</p>
                <p className="text-gray-400">Experience helps, though systems and training can bridge gaps for first-time managers.</p>
              </div>
              <div>
                <p className="font-medium text-white">What marketing channels are typical?</p>
                <p className="text-gray-400">Direct bookings, OTAs, partnerships, and repeat guest programs are common levers.</p>
              </div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Talk to an MR Specialist</h3>
            <p className="text-gray-400 mb-3">Have questions about resort & holiday rights? Our team can help you evaluate options.</p>
            <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold" href="/contact">Request a callback</Button>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Industry News</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>New regulations for short-stay operators</li>
              <li>Seasonal pricing strategies that work</li>
              <li>Marketing channels that convert</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Upcoming Events</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Strata seminar – Brisbane</li>
              <li>Industry training program – Gold Coast</li>
              <li>Networking night – Sunshine Coast</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4">
            <h3 className="font-semibold mb-2 text-white">Subscribe to Updates</h3>
            <p className="text-gray-400 mb-3 text-sm">Get monthly industry news and new listings.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-[#212121] border-gray-700 text-white placeholder:text-gray-500" styles={{ input: { background: '#212121', color: 'white' } }} />
              <Button type="primary" className="bg-[#ccff00] hover:bg-[#ccff00]/90 text-black border-0 font-semibold">Subscribe</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </div>
  );
}
