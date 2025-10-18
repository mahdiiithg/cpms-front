'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Input, Pagination, Select, Spin, Tag, Checkbox, Drawer, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropertySearchFilters from '@/components/ui/PropertySearchFilters';

const { Option } = Select;

export default function PermanentManagementRightsPage() {
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('date');
  const [listingType, setListingType] = useState('all'); // all | sale | rent
  const [city, setCity] = useState('');
  const [suburb, setSuburb] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // Extra filters (client-side for now)
  const [petFriendly, setPetFriendly] = useState(false);
  const [hasManagerUnit, setHasManagerUnit] = useState(false);
  const [featurePool, setFeaturePool] = useState(false);
  const [featureGym, setFeatureGym] = useState(false);
  const [featureWaterfront, setFeatureWaterfront] = useState(false);

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
    const base = 'permanent management rights';
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
      // Map feature flags to tag checks (adjust when backend filters are available)
      if (petFriendly && !tags.has('pet-friendly')) return false;
      if (hasManagerUnit && !tags.has('manager-unit')) return false;
      if (featurePool && !(p.features || []).some((f) => String(f).toLowerCase().includes('pool'))) return false;
      if (featureGym && !(p.features || []).some((f) => String(f).toLowerCase().includes('gym'))) return false;
      if (featureWaterfront && !(p.features || []).some((f) => String(f).toLowerCase().includes('water'))) return false;
      return true;
    });
  }, [properties, petFriendly, hasManagerUnit, featurePool, featureGym, featureWaterfront]);

  const displayedTotal = filteredProperties.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Permanent</Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Permanent Management Rights</h1>
            <p className="mt-1 text-gray-600 max-w-2xl">
              Discover established complexes with stable, long-term letting pools. Browse opportunities and learn how permanent management rights operate.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/management-rights/off-the-plan"><Button>Off The Plan</Button></Link>
            <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
            <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button type="primary">Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
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
              placeholder="e.g., Brisbane, pool, onsite manager"
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
            <Input value={city} onChange={(e)=>{ setCity(e.target.value); setPage(1); }} placeholder="e.g., Brisbane" allowClear />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Suburb</label>
            <Input value={suburb} onChange={(e)=>{ setSuburb(e.target.value); setPage(1); }} placeholder="e.g., New Farm" allowClear />
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
                <Checkbox checked={featureWaterfront} onChange={(e)=>{ setFeatureWaterfront(e.target.checked); setPage(1); }}>Waterfront</Checkbox>
              </div>
            </div>
            <Divider className="my-2" />
            <div className="space-y-2">
              <Button type="primary" className="w-full" onClick={()=>setPage(1)}>Apply</Button>
              <Button className="w-full" onClick={()=>{
                setPetFriendly(false); setHasManagerUnit(false); setFeaturePool(false); setFeatureGym(false); setFeatureWaterfront(false);
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
          {[ 'Brisbane', 'Gold Coast', 'Sunshine Coast', 'Cairns', 'Townsville', 'Toowoomba' ].map((r) => (
            <Button key={r} size="small" onClick={()=>{ setCity(r); setPage(1); }} className={`border ${city===r?'border-blue-500 text-blue-600':''}`}>{r}</Button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Featured Permanent Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((p) => (
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
              <Checkbox checked={featureWaterfront} onChange={(e)=> setFeatureWaterfront(e.target.checked)}>Waterfront</Checkbox>
            </div>
          </div>
          <Divider className="my-2" />
          <Button type="primary" className="w-full" onClick={()=>{ setMobileFiltersOpen(false); setPage(1); }}>Apply</Button>
          <Button className="w-full" onClick={()=>{ setPetFriendly(false); setHasManagerUnit(false); setFeaturePool(false); setFeatureGym(false); setFeatureWaterfront(false); }}>Reset</Button>
        </div>
      </Drawer>

  {/* Informational sections + Sidebar */}
  <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">What are Permanent Management Rights?</h2>
            <p className="text-gray-700">Permanent management rights typically involve caretaking a residential complex while operating a letting business for long-term tenants. The associated agreements outline duties, remuneration, and the scope of the on-site manager’s role.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Why consider Permanent MR?</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Predictable income profiles from longer-term tenancy cycles.</li>
              <li>Operational stability with established body corporate relationships.</li>
              <li>Scalable models across multiple complexes and regions.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How the process works</h2>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              <li>Review current agreements, remuneration, and letting pool details.</li>
              <li>Undertake financial and legal due diligence with your advisors.</li>
              <li>Negotiate terms, secure finance, and settle the business.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Do I need prior experience?</p>
                <p className="text-gray-700">Experience helps, but many buyers upskill through industry training and professional support.</p>
              </div>
              <div>
                <p className="font-medium">What finance is available?</p>
                <p className="text-gray-700">Specialist lenders understand MR cashflows and can tailor loan structures to the asset.</p>
              </div>
              <div>
                <p className="font-medium">How are caretaking duties defined?</p>
                <p className="text-gray-700">Duties are set out in caretaking agreements and typically include maintenance, grounds, and compliance checks.</p>
              </div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Talk to an MR Specialist</h3>
            <p className="text-gray-700 mb-3">Have questions about permanent management rights? Our team can help you evaluate options.</p>
            <Button type="primary" href="/contact">Request a callback</Button>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Subscribe to Alerts</h3>
            <p className="text-gray-700 mb-3 text-sm">Get new permanent MR opportunities in your inbox.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" />
              <Button type="primary">Subscribe</Button>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Buyer checklist</li>
              <li>Finance guide</li>
              <li>Regulatory overview</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-2">Latest Articles</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>Understanding caretaking agreements</li>
              <li>Due diligence tips for buyers</li>
              <li>Financing management rights 101</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
