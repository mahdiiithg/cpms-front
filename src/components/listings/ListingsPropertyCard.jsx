'use client';

import Link from 'next/link';
import { Avatar, Button, Card, Tag } from 'antd';
import {
  Bath,
  Bed,
  Camera,
  Car,
  Clock,
  Eye,
  Heart,
  Home,
  MapPin,
  Phone,
  Share2,
  Star,
} from 'lucide-react';

function formatListingPrice(property) {
  let price = property.salePrice || property.rentPrice || property.price;
  let suffix = '';

  if (property.listingType === 'rent' && property.rentPrice) {
    price = property.rentPrice;
    suffix = property.rentalPeriod === 'week' ? '/week' : '/month';
  }

  if (!price) return 'Price on request';

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);

  return `${formatted}${suffix}`;
}

/**
 * Rich listing card used on the /listings browse page.
 */
export default function ListingsPropertyCard({
  property,
  isListView = false,
  isSaved = false,
  onToggleSave,
}) {
  return (
    <Card
      className={`property-card bg-[#1a1a1a] border-gray-800 hover:border-[#ccff00]/30 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] ${
        isListView ? 'mb-4' : ''
      }`}
      cover={
        <div className="relative">
          <img
            src={property.images?.[0] || '/images/placeholder-property.jpg'}
            alt={property.title}
            className={`object-cover ${isListView ? 'h-48' : 'h-64'}`}
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {property.featured && (
              <Tag className="flex items-center gap-1 bg-[#ccff00]/90 border-0 text-[#171717] font-semibold shadow-[0_0_10px_rgba(204,255,0,0.6)]">
                <Star className="h-3 w-3 fill-current" />
                Featured
              </Tag>
            )}
            {property.urgent && (
              <Tag className="flex items-center gap-1 bg-red-500/90 border-0 text-white font-semibold">
                <Clock className="h-3 w-3" />
                Urgent
              </Tag>
            )}
            <Tag className="capitalize bg-blue-500/90 border-0 text-white font-semibold">
              {property.listingType}
            </Tag>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              type="text"
              shape="circle"
              size="small"
              className="bg-[#212121]/80 hover:bg-[#212121] border-gray-700 text-gray-300"
              icon={<Camera className="h-4 w-4" />}
            />
            <Button
              type="text"
              shape="circle"
              size="small"
              className={`${
                isSaved
                  ? 'bg-[#ccff00] text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.5)]'
                  : 'bg-[#212121]/80 text-gray-300'
              } hover:bg-[#ccff00] hover:text-[#171717] hover:shadow-[0_0_15px_rgba(204,255,0,0.5)] border-gray-700`}
              icon={<Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />}
              onClick={() => onToggleSave?.(property.id)}
            />
          </div>
          <div className="absolute bottom-3 left-3">
            <Tag className="text-lg font-bold bg-[#ccff00] border-0 text-[#171717] px-3 py-1 shadow-[0_0_20px_rgba(204,255,0,0.7)]">
              {formatListingPrice(property)}
            </Tag>
          </div>
        </div>
      }
      actions={[
        <Button
          key="view"
          type="link"
          icon={<Eye className="h-4 w-4" />}
          className="text-gray-400 hover:text-[#ccff00]"
        >
          {property.views || 0} views
        </Button>,
        <Button
          key="share"
          type="link"
          icon={<Share2 className="h-4 w-4" />}
          className="text-gray-400 hover:text-[#ccff00]"
        >
          Share
        </Button>,
        <Button
          key="contact"
          className="bg-[#ccff00] hover:bg-[#ccff00] border-0 text-[#171717] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:shadow-[0_0_25px_rgba(204,255,0,0.8)]"
          icon={<Phone className="h-4 w-4" />}
        >
          Contact
        </Button>,
      ]}
    >
      <div className="space-y-3">
        <div>
          <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-white">
            <Link
              href={`/property/${property.id}`}
              className="transition-colors hover:text-[#ccff00]"
            >
              {property.title}
            </Link>
          </h3>
          <p className="flex items-center gap-1 text-gray-400">
            <MapPin className="h-4 w-4 text-[#ccff00]" />
            {property.location?.suburb || property.location?.city},{' '}
            {property.location?.city}
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-[#ccff00]" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-[#ccff00]" />
            {property.bathrooms}
          </span>
          {property.parking > 0 && (
            <span className="flex items-center gap-1">
              <Car className="h-4 w-4 text-[#ccff00]" />
              {property.parking}
            </span>
          )}
          {property.propertySize && (
            <span className="flex items-center gap-1">
              <Home className="h-4 w-4 text-[#ccff00]" />
              {property.propertySize} sqm
            </span>
          )}
        </div>

        {property.features?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature) => (
              <Tag
                key={feature}
                size="small"
                className="text-xs bg-[#212121] border-gray-700 text-gray-300"
              >
                {feature.replace(/_/g, ' ')}
              </Tag>
            ))}
            {property.features.length > 3 && (
              <Tag
                size="small"
                className="text-xs bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]"
              >
                +{property.features.length - 3} more
              </Tag>
            )}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-800 pt-2">
          <div className="flex items-center gap-2">
            <Avatar
              size="small"
              src={property.agent?.avatar}
              className="bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.4)]"
            />
            <span className="text-sm text-gray-400">{property.agent?.name}</span>
          </div>
          <Link
            href={`/property/${property.id}`}
            className="text-sm text-[#ccff00] transition-all hover:text-[#ccff00] hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]"
          >
            View details →
          </Link>
        </div>
      </div>
    </Card>
  );
}
