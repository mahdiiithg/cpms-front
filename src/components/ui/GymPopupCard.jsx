import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Phone,
  MapPin,
  Clock,
  Wifi,
  Car,
  Dumbbell,
  Navigation,
  PhoneCall,
  Heart,
  Bookmark,
  BicepsFlexed,
} from 'lucide-react';
import { Button } from 'antd';
import { useSession } from 'next-auth/react';
import { ADD_GYM_TO_WISHLIST } from '@/lib/mutations';
import { GET_ALL_GYMS, GET_USER_WISHLIST } from '@/lib/queries';
import { toast } from 'sonner';
import { useMutation, useQuery } from '@apollo/client';

const GymPopupCard = ({
  gym,
  onClose,
  isVisible,
  mapBounds,
  mapCenter,
  mapZoom,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef(null);
  const lastMapCenter = useRef(mapCenter);
  const lastMapZoom = useRef(mapZoom);

  const { data: session } = useSession();

  const userId =
    session?.provider === 'credentials' ? session?.user?.id : session?.userId;

  const [addToWishlist, { loading }] = useMutation(ADD_GYM_TO_WISHLIST);

  const { data: wishListData } = useQuery(GET_USER_WISHLIST, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const isInWishList = () => {
    const list = wishListData?.getWishlistGyms;
    let result;

    if (wishListData?.getWishlistGyms?.length > 0 && gym?.id) {
      result = list.some((item) => item.id === gym.id);
    }

    return result || false;
  };

  // Default images if gym doesn't have images
  const defaultImages = [
    '/assets/images/gym-image.png',
    '/assets/images/gym-image.png',
    '/assets/images/gym-image.png',
  ];

  const images = defaultImages;
  // const images =
  //   gym?.images && gym.images.length > 0 ? gym.images : defaultImages;

  const amenities = gym?.facilities || [
    'Free WiFi',
    'Parking',
    'Personal Training',
    'Locker Rooms',
  ];

  const toggleAddToWishList = async () => {
    if (!gym.id) return;

    if (!session.user)
      return toast.info('Please login to add item to your wishlist.');

    try {
      const userId =
        session?.provider === 'credentials' ? session.user.id : session?.userId;
      const gymId = gym.id;

      await addToWishlist({
        variables: {
          userId,
          gymId,
        },
        refetchQueries: [
          {
            query: GET_USER_WISHLIST,
            variables: { userId },
          },
          {
            query: GET_ALL_GYMS,
          },
        ],
      });
      if (isInWishList()) {
        toast.success('Removed from your wishlist.');
      } else {
        toast.success(
          `Added to your wishlist! Great choice — you'll love working out there!`,
          {
            icon: <BicepsFlexed />,
          },
        );
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong! Please try again.');
    }
  };

  // Calculate optimal position within map bounds
  const calculatePosition = useCallback(() => {
    if (!mapBounds.width || !mapBounds.height) {
      return { left: '50%', top: '50%' };
    }

    const cardWidth = 280;
    const cardHeight = 320;
    const margin = 20;

    // Start with center position
    let x = mapBounds.width / 2;
    let y = mapBounds.height / 2;

    // Adjust if card would go outside horizontal bounds
    if (x - cardWidth / 2 < margin) {
      x = margin + cardWidth / 2;
    } else if (x + cardWidth / 2 > mapBounds.width - margin) {
      x = mapBounds.width - margin - cardWidth / 2;
    }

    // Adjust if card would go outside vertical bounds
    if (y - cardHeight / 2 < margin) {
      y = margin + cardHeight / 2;
    } else if (y + cardHeight / 2 > mapBounds.height - margin) {
      y = mapBounds.height - margin - cardHeight / 2;
    }

    return { left: `${x}px`, top: `${y}px` };
  }, [mapBounds]);

  // Check if gym is still visible in the current map view and close popup if not
  useEffect(() => {
    if (
      !gym?.location?.latitude ||
      !gym?.location?.longitude ||
      !mapCenter ||
      !mapZoom
    ) {
      return;
    }

    // Check if map has changed (center or zoom)
    const mapHasChanged =
      lastMapCenter.current?.lat !== mapCenter.lat ||
      lastMapCenter.current?.lng !== mapCenter.lng ||
      lastMapZoom.current !== mapZoom;

    if (mapHasChanged && isVisible) {
      // Calculate if gym is still within visible bounds
      // This is a simplified check - you may need to adjust based on your map implementation
      const gymLat = gym.location.latitude;
      const gymLng = gym.location.longitude;

      // Rough calculation of visible bounds based on zoom level
      // You may need to adjust these values based on your map's actual behavior
      const latDelta = 0.01 * Math.pow(2, 15 - mapZoom); // Approximate latitude range
      const lngDelta = 0.01 * Math.pow(2, 15 - mapZoom); // Approximate longitude range

      const isGymVisible =
        gymLat >= mapCenter.lat - latDelta &&
        gymLat <= mapCenter.lat + latDelta &&
        gymLng >= mapCenter.lng - lngDelta &&
        gymLng <= mapCenter.lng + lngDelta;

      if (!isGymVisible) {
        onClose();
      }
    }

    // Update refs
    lastMapCenter.current = mapCenter;
    lastMapZoom.current = mapZoom;
  }, [gym?.location, mapCenter, mapZoom, isVisible, onClose]);

  const nextImage = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    },
    [images.length],
  );

  const prevImage = useCallback(
    (e) => {
      e?.stopPropagation();
      setCurrentImageIndex(
        (prev) => (prev - 1 + images.length) % images.length,
      );
    },
    [images.length],
  );

  const goToImage = useCallback((index, e) => {
    e?.stopPropagation();
    setCurrentImageIndex(index);
  }, []);

  // Reset image index when gym changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [gym?.id]);

  const handleGetDirections = (e) => {
    e?.stopPropagation();
    if (gym?.location?.latitude && gym?.location?.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.location.latitude},${gym.location.longitude}`;
      window.open(url, '_blank');
    }
  };

  const handleCallNow = (e) => {
    e?.stopPropagation();
    if (gym?.phone) {
      window.location.href = `tel:${gym.phone}`;
    }
  };

  if (!gym || !isVisible) return null;

  const position = calculatePosition();

  return (
    <div
      ref={cardRef}
      className="animate-in zoom-in-50 absolute z-[51] overflow-hidden rounded-[20px] bg-white shadow-2xl transition-all duration-300"
      style={{
        left: position.left,
        top: position.top,
        transform: 'translate(-50%, -50%)',
        width: '280px',
        maxHeight: mapBounds.height
          ? `${Math.min(330, mapBounds.height - 40)}px`
          : '330px',
      }}
    >
      {/* Close Button */}
      <Button
        type="text"
        size="small"
        icon={<X size={15} />}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="!absolute top-3 right-3 z-10 !rounded-full !border-none !bg-white/90 !p-1.5 !shadow-lg backdrop-blur-sm !transition-all hover:!scale-105 hover:!bg-white"
        style={{
          minWidth: 'auto',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Like Button */}
      <Button
        type="text"
        size="small"
        icon={
          <Bookmark
            size={15}
            className={`transition-colors ${isInWishList() ? 'text-primary fill-current' : 'text-gray-600'}`}
          />
        }
        onClick={toggleAddToWishList}
        disabled={loading}
        className="!absolute top-3 right-[2.85rem] z-10 !rounded-full !border-none !bg-white/90 !p-1.5 !shadow-lg backdrop-blur-sm !transition-all hover:!scale-105 hover:!bg-white"
        style={{
          minWidth: 'auto',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Image Carousel */}
      <div className="relative h-36 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="h-full w-full flex-shrink-0">
              <img
                src={image}
                alt={`${gym.name} - Image ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <Button
                type="text"
                size="small"
                icon={<ChevronLeft size={14} />}
                onClick={prevImage}
                className="!absolute top-1/2 left-1.5 -translate-y-1/2 !rounded-full !border-none !bg-white/80 !p-1 opacity-75 !shadow-lg backdrop-blur-sm !transition-all hover:!scale-110 hover:!bg-white hover:opacity-100"
                style={{
                  minWidth: 'auto',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}

            {currentImageIndex < images.length - 1 && (
              <Button
                type="text"
                size="small"
                icon={<ChevronRight size={14} />}
                onClick={nextImage}
                className="!absolute top-1/2 right-1.5 -translate-y-1/2 !rounded-full !border-none !bg-white/80 !p-1 opacity-75 !shadow-lg backdrop-blur-sm !transition-all hover:!scale-110 hover:!bg-white hover:opacity-100"
                style={{
                  minWidth: 'auto',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {images.map((_, index) => (
              <Button
                key={index}
                type="text"
                size="small"
                onClick={(e) => goToImage(index, e)}
                className={`!h-[5px] !w-[5px] !min-w-0 !rounded-full !border-none !p-0 !transition-all ${
                  index === currentImageIndex
                    ? '!scale-125 !bg-white'
                    : '!bg-primary hover:!bg-white/80'
                }`}
                style={{
                  minWidth: '4px',
                  width: '4px',
                  height: '4px',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className="overflow-y-auto p-3"
        style={{
          maxHeight: mapBounds.height
            ? `${Math.min(198, mapBounds.height - 172)}px`
            : '198px',
        }}
      >
        {/* Header */}
        <div className="mb-2">
          <div className="mb-1 flex items-start justify-between">
            <h3 className="line-clamp-1 pr-2 text-base font-semibold text-gray-900">
              {gym.name}
            </h3>
            {gym.rating && (
              <div className="flex flex-shrink-0 items-center gap-1">
                <Star size={12} className="fill-current text-yellow-400" />
                <span className="text-xs font-medium text-gray-900">
                  {gym.rating}
                </span>
              </div>
            )}
          </div>

          <div className="mb-1 flex items-center gap-1 text-gray-600">
            <MapPin size={10} />
            <span className="line-clamp-1 text-xs">
              {gym.address || 'Address not available'}
            </span>
          </div>

          {/* Price or Status */}
          <div className="text-xs">
            <span className="font-medium text-gray-900">Open now</span>
            <span className="ml-1 text-gray-500">· Day passes available</span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="mb-2 flex items-center gap-3 text-xs text-gray-600">
          {gym.phone && (
            <div className="flex items-center gap-1">
              <Phone size={10} />
              <span>Call</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock size={10} />
            <span>24/7</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 2).map((amenity, index) => {
              const getIcon = (amenity) => {
                const lowerAmenity = amenity.toLowerCase();
                if (lowerAmenity.includes('wifi')) return <Wifi size={8} />;
                if (lowerAmenity.includes('parking')) return <Car size={8} />;
                if (lowerAmenity.includes('training'))
                  return <Dumbbell size={8} />;
                return null;
              };

              return (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-1.5 py-0.5"
                >
                  {getIcon(amenity)}
                  <span className="text-xs text-gray-600">
                    {amenity.length > 8
                      ? amenity.substring(0, 8) + '...'
                      : amenity}
                  </span>
                </div>
              );
            })}
            {amenities.length > 2 && (
              <div className="rounded-full bg-gray-100 px-1.5 py-0.5">
                <span className="text-xs text-gray-600">
                  +{amenities.length - 2}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<Navigation size={12} />}
            onClick={handleGetDirections}
            className="!flex !flex-1 !items-center !justify-center !gap-1 !rounded-full !px-2 !py-1.5 !text-xs !font-medium hover:!border-gray-800 hover:!bg-gray-800 hover:!text-white"
            style={{
              height: 'auto',
              lineHeight: 'normal',
            }}
          >
            Directions
          </Button>
          {gym.phone && (
            <Button
              size="small"
              icon={<PhoneCall size={12} />}
              onClick={handleCallNow}
              className="!flex !flex-1 !items-center !justify-center !gap-1 !rounded-lg !border-gray-300 !px-2 !py-1.5 !text-xs !font-medium !text-gray-700 hover:!border-gray-300 hover:!bg-gray-50 hover:!text-gray-700"
              style={{
                height: 'auto',
                lineHeight: 'normal',
              }}
            >
              Call
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GymPopupCard;
