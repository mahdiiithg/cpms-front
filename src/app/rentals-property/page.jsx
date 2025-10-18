'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Pagination, Select, Spin, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropertySearchFilters from '@/components/ui/PropertySearchFilters';

const { Option } = Select;

export default function RentalsPropertyPage() {
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  const [keywords, setKeywords] = useState('');
  const [beds, setBeds] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('date');

  const filters = useMemo(() => ({
    limit: pageSize,
    offset,
    listingStatus: 'active',
    listingType: 'rent',
    minBedrooms: beds || undefined,
    minPrice: priceRange?.[0] || undefined,
    maxPrice: priceRange?.[1] || undefined,
    sortBy,
    sortOrder: sortBy === 'date' ? 'desc' : 'asc',
  }), [pageSize, offset, beds, priceRange, sortBy]);

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
  const featured = useMemo(() => properties.filter(p => p.featured).slice(0, 3), [properties]);

  const formatPrice = (p) => {
    if (p.listingType === 'rent' && p.rentPrice) {
      return `$${p.rentPrice.toLocaleString()}/week`;
    }
    if (p.salePrice) return `$${p.salePrice.toLocaleString()}`;
    return 'Price on request';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings">Property Listings</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Rentals Property</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Rentals Property</h1>
            <p className="mt-1 text-gray-600 max-w-2xl">Browse available rentals managed by our agents and property managers.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/buy"><Button>Buy</Button></Link>
            <Link href="/management-rights/permanent"><Button>Management Rights</Button></Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button>Permanent MR</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday MR</Button></Link>
        <Link href="/management-rights/retirement"><Button>Retirement MR</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button>Off The Plan MR</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button type="primary">Rentals</Button></Link>
      </div>

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
        searchPlaceholder="e.g., CBD, near transport, pets"
        priceLabel="Weekly budget"
        resultNoun="rentals"
        priceMax={5000}
        priceStep={50}
      />

      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Featured Rentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-48 w-full object-cover" />}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><h3 className="font-semibold line-clamp-1">{p.title}</h3><Tag color="blue" className="capitalize">{p.listingType}</Tag></div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                  <div className="text-sm font-semibold">{formatPrice(p)}</div>
                  <Link href={`/property/${p.id}`} className="text-blue-600 text-sm">View details</Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

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
                  <div className="flex items-center justify-between"><h3 className="font-semibold line-clamp-1">{p.title}</h3><Tag color="blue" className="capitalize">{p.listingType}</Tag></div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
                  <div className="text-sm font-semibold">{formatPrice(p)}</div>
                  <Link href={`/property/${p.id}`} className="text-blue-600 text-sm">View details</Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center"><Pagination current={page} total={total} pageSize={pageSize} onChange={setPage} showSizeChanger={false} /></div>
        </>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">Renting with Coast Planet</h2>
            <p className="text-gray-700">Our agents manage quality rentals with transparent processes and quick support for tenants. Use filters to find the right home and contact us to arrange a viewing.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Tenant tips</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Prepare application documents ahead of time.</li>
              <li>Confirm weekly budget and preferred lease term.</li>
              <li>Check proximity to transport and amenities.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            <div className="space-y-3">
              <div><p className="font-medium">Are pets allowed?</p><p className="text-gray-700">Pet policies vary by property; look for tags or ask the agent.</p></div>
              <div><p className="font-medium">How are inspections booked?</p><p className="text-gray-700">Use the Contact button on a listing to request an inspection time.</p></div>
              <div><p className="font-medium">What documents are needed?</p><p className="text-gray-700">Typically ID, proof of income, and references.</p></div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white rounded-lg border p-4"><h3 className="font-semibold mb-2">Talk to a Property Manager</h3><p className="text-gray-700 mb-3">Have a rental to list? We can help you find great tenants.</p><Button type="primary" href="/contact">Request a callback</Button></div>
          <div className="bg-white rounded-lg border p-4"><h3 className="font-semibold mb-2">Resources</h3><ul className="list-disc ml-5 text-gray-700 space-y-1"><li>Application checklist</li><li>Tenant rights overview</li><li>Moving guide</li></ul></div>
        </aside>
      </div>
    </div>
  );
}
