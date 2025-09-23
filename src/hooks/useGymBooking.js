import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOKING } from '@/lib/mutations';
import { toast } from 'sonner';
import dayjs from 'dayjs';

export const useGymBooking = ({
  gym,
  selectedDate,
  userId,
  refetchBookings,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [createBooking] = useMutation(CREATE_BOOKING);

  const handleBook = async () => {
    if (!userId) {
      toast.error('Please log in to make a booking.');
      return;
    }

    if (!selectedDate) {
      toast.warning('Please select a date to book.');
      return;
    }

    // Check if selected date is in the past
    if (selectedDate.isBefore(dayjs().startOf('day'))) {
      toast.warning('Cannot book for past dates.');
      return;
    }

    setIsLoading(true);

    try {
      const gymId = gym?.id;
      const dateOfBooking = selectedDate.format('YYYY-MM-DD');

      const { data } = await createBooking({
        variables: {
          userId,
          gymId,
          dateOfBooking,
        },
      });

      if (data?.createBooking?.id) {
        toast.success(
          'Booking confirmed! You will see your reservation in your dashboard.',
        );
        refetchBookings();
      } else {
        toast.error('Booking failed. Please try again or contact support.');
      }
    } catch (error) {
      console.error('Booking error:', error);

      // Handle specific error cases
      if (error.message?.includes('already booked')) {
        toast.error('You already have a booking for this date.');
      } else if (error.message?.includes('not available')) {
        toast.error('This gym is not available for the selected date.');
      } else {
        toast.error('Booking failed. Please try again or contact support.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleBook,
    isLoading,
  };
};
