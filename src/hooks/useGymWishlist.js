import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_GYM_TO_WISHLIST } from '@/lib/mutations';
import { toast } from 'sonner';
import { BicepsFlexed } from 'lucide-react';
import { GET_USER_WISHLIST } from '@/lib/queries/propertyQueries';

export const useGymWishlist = ({ gym, userId, wishListData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [addToWishlist] = useMutation(ADD_GYM_TO_WISHLIST);

  const isInWishList = () => {
    if (!wishListData?.getWishlistGyms?.length || !gym?.id) {
      return false;
    }

    return wishListData.getWishlistGyms.some((item) => item.id === gym.id);
  };

  const toggleAddToWishList = async () => {
    if (!userId) {
      toast.error('Please log in to manage your wishlist.');
      return;
    }

    if (!gym?.id) {
      toast.error('Invalid gym data.');
      return;
    }

    setIsLoading(true);
    const wasInWishlist = isInWishList();

    try {
      const { data } = await addToWishlist({
        variables: {
          userId,
          gymId: gym.id,
        },
        refetchQueries: [
          {
            query: GET_USER_WISHLIST,
            variables: { userId },
          },
        ],
      });

      if (wasInWishlist) {
        toast.success('Removed from your wishlist.');
      } else {
        toast.success(
          `Added to your wishlist! Great choice — you'll love working out there!`,
          {
            icon: <BicepsFlexed size={16} />,
          },
        );
      }
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error(error?.message || 'Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleAddToWishList,
    isInWishList,
    isLoading,
  };
};
