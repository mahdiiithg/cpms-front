'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import { Breadcrumb, Button, Card, Empty, Pagination, Select, Spin, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropertySearchFilters from '@/components/ui/PropertySearchFilters';

const { Option } = Select;

export default function OffThePlanManagementRightsPage() {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb className="mb-4 text-sm">
        <Breadcrumb.Item><Link href="/">Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href="/listings">Management Rights</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Off The Plan</Breadcrumb.Item>
      </Breadcrumb>

      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 mb-6 border border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Off The Plan Management Rights</h1>
            <p className="mt-1 text-gray-600 max-w-2xl">Explore pipeline projects and upcoming complexes with potential management rights businesses.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
            <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
            <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Link href="/management-rights/permanent"><Button>Permanent</Button></Link>
        <Link href="/management-rights/resort-holiday"><Button>Resort | Holiday</Button></Link>
        <Link href="/management-rights/retirement"><Button>Retirement</Button></Link>
        <Link href="/management-rights/off-the-plan"><Button type="primary">Off The Plan</Button></Link>
        <Link href="/investment-property"><Button>Investment Property</Button></Link>
        <Link href="/rentals-property"><Button>Rentals</Button></Link>
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
        searchPlaceholder="e.g., Brisbane, new build, project"
        priceLabel="Price range"
        resultNoun="opportunities"
        priceMax={2000000}
        priceStep={10000}
      />

      {featured.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Featured Off The Plan Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((p) => (
              <Card key={p.id} cover={<img src={p.images?.[0] || '/images/placeholder-property.jpg'} alt={p.title} className="h-48 w-full object-cover" />}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><h3 className="font-semibold line-clamp-1">{p.title}</h3><Tag color="blue" className="capitalize">{p.listingType}</Tag></div>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                  <p className="text-sm text-gray-500">{p.location?.city}, {p.location?.state}</p>
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
            <h2 className="text-xl font-semibold mb-2">What does Off The Plan mean?</h2>
            <p className="text-gray-700">Off the plan projects are developments that are sold before construction is completed. Opportunities may include caretaking and letting agreements to be established at settlement.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">Why consider Off The Plan?</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>Secure positions early in growth areas and flagship projects.</li>
              <li>Potential to influence operational design and systems from day one.</li>
              <li>Marketing support and presales momentum from developers.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">How it works</h2>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              <li>Review disclosure documents and scheme structure.</li>
              <li>Engage legal and financial advisors experienced in MR.</li>
              <li>Plan operational setup and recruitment ahead of settlement.</li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            <div className="space-y-3">
              <div><p className="font-medium">Are returns guaranteed?</p><p className="text-gray-700">No, projections are indicative and dependent on sales uptake and market conditions.</p></div>
              <div><p className="font-medium">What is the typical timeline?</p><p className="text-gray-700">Timelines vary; stages can run 12–36 months+ from launch to settlement.</p></div>
              <div><p className="font-medium">How are agreements set?</p><p className="text-gray-700">Caretaking and letting agreements are negotiated with the developer and body corporate.</p></div>
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white rounded-lg border p-4"><h3 className="font-semibold mb-2">Talk to an MR Specialist</h3><p className="text-gray-700 mb-3">Questions about off the plan? Our team can assist.</p><Button type="primary" href="/contact">Request a callback</Button></div>
          <div className="bg-white rounded-lg border p-4"><h3 className="font-semibold mb-2">Resources</h3><ul className="list-disc ml-5 text-gray-700 space-y-1"><li>Developer checklist</li><li>Project finance basics</li><li>Regulatory guide</li></ul></div>
        </aside>
      </div>
    </div>
  );
}
