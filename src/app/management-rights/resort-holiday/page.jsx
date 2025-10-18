'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_PROPERTIES, SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Pagination, Select, Spin, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropertySearchFilters from '@/components/ui/PropertySearchFilters';

const { Option } = Select;

export default function ResortHolidayManagementRightsPage() {
  // UI state
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('date');

  const filters = useMemo(() => ({
    limit: pageSize,
    offset,
    listingStatus: 'active',
    minBedrooms: beds || undefined,
    minPrice: priceRange?.[0] || undefined,
    maxPrice: priceRange?.[1] || undefined,
    sortBy,
    sortOrder: sortBy === 'date' ? 'desc' : 'asc',
  }), [pageSize, offset, beds, priceRange, sortBy]);

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Resort | Holiday Management Rights</h1>
            <p className="mt-1 text-gray-600 max-w-2xl">
              Explore short-stay letting businesses with high guest turnover, seasonal peaks, and tourism-driven demand in key destinations.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
            <Link href="/management-rights/off-the-plan"><Button>Off The Plan</Button></Link>
            <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
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
        searchPlaceholder="e.g., Surfers Paradise, beachfront, pool"
        priceLabel="Price range"
        resultNoun="opportunities"
        priceMax={2000000}
        priceStep={10000}
      />

      {/* Featured */}
      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Featured Resort & Holiday Opportunities</h2>
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

      {/* Informational sections */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">What are Resort & Holiday Management Rights?</h2>
            <p className="text-gray-700">These businesses focus on short-stay accommodation within resort or holiday complexes. Managers handle bookings, guest services, and property presentation with a strong emphasis on customer experience and seasonality.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Why consider Resort & Holiday MR?</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Leverage tourist demand and peak seasons for higher gross revenue potential.</li>
              <li>Dynamic pricing strategies and diverse marketing channels.</li>
              <li>Operational variety with strong guest engagement.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How the process works</h2>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              <li>Assess letting pool quality, occupancy trends, and seasonality.</li>
              <li>Review agreements, outgoings, and operational scope.</li>
              <li>Secure tailored finance and plan onboarding for peak periods.</li>
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
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Holiday operations guide</li>
              <li>Revenue management basics</li>
              <li>Compliance checklist</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
