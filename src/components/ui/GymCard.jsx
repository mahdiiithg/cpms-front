'use client';

import { Button } from 'antd';
import {
  MapPin,
  Clock,
  Car,
  Wifi,
  Star,
  Heart,
  Users,
  Bed,
  Bath,
} from 'lucide-react';
import Link from 'next/link';
import BookmarkButton from './BookmarkButton';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
import {
  ADD_PROPERTY_TO_WISHLIST,
  CREATE_BOOKING,
} from '@/lib/mutations/property';
import { toast } from 'sonner';
import {
  GET_PROPERTIES,
  GET_USER_GYM_BOOKINGS,
  GET_WISHLIST_PROPERTIES,
} from '@/lib/queries';

import { Modal, DatePicker } from 'antd';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import ImageSlider from './ImageSlider/ImageSlider';

const { RangePicker } = DatePicker;

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
    GET_USER_GYM_BOOKINGS,
    {
      variables: { userId },
      skip: !userId,
    },
  );

  const images = property.images || [];

  const [addToWishlist, { loading }] = useMutation(ADD_PROPERTY_TO_WISHLIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);

  const [createBooking, { loading: bookingLoading }] =
    useMutation(CREATE_BOOKING);

  const toggleAddToWishList = async () => {
    if (!property.id) return;

    if (!session.user)
      return toast.info('Please login to add item to your wishlist.');

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
        toast.success(
          `Added to your wishlist! This coastal property looks amazing!`,
          {
            icon: <Heart />,
          },
        );
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
    if (!selectedDates || selectedDates.length !== 2) {
      return toast.warning('Please select check-in and check-out dates.');
    }

    const [checkInDate, checkOutDate] = selectedDates;
    const nights = dayjs(checkOutDate).diff(dayjs(checkInDate), 'day');
    const totalAmount = nights * property.pricePerNight;

    try {
      const { data } = await createBooking({
        variables: {
          userId: session?.userId,
          propertyId: property.id,
          checkInDate: checkInDate.format('YYYY-MM-DD'),
          checkOutDate: checkOutDate.format('YYYY-MM-DD'),
          totalAmount,
        },
      });

      refetchBookings();

      if (data?.createBooking?.id) {
        toast.success('Booking confirmed!');
        setIsModalOpen(false);
        setSelectedDates(null);
      } else {
        throw new Error('Failed to book');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to book. Please try again.');
    }
  };

  const handleClickBookButton = () => {
    if (!property.id || !session?.user?.id) {
      return toast.error('Please login to book this property.');
    }
    setIsModalOpen(true);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDates(null);
  };

  const bookedDates = useMemo(() => {
    const bookings = bookingsData?.getUserBookings || [];
    return bookings.filter((booking) => booking.property.id === property.id);
  }, [bookingsData, property.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

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
          {property.availability && (
            <div className="bg-primary absolute top-0 left-5 flex h-4 min-h-fit w-3 min-w-fit flex-col gap-y-0 rounded-b-lg p-1 text-center text-xs font-semibold text-black lg:p-2">
              <span>Available</span>
            </div>
          )}
          <BookmarkButton
            onClick={toggleAddToWishList}
            loading={loading}
            isActive={isInWishList()}
          />
        </div>

        <div className="flex-1">
          <div className="mb-3 flex flex-col">
            <Link href={`/dashboard/properties/${property.id}`}>
              <h3 className="text-base leading-tight font-semibold capitalize">
                {property.title}
              </h3>
            </Link>
            <p className="text-primary text-sm">
              {property.type} • {formatPrice(property.pricePerNight)}/night
            </p>
          </div>

          <div className="my-2 space-y-2 text-xs text-gray-600">
            <div className="mb-4 flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <MapPin
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {property.location.city}, {property.location.state}
                </span>
              </span>
              <span className="flex items-center">
                <Star
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {property.rating?.toFixed(1) || 'New'}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <Users
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {property.maxGuests} guests
                </span>
              </span>
              <span className="flex items-center">
                <Bed
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {property.bedrooms} bedrooms
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
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className="flex items-center space-x-2">
                <Wifi
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {property.amenities.slice(0, 2).join(', ')}
                  {property.amenities.length > 2 &&
                    ` +${property.amenities.length - 2} more`}
                </span>
              </div>
            )}
          </div>

          <Button
            type="primary"
            className="bg-primary hover:bg-primary mt-3 w-full text-sm font-medium text-black sm:text-base"
            style={{ borderRadius: '9999px', height: '48px' }}
            onClick={handleClickBookButton}
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        title="Select Your Stay Dates"
        open={isModalOpen}
        onOk={handleConfirmBooking}
        confirmLoading={bookingLoading}
        onCancel={handleCloseModal}
        okText="Confirm Booking"
        cancelText="Cancel"
        width={600}
      >
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-semibold">{property.title}</h4>
            <p className="text-sm text-gray-600">
              {formatPrice(property.pricePerNight)} per night
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Select check-in and check-out dates:
            </label>
            <RangePicker
              value={selectedDates}
              onChange={handleDateChange}
              disabledDate={(current) => {
                return current && current < dayjs().startOf('day');
              }}
              className="w-full"
              placeholder={['Check-in', 'Check-out']}
            />
          </div>

          {selectedDates && selectedDates.length === 2 && (
            <div className="rounded-lg bg-gray-50 p-3">
              <div className="flex justify-between text-sm">
                <span>Check-in:</span>
                <span>{selectedDates[0].format('MMM D, YYYY')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Check-out:</span>
                <span>{selectedDates[1].format('MMM D, YYYY')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Nights:</span>
                <span>
                  {dayjs(selectedDates[1]).diff(dayjs(selectedDates[0]), 'day')}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t pt-2 font-semibold">
                <span>Total:</span>
                <span>
                  {formatPrice(
                    dayjs(selectedDates[1]).diff(
                      dayjs(selectedDates[0]),
                      'day',
                    ) * property.pricePerNight,
                  )}
                </span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PropertyCard;

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const GymCard = ({ gym }) => {
  const weekDay = new Date().getDay();
  const weekDayName = daysOfWeek[weekDay];

  const { data: session } = useSession();

  const userId =
    session?.provider === 'credentials' ? session?.user?.id : session?.userId;

  const { data: wishListData } = useQuery(GET_USER_WISHLIST, {
    variables: {
      userId,
    },
    skip: !userId,
  });

  const { data: bookingsData, refetch: refetchBookings } = useQuery(
    GET_USER_BOOKINGS,
    {
      variables: { userId },
      skip: !userId,
    },
  );

  const images = gym.images || [];

  const [addToWishlist, { loading }] = useMutation(ADD_GYM_TO_WISHLIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // Changed from array to single value
  const [isDateClickIntended, setIsDateClickIntended] = useState(false);

  const [createBooking, { loading: bookingLoading }] =
    useMutation(CREATE_BOOKING);

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

  const isInWishList = () => {
    const list = wishListData?.getWishlistGyms;
    let result;

    if (wishListData?.getWishlistGyms?.length > 0 && gym?.id) {
      result = list.some((item) => item.id === gym.id);
    }

    return result || false;
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate) {
      return toast.warning('Please select a date.');
    }

    try {
      const { data } = await createBooking({
        variables: {
          userId:
            session?.provider === 'credentials'
              ? session?.user?.id
              : session?.userId,
          gymId: gym.id,
          dateOfBooking: selectedDate.split('T')?.[0],
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
  if (!gym.id || !session?.userId) {
      return toast.error('Please login to book a session.');
    }
    setIsModalOpen(true);
  };

  const handleDateSelect = (date) => {
    // Only process if this was an intentional click
    if (!isDateClickIntended) return;

    const formatted = dayjs(date).format('YYYY-MM-DD');

    // Simply set the selected date (replace previous selection)
    setSelectedDate(formatted);

    // Reset the flag
    setIsDateClickIntended(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setIsDateClickIntended(false);
  };

  // Handle calendar month/year changes without triggering date selection
  const handleCalendarChange = (date) => {
    setCalendarValue(date);
  };

  const bookedDates = useMemo(() => {
    const bookings = bookingsData?.getUserBookings || [];

    if (bookings?.length === 0) return [];

    return bookings.map((item) => item?.dateOfBooking?.split('T')[0]);
  }, [bookingsData]);

  return (
    <div className="h-fit w-full max-w-[610px] min-w-[280px] rounded-[30px] bg-[#F5F5F5] p-2 sm:min-w-[300px] md:min-w-0">
      <div className="flex h-full flex-col">
        {/* Image Slider */}
        <div className="relative mb-3 h-44 w-full flex-shrink-0 sm:h-48 sm:rounded-3xl">
          <ImageSlider
            images={images || []}
            altText={gym.name}
            containerClass="h-full w-full"
          />
          {gym.availability && (
            <div className="bg-primary absolute top-0 left-5 flex h-4 min-h-fit w-3 min-w-fit flex-col gap-y-0 rounded-b-lg p-1 text-center text-xs font-semibold text-black lg:p-2">
              <span>open</span>
              <span className="-mt-1 text-sm font-bold">Now</span>
            </div>
          )}
          <BookmarkButton
            onClick={toggleAddToWishList}
            loading={loading}
            isActive={isInWishList()}
          />
        </div>

        <div className="flex-1">
          <div className="mb-3 flex flex-col">
            <Link href={`/dashboard/gyms/${gym.id}`}>
              <h3 className="text-base leading-tight font-semibold capitalize">
                {gym.name}
              </h3>
            </Link>
            <p className="text-primary text-sm">
              Available with {gym.subscriptionType}
            </p>
          </div>

          <div className="my-2 space-y-2 text-xs text-gray-600">
            <div className="mb-4 flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <MapPin
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {gym.address}
                </span>
              </span>
              <span className="flex items-center">
                <Route
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#171717"
                />
                <span className="text-gray-[#171717] flex-1 text-xs font-medium">
                  {gym.distance}km
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <Star
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {Number(gym.rating) > 4
                    ? `${gym.rating} (Top rated)`
                    : `${gym.rating}`}
                </span>
              </span>
              <span className="flex items-center">
                <Car
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {gym.parking && gym.facilities.includes('parking')
                    ? 'Free parking'
                    : 'Not Available'}
                </span>
              </span>
              <span className="flex items-center">
                <Clock
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  {gym.workingHours?.[weekDayName]}
                </span>
              </span>
            </div>
            <div className="flex items-center justify-between space-x-2 md:space-x-4">
              <span className="flex items-center">
                <Wifi
                  className="mr-1 h-[16px] w-[16px] flex-shrink-0"
                  color="#404040"
                />
                <span className="flex-1 text-[12px] text-[#A3A3A3] md:text-xs">
                  Free Wifi
                </span>
              </span>
            </div>
          </div>

          <Button
            type="primary"
            className="bg-primary hover:bg-primary mt-3 w-full text-sm font-medium text-black sm:text-base"
            style={{ borderRadius: '9999px', height: '48px' }}
            onClick={handleClickBookButton}
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        title="Select a Date to Book"
        open={isModalOpen}
        onOk={handleConfirmBooking}
        confirmLoading={bookingLoading}
        onCancel={handleCloseModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        {selectedDate && (
          <div className="mb-4 text-sm text-gray-600">
            Selected: {dayjs(selectedDate).format('MMM D, YYYY')}
          </div>
        )}
        <Calendar
          fullscreen={false}
          onSelect={handleDateSelect}
          className="booking-gym-calendar"
          fullCellRender={(value) => {
            const formatted = value.format('YYYY-MM-DD');
            const isSelected = selectedDate === formatted;
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
              (current < now.startOf('day') || // disable past days
                current.year() !== thisYear || // disable if not in this year
                bookedDates.includes(formatted)) // disable booked dates
            );
          }}
        />
      </Modal>
    </div>
  );
};

export { GymCard };
