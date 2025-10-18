'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Input, Pagination, Select, Spin, Tag } from 'antd';
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

      {/* Filter/search bar */}
      <PropertySearchFilters
        keywords={keywords}
        setKeywords={setKeywords}
        beds={beds}
        setBeds={setBeds}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        total={total}
        loading={loading}
        setPage={setPage}
        searchPlaceholder="e.g., Brisbane, pool, onsite manager"
        priceLabel="Price range"
        resultNoun="opportunities"
        priceMax={2000000}
        priceStep={10000}
        gridCols={6}
        extraFilters={(
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Listing type</label>
              <Select value={listingType} onChange={(v)=>{ setListingType(v); setPage(1); }} className="w-full" size="small">
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
          </>
        )}
      />

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
              <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-48 w-full object-cover" />}>
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
      ) : properties.length === 0 ? (
        <Empty description="No properties found" className="py-12" />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-56 w-full object-cover" />}>
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
