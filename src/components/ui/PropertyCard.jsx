'use client';

import { Button } from 'antd';
import {
  MapPin,
  Clock,
  Car,
  Wifi,
  Route,
  Star,
  BicepsFlexed,
  Waves,
  Eye,
  Home,
  Users,
  Bath,
  Bed,
  Calendar,
  Heart,
} from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_PROPERTY_TO_WISHLIST,
  CREATE_BOOKING,
} from '@/lib/mutations/property';
import { toast } from 'sonner';
import {
  GET_PROPERTIES,
  GET_USER_BOOKINGS,
  GET_WISHLIST_PROPERTIES,
} from '@/lib/queries';

import { Modal, Calendar as AntCalendar } from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import ImageSlider from './ImageSlider/ImageSlider';

const PropertyCard = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.userId;

  const { data: wishListData } = useQuery(GET_WISHLIST_PROPERTIES, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const { data: bookingsData, refetch: refetchBookings } = useQuery(
    GET_USER_BOOKINGS,
    {
      variables: { status: null, limit: 50, offset: 0 },
      skip: !userId,
    },
  );

  const images = property.images || [];

  const [addToWishlist, { loading }] = useMutation(ADD_PROPERTY_TO_WISHLIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ensureAuth } = useRequireAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateClickIntended, setIsDateClickIntended] = useState(false);

  const [createBooking, { loading: bookingLoading }] =
    useMutation(CREATE_BOOKING);

  const toggleAddToWishList = async () => {
    if (!property.id) return;

  if (!ensureAuth('Please login to add item to your wishlist.')) return;

    try {
  const userId = session?.userId;
      const propertyId = property.id;

      await addToWishlist({
        variables: {
          userId,
          propertyId,
        },
        refetchQueries: [
          {
            query: GET_WISHLIST_PROPERTIES,
            variables: { userId },
          },
          {
            query: GET_PROPERTIES,
          },
        ],
      });
      if (isInWishList()) {
        toast.success('Removed from your wishlist.');
      } else {
        toast.success(`Added to your wishlist! This property looks amazing!`, {
          icon: <Heart />,
        });
      }
    } catch (error) {
      toast.error(error?.message || 'Something went wrong! Please try again.');
    }
  };

  const isInWishList = () => {
    const list = wishListData?.getWishlistProperties;
    let result;

    if (wishListData?.getWishlistProperties?.length > 0 && property?.id) {
      result = list.some((item) => item.id === property.id);
    }

    return result || false;
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      return toast.warning('Please select a date.');
    }

    try {
      if (!session?.userId) {
        return toast.error('Please login to book a property.');
      }
      // Calculate simple total based on nightly price and 1 night default
      const nights = dayjs(selectedDate.checkOut).diff(
        dayjs(selectedDate.checkIn),
        'day',
      ) || 1;
      const totalAmount = (property?.pricePerNight || 0) * nights;
      const { data } = await createBooking({
        variables: {
          userId: session.userId,
          propertyId: property.id,
          checkInDate: selectedDate.checkIn,
          checkOutDate: selectedDate.checkOut,
          totalAmount,
        },
      });

      refetchBookings();

      if (data?.createBooking?.id) {
        toast.success('Booking confirmed!');
        setIsModalOpen(false);
        setSelectedDate(null);
        setIsDateClickIntended(false);
      } else {
        throw new Error('Failed to book');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to book. Please try again.');
    }
  };

  const handleClickBookButton = () => {
  if (!property.id) return;
  if (!ensureAuth('Please login to book a property.')) return;
    setIsModalOpen(true);
  };

  const handleDateSelect = (date) => {
    if (!isDateClickIntended) return;

    const formatted = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate({
      checkIn: formatted,
      checkOut: dayjs(date).add(1, 'day').format('YYYY-MM-DD'),
    });

    setIsDateClickIntended(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setIsDateClickIntended(false);
  };

  const bookedDates = useMemo(() => {
    const bookings = bookingsData?.myBookings?.bookings || [];
    if (bookings?.length === 0) return [];
    return bookings.map((item) => item?.checkInDate?.split('T')[0]);
  }, [bookingsData]);

  return (
    <div className="h-fit w-full max-w-[610px] min-w-[280px] rounded-[30px] bg-[#F5F5F5] p-2 sm:min-w-[300px] md:min-w-0">
      <div className="flex h-full flex-col">
        {/* Image Slider */}
        <div className="relative mb-3 h-44 w-full flex-shrink-0 sm:h-48 sm:rounded-3xl">
          <ImageSlider
            images={images || []}
            altText={property.title}
            containerClass="h-full w-full"
          />

          {/* Property features badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {property.featured && (
              <div className="bg-primary rounded-full px-2 py-1 text-xs font-semibold text-black">
                Featured
              </div>
            )}
          </div>

          <BookmarkButton
            onClick={toggleAddToWishList}
            loading={loading}
            isActive={isInWishList()}
          />
        </div>

        <div className="flex-1">
          <div className="mb-3 flex flex-col">
            <Link href={`/property/${property.id}`}>
              <h3 className="text-base leading-tight font-semibold capitalize">
                {property.title}
              </h3>
            </Link>
            <p className="text-primary text-sm">
              {property.propertyType} • {property.location?.city},{' '}
              {property.location?.state}
            </p>
          </div>

          {/* Property details */}
          <div className="my-2 space-y-2 text-xs text-gray-600">
            <div className="mb-4 flex items-center justify-between space-x-2 md:space-x-4">
              {/* <span className="flex items-center">
                <Car
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {property.location?.parkingSpaces || 0} parking
                </span>
              </span> */}
              {property?.mode === 'rental' && <span className="flex items-center">
                <Users
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {property.maxGuests} guests
                </span>
              </span>}
            </div>

            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <Bed
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {property.bedrooms} beds
                </span>
              </span>
              <span className="flex items-center">
                <Bath
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {property.bathrooms} baths
                </span>
              </span>
              <span className="flex items-center">
                <Star
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {Number(property.rating) > 4
                    ? `${property.rating} (Excellent)`
                    : `${property.rating}`}
                </span>
              </span>
            </div>

            {/* Amenities row */}
            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              {property.amenities?.includes('wifi') && property?.mode === 'rental' && (
                <span className="flex items-center">
                  <Wifi
                    className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                    color="#404040"
                  />
                  <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                    Free Wifi
                  </span>
                </span>
              )}
              {property.amenities?.includes('parking') && (
                <span className="flex items-center">
                  <Car
                    className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                    color="#404040"
                  />
                  <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                    Parking
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Price and Book button */}
          {property?.mode === 'rental' && (
            <div className="mt-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  ${property.pricePerNight}
                </span>
                <span className="text-xs text-gray-500">per night</span>
              </div>

              <div className="flex gap-2">
                {property.availableForSwap && (
                  <Button
                    className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-200"
                    style={{ borderRadius: '20px', height: '36px' }}
                    onClick={() => toast.info('Swap feature coming soon!')}
                  >
                    <Heart className="h-4 w-4" />
                    Swap
                  </Button>
                )}

                <Button
                  type="primary"
                  className="bg-primary hover:bg-primary font-medium text-black"
                  style={{ borderRadius: '20px', height: '36px' }}
                  onClick={handleClickBookButton}
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        title="Select Dates for Your Stay"
        open={isModalOpen}
        onOk={handleConfirmBooking}
        confirmLoading={bookingLoading}
        onCancel={handleCloseModal}
        okText="Confirm Booking"
        cancelText="Cancel"
      >
        {selectedDate && (
          <div className="mb-4 text-sm text-gray-600">
            Check-in: {dayjs(selectedDate.checkIn).format('MMM D, YYYY')}
            <br />
            Check-out: {dayjs(selectedDate.checkOut).format('MMM D, YYYY')}
          </div>
        )}
        <AntCalendar
          fullscreen={false}
          onSelect={handleDateSelect}
          className="booking-property-calendar"
          fullCellRender={(value) => {
            const formatted = value.format('YYYY-MM-DD');
            const isSelected = selectedDate?.checkIn === formatted;
            return (
              <div
                className={`mx-auto flex h-full w-[90%] cursor-pointer items-center justify-center rounded-lg ${
                  isSelected ? 'bg-primary text-white' : ''
                }`}
                onMouseDown={() => setIsDateClickIntended(true)}
              >
                {value.date()}
              </div>
            );
          }}
          disabledDate={(current) => {
            const now = dayjs();
            const thisYear = now.year();
            const formatted = current.format('YYYY-MM-DD');

            return (
              current &&
              (current < now.startOf('day') ||
                current.year() !== thisYear ||
                bookedDates.includes(formatted))
            );
          }}
        />
      </Modal>
    </div>
  );
};

export default PropertyCard;
