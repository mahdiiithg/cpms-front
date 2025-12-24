'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { SEARCH_PROPERTIES } from '@/lib/queries/property';
import {
  Breadcrumb,
  Button,
  Card,
  Empty,
  Input,
  Pagination,
  Select,
  Spin,
  Tag,
  Checkbox,
  Drawer,
  Divider,
} from 'antd';
import { managementRights } from '@/data/managementRightsData';
import MRTopSearchBar from '@/components/management-rights/MRTopSearchBar';
import MRPageHero from '@/components/management-rights/MRPageHero';
import MRPageCategoryTabs from '@/components/management-rights/MRPageCategoryTabs';

const { Option } = Select;

export default function PermanentManagementRightsPage() {
  const meta = managementRights.permanent;
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

  const filters = useMemo(
    () => ({
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
    }),
    [pageSize, offset, beds, priceRange, sortBy, listingType, city, suburb],
  );

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

  const featured = useMemo(
    () => properties.filter((p) => p.featured).slice(0, 3),
    [properties],
  );

  // Apply client-side filters based on tags/features
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const tags = new Set((p.tags || []).map((t) => String(t).toLowerCase()));
      // Map feature flags to tag checks (adjust when backend filters are available)
      if (petFriendly && !tags.has('pet-friendly')) return false;
      if (hasManagerUnit && !tags.has('manager-unit')) return false;
      if (
        featurePool &&
        !(p.features || []).some((f) =>
          String(f).toLowerCase().includes('pool'),
        )
      )
        return false;
      if (
        featureGym &&
        !(p.features || []).some((f) => String(f).toLowerCase().includes('gym'))
      )
        return false;
      if (
        featureWaterfront &&
        !(p.features || []).some((f) =>
          String(f).toLowerCase().includes('water'),
        )
      )
        return false;
      return true;
    });
  }, [
    properties,
    petFriendly,
    hasManagerUnit,
    featurePool,
    featureGym,
    featureWaterfront,
  ]);

  const displayedTotal = filteredProperties.length;

  return (
    <div className="min-h-screen bg-[#171717]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 text-sm">
          <Breadcrumb.Item>
            <Link
              href="/"
              className="text-gray-400 transition-colors hover:text-[#ccff00]"
            >
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              href="/listings"
              className="text-gray-400 transition-colors hover:text-[#ccff00]"
            >
              Management Rights
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>

        <MRPageHero
          title={meta.title}
          subtitle={meta.subtitle}
          ctas={meta.heroCtas.map((cta, index) => ({
            ...cta,
            variant: index === 0 ? 'primary' : 'secondary',
          }))}
        />

        {/* Category tabs */}
        <MRPageCategoryTabs />

        <MRTopSearchBar
          keywords={keywords}
          setKeywords={(v) => {
            setKeywords(v);
            setPage(1);
          }}
          beds={beds}
          setBeds={(v) => {
            setBeds(v);
            setPage(1);
          }}
          listingType={listingType}
          setListingType={(v) => {
            setListingType(v);
            setPage(1);
          }}
          city={city}
          setCity={(v) => {
            setCity(v);
            setPage(1);
          }}
          suburb={suburb}
          setSuburb={(v) => {
            setSuburb(v);
            setPage(1);
          }}
          onOpenMobileFilters={() => setMobileFiltersOpen(true)}
          placeholder="e.g., Brisbane, pool, onsite manager"
        />

        {/* Main grid with sidebar filters + results */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Sidebar filters */}
          <aside className="hidden md:col-span-3 md:block">
            <div className="space-y-4 rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
              <h3 className="font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                Refine Results
              </h3>
              <Divider className="my-2 border-gray-800" />
              <div>
                <label className="mb-1 block text-xs font-medium text-white drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                  Price range (sale)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange?.[0] ?? ''}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setPriceRange([v, priceRange[1]]);
                      setPage(1);
                    }}
                    className="border-gray-700 bg-[#212121] text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange?.[1] ?? ''}
                    onChange={(e) => {
                      const v = Number(e.target.value || 0);
                      setPriceRange([priceRange[0], v]);
                      setPage(1);
                    }}
                    className="border-gray-700 bg-[#212121] text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-white drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                  Features
                </label>
                <div className="space-y-1">
                  <Checkbox
                    checked={petFriendly}
                    onChange={(e) => {
                      setPetFriendly(e.target.checked);
                      setPage(1);
                    }}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">Pet friendly</span>
                  </Checkbox>
                  <Checkbox
                    checked={hasManagerUnit}
                    onChange={(e) => {
                      setHasManagerUnit(e.target.checked);
                      setPage(1);
                    }}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">Manager's unit</span>
                  </Checkbox>
                  <Checkbox
                    checked={featurePool}
                    onChange={(e) => {
                      setFeaturePool(e.target.checked);
                      setPage(1);
                    }}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">Pool</span>
                  </Checkbox>
                  <Checkbox
                    checked={featureGym}
                    onChange={(e) => {
                      setFeatureGym(e.target.checked);
                      setPage(1);
                    }}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">Gym</span>
                  </Checkbox>
                  <Checkbox
                    checked={featureWaterfront}
                    onChange={(e) => {
                      setFeatureWaterfront(e.target.checked);
                      setPage(1);
                    }}
                    className="text-gray-300"
                  >
                    <span className="text-gray-300">Waterfront</span>
                  </Checkbox>
                </div>
              </div>
              <Divider className="my-2 border-gray-800" />
              <div className="space-y-2">
                <Button
                  className="w-full border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:bg-[#ccff00] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
                  onClick={() => setPage(1)}
                >
                  Apply
                </Button>
                <Button
                  className="w-full border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
                  onClick={() => {
                    setPetFriendly(false);
                    setHasManagerUnit(false);
                    setFeaturePool(false);
                    setFeatureGym(false);
                    setFeatureWaterfront(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </aside>

          {/* Results panel */}
          <div className="md:col-span-9">
            {/* Sort and count bar */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {loading ? 'Loading…' : `${displayedTotal} opportunities found`}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort by</span>
                <Select
                  size="small"
                  value={sortBy}
                  onChange={(v) => {
                    setSortBy(v);
                    setPage(1);
                  }}
                  style={{ width: 160 }}
                >
                  <Option value="date">Most Recent</Option>
                  <Option value="price-asc">Price: Low to High</Option>
                  <Option value="price-desc">Price: High to Low</Option>
                </Select>
              </div>
            </div>

            {/* Browse by region */}
            <div className="mb-6">
              <h2 className="mb-2 text-sm font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                Browse by region
              </h2>
              <div className="flex flex-wrap gap-2">
                {meta.regions.map((r) => (
                  <Button
                    key={r}
                    size="small"
                    onClick={() => {
                      setCity(r);
                      setPage(1);
                    }}
                    className={`${city === r ? 'border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)]' : 'border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]'}`}
                  >
                    {r}
                  </Button>
                ))}
              </div>
            </div>

            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                  Featured Permanent Opportunities
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {featured.map((p) => (
                    <Card
                      key={p.id}
                      className="border-gray-800 bg-[#1a1a1a] transition-all duration-300 hover:border-[#ccff00]/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                      styles={{
                        body: { background: '#1a1a1a', padding: '16px' },
                      }}
                      cover={
                        <img
                          src={
                            p.images?.[0] || '/images/placeholder-property.png'
                          }
                          alt={p.title}
                          className="h-48 w-full object-cover"
                        />
                      }
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="line-clamp-1 font-semibold text-white">
                            {p.title}
                          </h3>
                          <Tag className="border-0 bg-[#ccff00]/90 font-semibold text-[#171717] capitalize">
                            {p.listingType}
                          </Tag>
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-400">
                          {p.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {p.location?.city}, {p.location?.state}
                        </p>
                        <Link
                          href={`/property/${p.id}`}
                          className="text-sm text-[#ccff00] transition-all hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                        >
                          View details →
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spin size="large" />
              </div>
            ) : error ? (
              <div className="py-12 text-center">
                <Empty description="Failed to load" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <Empty description="No properties found" className="py-12" />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProperties.map((p) => (
                    <Card
                      key={p.id}
                      className="border-gray-800 bg-[#1a1a1a] transition-all duration-300 hover:border-[#ccff00]/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                      styles={{
                        body: { background: '#1a1a1a', padding: '16px' },
                      }}
                      cover={
                        <img
                          src={
                            p.images?.[0] || '/images/placeholder-property.png'
                          }
                          alt={p.title}
                          className="h-56 w-full object-cover"
                        />
                      }
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="line-clamp-1 font-semibold text-white">
                            {p.title}
                          </h3>
                          <Tag className="border-0 bg-[#ccff00]/90 font-semibold text-[#171717] capitalize">
                            {p.listingType}
                          </Tag>
                        </div>
                        <p className="line-clamp-2 text-sm text-gray-400">
                          {p.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {p.location?.city}, {p.location?.state}
                        </p>
                        <Link
                          href={`/property/${p.id}`}
                          className="text-sm text-[#ccff00] transition-all hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                        >
                          View details →
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Pagination
                    current={page}
                    total={total}
                    pageSize={pageSize}
                    onChange={setPage}
                    showSizeChanger={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Filters Drawer */}
        <Drawer
          title={
            <span className="font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
              Refine Results
            </span>
          }
          placement="right"
          onClose={() => setMobileFiltersOpen(false)}
          open={mobileFiltersOpen}
          width={320}
          styles={{
            body: { background: '#171717', padding: '16px' },
            header: {
              background: '#1a1a1a',
              borderBottom: '1px solid #374151',
            },
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-white drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                Price range (sale)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.[0] ?? ''}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    setPriceRange([v, priceRange[1]]);
                  }}
                  className="border-gray-700 bg-[#212121] text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.[1] ?? ''}
                  onChange={(e) => {
                    const v = Number(e.target.value || 0);
                    setPriceRange([priceRange[0], v]);
                  }}
                  className="border-gray-700 bg-[#212121] text-white placeholder-gray-500 hover:border-[#ccff00]/50 focus:border-[#ccff00] focus:shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white drop-shadow-[0_0_8px_rgba(204,255,0,0.2)]">
                Features
              </label>
              <div className="space-y-1">
                <Checkbox
                  checked={petFriendly}
                  onChange={(e) => setPetFriendly(e.target.checked)}
                  className="text-gray-300"
                >
                  <span className="text-gray-300">Pet friendly</span>
                </Checkbox>
                <Checkbox
                  checked={hasManagerUnit}
                  onChange={(e) => setHasManagerUnit(e.target.checked)}
                  className="text-gray-300"
                >
                  <span className="text-gray-300">Manager's unit</span>
                </Checkbox>
                <Checkbox
                  checked={featurePool}
                  onChange={(e) => setFeaturePool(e.target.checked)}
                  className="text-gray-300"
                >
                  <span className="text-gray-300">Pool</span>
                </Checkbox>
                <Checkbox
                  checked={featureGym}
                  onChange={(e) => setFeatureGym(e.target.checked)}
                  className="text-gray-300"
                >
                  <span className="text-gray-300">Gym</span>
                </Checkbox>
                <Checkbox
                  checked={featureWaterfront}
                  onChange={(e) => setFeatureWaterfront(e.target.checked)}
                  className="text-gray-300"
                >
                  <span className="text-gray-300">Waterfront</span>
                </Checkbox>
              </div>
            </div>
            <Divider className="my-2 border-gray-800" />
            <Button
              className="w-full border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:bg-[#ccff00] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
              onClick={() => {
                setMobileFiltersOpen(false);
                setPage(1);
              }}
            >
              Apply
            </Button>
            <Button
              className="w-full border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]"
              onClick={() => {
                setPetFriendly(false);
                setHasManagerUnit(false);
                setFeaturePool(false);
                setFeatureGym(false);
                setFeatureWaterfront(false);
              }}
            >
              Reset
            </Button>
          </div>
        </Drawer>

        {/* Informational sections + Sidebar */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
              <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                What are Permanent Management Rights?
              </h2>
              <p className="text-gray-400">
                Permanent management rights typically involve caretaking a
                residential complex while operating a letting business for
                long-term tenants. The associated agreements outline duties,
                remuneration, and the scope of the on-site manager's role.
              </p>
            </section>
            <section className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
              <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                Why consider Permanent MR?
              </h2>
              <ul className="ml-5 list-disc space-y-1 text-gray-400">
                <li>
                  Predictable income profiles from longer-term tenancy cycles.
                </li>
                <li>
                  Operational stability with established body corporate
                  relationships.
                </li>
                <li>Scalable models across multiple complexes and regions.</li>
              </ul>
            </section>
            <section className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
              <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                How the process works
              </h2>
              <ol className="ml-5 list-decimal space-y-1 text-gray-400">
                <li>
                  Review current agreements, remuneration, and letting pool
                  details.
                </li>
                <li>
                  Undertake financial and legal due diligence with your
                  advisors.
                </li>
                <li>
                  Negotiate terms, secure finance, and settle the business.
                </li>
              </ol>
            </section>
            <section className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-6">
              <h2 className="mb-3 text-xl font-semibold text-white drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">
                FAQs
              </h2>
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <p className="mb-2 font-medium text-white">
                    Do I need prior experience?
                  </p>
                  <p className="text-sm text-gray-400">
                    Experience helps, but many buyers upskill through industry
                    training and professional support.
                  </p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <p className="mb-2 font-medium text-white">
                    What finance is available?
                  </p>
                  <p className="text-sm text-gray-400">
                    Specialist lenders understand MR cashflows and can tailor
                    loan structures to the asset.
                  </p>
                </div>
                <div>
                  <p className="mb-2 font-medium text-white">
                    How are caretaking duties defined?
                  </p>
                  <p className="text-sm text-gray-400">
                    Duties are set out in caretaking agreements and typically
                    include maintenance, grounds, and compliance checks.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <aside className="space-y-4">
            <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
              <h3 className="mb-2 font-semibold text-white">
                Talk to an MR Specialist
              </h3>
              <p className="mb-3 text-gray-400">
                Have questions about permanent management rights? Our team can
                help you evaluate options.
              </p>
              <Button
                type="primary"
                className="border-0 bg-[#ccff00] font-semibold text-black hover:bg-[#ccff00]/90"
                href="/contact"
              >
                Request a callback
              </Button>
            </div>

            <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
              <h3 className="mb-2 font-semibold text-white">
                Subscribe to Alerts
              </h3>
              <p className="mb-3 text-sm text-gray-400">
                Get new permanent MR opportunities in your inbox.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="border-gray-700 bg-[#212121] text-white placeholder:text-gray-500"
                />
                <Button
                  type="primary"
                  className="border-0 bg-[#ccff00] font-semibold text-black hover:bg-[#ccff00]/90"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
              <h3 className="mb-2 font-semibold text-white">Resources</h3>
              <ul className="ml-5 list-disc space-y-1 text-gray-400">
                <li>Buyer checklist</li>
                <li>Finance guide</li>
                <li>Regulatory overview</li>
              </ul>
            </div>

            <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4">
              <h3 className="mb-2 font-semibold text-white">Latest Articles</h3>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>Understanding caretaking agreements</li>
                <li>Due diligence tips for buyers</li>
                <li>Financing management rights 101</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
