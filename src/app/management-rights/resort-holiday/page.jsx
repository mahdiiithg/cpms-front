'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Input, Pagination, Select, Spin, Tag, Checkbox, Drawer, Divider } from 'antd';
import { managementRights } from '@/data/managementRightsData';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Resort | Holiday</Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{meta.title}</h1>
            <p className="mt-1 text-gray-600 max-w-2xl">{meta.subtitle}</p>
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
        <Link href="/management-rights/resort-holiday"><Button type="primary">Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button>Off The Plan</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button>Rentals</Button></Link>
      </div>

      {/* Top search and mobile filters trigger */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">Keywords</label>
            <Input
              value={keywords}
              onChange={(e)=>{ setKeywords(e.target.value); setPage(1); }}
              placeholder="e.g., Surfers Paradise, beachfront, pool"
              allowClear
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Beds (min)</label>
            <Select value={beds} onChange={(v)=>{ setBeds(v); setPage(1); }} className="w-full">
              {[0,1,2,3,4,5].map((n)=>(<Option key={n} value={n}>{n === 0 ? 'Any' : `${n}+`}</Option>))}
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Listing type</label>
            <Select value={listingType} onChange={(v)=>{ setListingType(v); setPage(1); }} className="w-full">
              <Option value="all">All</Option>
              <Option value="sale">For Sale</Option>
              <Option value="rent">For Rent</Option>
            </Select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
            <Input value={city} onChange={(e)=>{ setCity(e.target.value); setPage(1); }} placeholder="e.g., Gold Coast" allowClear />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Suburb</label>
            <Input value={suburb} onChange={(e)=>{ setSuburb(e.target.value); setPage(1); }} placeholder="e.g., Surfers Paradise" allowClear />
          </div>
          <div className="md:hidden">
            <Button className="w-full" onClick={()=>setMobileFiltersOpen(true)}>More Filters</Button>
          </div>
        </div>
      </div>

      {/* Main grid with sidebar filters + results */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <aside className="hidden md:block md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <h3 className="font-semibold">Refine Results</h3>
            <Divider className="my-2" />
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Price range (sale)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.[0] ?? ''}
                  onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([v, priceRange[1]]); setPage(1); }}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.[1] ?? ''}
                  onChange={(e)=>{ const v = Number(e.target.value||0); setPriceRange([priceRange[0], v]); setPage(1); }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Features</label>
              <div className="space-y-1">
                <Checkbox checked={petFriendly} onChange={(e)=>{ setPetFriendly(e.target.checked); setPage(1); }}>Pet friendly</Checkbox>
                <Checkbox checked={hasManagerUnit} onChange={(e)=>{ setHasManagerUnit(e.target.checked); setPage(1); }}>Manager's unit</Checkbox>
                <Checkbox checked={featurePool} onChange={(e)=>{ setFeaturePool(e.target.checked); setPage(1); }}>Pool</Checkbox>
                <Checkbox checked={featureGym} onChange={(e)=>{ setFeatureGym(e.target.checked); setPage(1); }}>Gym</Checkbox>
                <Checkbox checked={featureBeachfront} onChange={(e)=>{ setFeatureBeachfront(e.target.checked); setPage(1); }}>Beachfront</Checkbox>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="space-y-2">
              <Button type="primary" className="w-full" onClick={()=>setPage(1)}>Apply</Button>
              <Button className="w-full" onClick={()=>{
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
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Browse by region</h2>
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
            <h2 className="text-xl font-semibold mb-2">What are Resort & Holiday Management Rights?</h2>
            <p className="text-gray-700">Short-stay accommodation businesses within resort or holiday complexes. Managers handle bookings, guest services, and presentation with a focus on high service standards and seasonality.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Why consider Resort & Holiday MR?</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Leverage tourist demand and peak seasons to drive revenue.</li>
              <li>Apply dynamic pricing with diversified marketing channels.</li>
              <li>Engage guests with hospitality-forward operations.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How the process works</h2>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              <li>Assess letting pool quality, occupancy trends, and seasonality.</li>
              <li>Review agreements, outgoings, and operational scope.</li>
              <li>Secure specialist finance and plan onboarding for peak periods.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Is revenue highly seasonal?</p>
                <p className="text-gray-700">Seasonality is common; strong operators plan staffing, pricing, and marketing to smooth cycles.</p>
              </div>
              <div>
                <p className="font-medium">Do I need hospitality experience?</p>
                <p className="text-gray-700">Experience helps, though systems and training can bridge gaps for first-time managers.</p>
              </div>
              <div>
                <p className="font-medium">What marketing channels are typical?</p>
                <p className="text-gray-700">Direct bookings, OTAs, partnerships, and repeat guest programs are common levers.</p>
              </div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Talk to an MR Specialist</h3>
            <p className="text-gray-700 mb-3">Have questions about resort & holiday rights? Our team can help you evaluate options.</p>
            <Button type="primary" href="/contact">Request a callback</Button>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Industry News</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>New regulations for short-stay operators</li>
              <li>Seasonal pricing strategies that work</li>
              <li>Marketing channels that convert</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Upcoming Events</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Strata seminar – Brisbane</li>
              <li>Industry training program – Gold Coast</li>
              <li>Networking night – Sunshine Coast</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Subscribe to Updates</h3>
            <p className="text-gray-700 mb-3 text-sm">Get monthly industry news and new listings.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" />
              <Button type="primary">Subscribe</Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
