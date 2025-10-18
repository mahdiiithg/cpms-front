'use client';

import { Button } from 'antd';
import { MapPin, Star, Bath, Bed, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROPERTY_TO_WISHLIST } from '@/lib/mutations/property';
import { toast } from 'sonner';
import { GET_PROPERTIES, GET_WISHLIST_PROPERTIES } from '@/lib/queries';
import { useMemo } from 'react';
import ImageSlider from './ImageSlider/ImageSlider';

const PropertyCard = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.userId;

  const { data: wishListData } = useQuery(GET_WISHLIST_PROPERTIES, {
    variables: { userId },
    skip: !userId,
  });

  const images = property.images || [];

  const [addToWishlist, { loading }] = useMutation(ADD_PROPERTY_TO_WISHLIST);
  const { ensureAuth } = useRequireAuth();

  const toggleAddToWishList = async () => {
    if (!property.id) return;
    if (!ensureAuth('Please login to add item to your wishlist.')) return;

    try {
      const userId = session?.userId;
      const propertyId = property.id;

      await addToWishlist({
        variables: { userId, propertyId },
        refetchQueries: [
          { query: GET_WISHLIST_PROPERTIES, variables: { userId } },
          { query: GET_PROPERTIES },
        ],
      });
      if (isInWishList()) {
        toast.success('Removed from your wishlist.');
      } else {
        toast.success('Added to your wishlist!', { icon: <Heart /> });
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong! Please try again.');
    }
  };

  const isInWishList = () => {
    const list = wishListData?.getWishlistProperties || [];
    if (!property?.id || list.length === 0) return false;
    return list.some((item) => item.id === property.id);
  };

  const formatPrice = () => {
    if (property.listingType === 'rent' && property.rentPrice) {
      return `$${Number(property.rentPrice).toLocaleString()}/week`;
    }
    if (property.salePrice) {
      return `$${Number(property.salePrice).toLocaleString()}`;
    }
    return 'Price on request';
  };

  return (
    <div className="h-fit w-full max-w-[610px] min-w-[280px] rounded-[30px] bg-[#F5F5F5] p-2 sm:min-w-[300px] md:min-w-0">
      <div className="flex h-full flex-col">
        {/* Image Slider */}
        <div className="relative mb-3 h-44 w-full flex-shrink-0 sm:h-48 sm:rounded-3xl">
          <ImageSlider images={images} altText={property.title} containerClass="h-full w-full" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {property.featured && (
              <div className="bg-primary rounded-full px-2 py-1 text-xs font-semibold text-black">Featured</div>
            )}
            <div className="rounded-full bg-white/90 px-2 py-1 text-xs capitalize">{property.listingType}</div>
          </div>

          <BookmarkButton onClick={toggleAddToWishList} loading={loading} isActive={isInWishList()} />
        </div>

        <div className="flex-1">
          <div className="mb-3 flex flex-col">
            <Link href={`/property/${property.id}`}>
              <h3 className="text-base leading-tight font-semibold capitalize">{property.title}</h3>
            </Link>
            <p className="text-primary text-sm">
              {property.type} • {property.location?.city}, {property.location?.state}
            </p>
          </div>

          {/* Property details */}
          <div className="my-2 space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <Bed className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#404040" />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">{property.bedrooms} beds</span>
              </span>
              <span className="flex items-center">
                <Bath className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#404040" />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">{property.bathrooms} baths</span>
              </span>
              {typeof property.views === 'number' && (
                <span className="flex items-center">
                  <Eye className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#404040" />
                  <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">{property.views} views</span>
                </span>
              )}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">{formatPrice()}</span>
            </div>

            <div className="flex gap-2">
              <Button type="default" className="rounded-full" onClick={toggleAddToWishList} icon={<Heart className="h-4 w-4" />}>{isInWishList() ? 'Saved' : 'Save'}</Button>
              <Link href={`/property/${property.id}`}>
                <Button type="primary" className="bg-primary hover:bg-primary font-medium text-black rounded-full">View</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
