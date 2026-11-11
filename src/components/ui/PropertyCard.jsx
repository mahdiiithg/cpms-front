'use client';

import { Bath, Bed, Heart, Eye, Maximize2 } from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PROPERTY_TO_WISHLIST } from '@/lib/mutations/property';
import { toast } from 'sonner';
import { GET_PROPERTIES, GET_WISHLIST_PROPERTIES } from '@/lib/queries';
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
    <div className="h-fit w-full max-w-[610px] min-w-[280px] rounded-[30px] border border-cp-stroke bg-cp-raised p-3 transition-all duration-300 hover:border-cp-lime/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.18)] sm:min-w-[300px] sm:p-3.5 md:min-w-0">
      <div className="flex h-full flex-col">
        {/* Image Slider */}
        <div className="relative mb-4 h-44 w-full flex-shrink-0 sm:h-48 sm:rounded-3xl">
          <ImageSlider images={images} altText={property.title} containerClass="h-full w-full" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {property.featured && (
              <div className="bg-[#ccff00] rounded-full px-2 py-1 text-xs font-semibold text-[#171717] shadow-[0_0_10px_rgba(204,255,0,0.6)]">Featured</div>
            )}
            <div className="rounded-full bg-[#212121]/90 border border-gray-700 px-2 py-1 text-xs capitalize text-gray-300">{property.listingType}</div>
          </div>

          <BookmarkButton onClick={toggleAddToWishList} loading={loading} isActive={isInWishList()} />
        </div>

        <div className="flex flex-1 flex-col gap-4 px-1.5 pb-2 sm:gap-5 sm:px-2 sm:pb-2.5">
          <div className="flex flex-col gap-2">
            <Link href={`/property/${property.id}`}>
              <h3 className="text-base leading-snug font-semibold capitalize text-white hover:text-[#ccff00] transition-colors">{property.title}</h3>
            </Link>
            <p className="text-[#ccff00] text-sm leading-snug">
              {property.type} • {property.location?.city}, {property.location?.state}
            </p>
          </div>

          {/* Property details */}
          <div className="text-xs text-gray-400">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:gap-x-4">
              <span className="flex items-center">
                <Bed className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#ccff00" />
                <span className="flex-1 text-[12px] text-gray-400 md:text-xs">{property.bedrooms} beds</span>
              </span>
              <span className="flex items-center">
                <Bath className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#ccff00" />
                <span className="flex-1 text-[12px] text-gray-400 md:text-xs">{property.bathrooms} baths</span>
              </span>
              {typeof (property.squareFeet ?? property.propertySize) === 'number' && (
                <span className="flex items-center">
                  <Maximize2 className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#ccff00" />
                  <span className="flex-1 text-[12px] text-gray-400 md:text-xs">
                    {(property.squareFeet ?? property.propertySize).toLocaleString()}
                    {property.squareFeet ? ' sqft' : ' m²'}
                  </span>
                </span>
              )}
              {typeof property.views === 'number' &&
                property.squareFeet == null &&
                property.propertySize == null && (
                <span className="flex items-center">
                  <Eye className="mr-1 h-[16px] w-[16px] flex-shrink-0" color="#ccff00" />
                  <span className="flex-1 text-[12px] text-gray-400 md:text-xs">{property.views} views</span>
                </span>
              )}
            </div>
          </div>

          {/* Price and CTA — compact native actions (avoid global ant-btn sizing) */}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-gray-800/80 pt-3">
            <span className="whitespace-nowrap text-base font-bold leading-none text-white sm:text-lg">
              {formatPrice()}
            </span>

            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={toggleAddToWishList}
                className="inline-flex h-7 items-center gap-1 rounded-full border border-gray-700 bg-[#212121] px-2.5 text-[11px] font-medium leading-none text-gray-300 transition-colors hover:border-[#ccff00] hover:text-[#ccff00] sm:px-3 sm:text-xs"
              >
                <Heart className="h-3 w-3" />
                {isInWishList() ? 'Saved' : 'Save'}
              </button>
              <Link
                href={`/property/${property.id}`}
                className="inline-flex h-7 items-center rounded-full border-0 bg-[#ccff00] px-2.5 text-[11px] font-medium leading-none text-[#171717] shadow-[0_0_8px_rgba(204,255,0,0.4)] transition-shadow hover:shadow-[0_0_14px_rgba(204,255,0,0.55)] sm:px-3 sm:text-xs"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
