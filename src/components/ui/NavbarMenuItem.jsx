import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

const NavbarMenuItem = ({
  icon, // React node, e.g. <Home />
  label,
  href = '#',
  className = '',
  isActive = false,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        'flex h-[46px] w-[100px] items-center space-x-1 overflow-hidden rounded-full bg-[#f2f2f2] p-1 font-normal text-gray-600 uppercase transition-colors duration-200 hover:bg-[#e8e8e8] hover:text-black lg:h-[48px] lg:w-[130px] lg:space-x-2',
        className,
      )}
    >
      <span
        className={`h-fit w-fit rounded-full ${isActive ? 'bg-primary' : 'bg-white'} p-2`}
      >
        {icon && icon}
      </span>
      <span className="text-sm lg:text-base">{label}</span>
    </Link>
  );
};

export default NavbarMenuItem;
