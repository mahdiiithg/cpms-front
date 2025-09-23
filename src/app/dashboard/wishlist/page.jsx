'use client';

import useMediaQuery from '@/hooks/useMediaQuery';
import DashboardHeader from '@/components/ui/DashboardHeader';
import GymsList from '@/components/GymsList';
import { useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import { Heart } from 'lucide-react';
import Empty from '@/components/ui/Empty';
import { GET_USER_WISHLIST } from '@/lib/queries/propertyQueries';

const WishListPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { data: session } = useSession();

  const { data: wishListData, loading } = useQuery(GET_USER_WISHLIST, {
    variables: {
      userId:
        session?.provider === 'credentials'
          ? session?.user?.id
          : session?.userId,
    },
  });

  const gymCount = wishListData?.getWishlistGyms?.length || 0;

  return (
    <div className="flex h-full flex-col">
      <DashboardHeader />

      <div className="flex flex-1 items-start justify-center">
        <div className="flex h-full w-full max-w-[1200px] flex-col items-start justify-start gap-4 md:p-10 lg:p-32 lg:py-5">
          {/* header */}
          <div className="flex h-fit w-full items-start justify-start">
            <div className="flex w-fit items-center justify-start gap-1">
              <Heart size={isMobile ? 23 : 38} />
              <h1 className="text-xl uppercase md:text-2xl lg:text-4xl">
                Wishlist
              </h1>
            </div>
          </div>
          {/* list */}
          <div className="w-full flex-1">
            {gymCount === 0 && !loading ? (
              <Empty message="Your wishlist is empty." />
            ) : (
              <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] sm:justify-items-stretch">
                <GymsList
                  gyms={wishListData?.getWishlistGyms}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListPage;
