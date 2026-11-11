'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ListingBreadcrumb({
  current = 'Buy',
  items = [{ href: '/', label: 'Home' }],
}) {
  return (
    <div className="border-b border-gray-800 bg-[#1a1a1a] py-2 sm:py-3">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex items-center space-x-1 text-xs text-gray-400 sm:space-x-2 sm:text-sm">
          {items.map((item) => (
            <span key={item.href} className="flex items-center space-x-1 sm:space-x-2">
              <Link href={item.href} className="transition-colors hover:text-[#ccff00]">
                {item.label}
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </span>
          ))}
          <span className="text-[#ccff00]">{current}</span>
        </div>
      </div>
    </div>
  );
}
