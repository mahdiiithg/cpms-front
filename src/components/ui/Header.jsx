'use client';

import { BicepsFlexed, Dumbbell, Home, ChevronLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import NavbarMenuItem from './NavbarMenuItem';
import UserProfilePopover from './UserProfilePopover';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NotificationPopover from './NotificationPopover';

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const menuitems = [
    {
      href: '#',
      icon: <Home className="h-4 w-4 lg:h-5 lg:w-5" />,
      label: 'home',
      isActive: false,
    },
    {
      href: '#',
      icon: <Dumbbell className="h-4 w-4 lg:h-5 lg:w-5" />,
      label: 'properties',
      isActive: pathname === '/dashboard',
    },
    {
      href: '#',
      icon: <BicepsFlexed className="h-4 w-4 lg:h-5 lg:w-5" />,
      label: 'about',
      isActive: pathname === '/about',
    },
  ];

  return (
    <header className="items-center justify-between rounded-full md:flex md:bg-[#fafafa] md:py-1">
      <div className="ml-3 hidden w-fit items-center space-x-8 md:flex">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 rounded bg-black"></div>
          <span className="text-xl font-bold">COAST PLANET</span>
        </div>
      </div>

      <nav className="hidden items-center space-x-6 md:flex">
        {menuitems.map((item, idx) => (
          <NavbarMenuItem key={idx} {...item} />
        ))}
      </nav>

      {!session ? (
        <Link
          href="/signin"
          className="flex h-[46px] w-fit items-center justify-center rounded-full bg-black px-6 text-center text-white lg:h-[56px] lg:w-[124px]"
        >
          LOG IN
        </Link>
      ) : (
        <div className="hidden w-fit items-center justify-center gap-1 md:flex lg:mr-2">
          <NotificationPopover />
          <UserProfilePopover />
        </div>
      )}

      <div className="flex w-full items-center justify-between md:hidden">
        <div className="flex items-center justify-center gap-x-1">
          {pathname === '/dashboard' ? (
            <div>
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl">
                <span className="font-semibold">Hello</span>{' '}
                {session && session?.user?.name?.split(' ')?.[0]}
              </h1>
              <p className="mb-2 text-xs text-gray-400 sm:text-base md:text-lg">
                Welcome to Coast Planet application!
              </p>
            </div>
          ) : (
            <Link href="/dashboard" className="-ml-2">
              <ChevronLeft />
            </Link>
          )}
        </div>

        <div className="flex w-fit items-center justify-center gap-1">
          <NotificationPopover triggerType="click" />
          <UserProfilePopover triggerType="click" />
        </div>
      </div>
    </header>
  );
};

export default Header;
