'use client';

import { CalendarDays, Clock4 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const DashboardHeader = () => {
  const { data: session } = useSession();

  const weekDay = new Date().getDay();
  const weekDayShort = daysOfWeek[weekDay].slice(0, 3).toUpperCase();

  const now = new Date();

  const shortMonth = now
    .toLocaleString('en-US', { month: 'short' })
    .toLowerCase(); // "jun"
  const day = String(now.getDate()).padStart(2, '0'); // "26"
  const year = now.getFullYear(); // 2025

  const WeekDayFullWithYear = `${shortMonth}/${day}/${year}`; // "jun/26/2025"

  // e.g. "14:05"
  const WeekDayTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col items-center justify-center gap-3 text-xl">
        <p className="text-2xl md:text-4xl">
          Hello,{' '}
          <span className="font-semibold">
            {session?.user?.name?.split(' ')?.[0]}
          </span>
        </p>
      </div>
      <div className="relative w-fit flex-1 text-right">
        <p className="text-[80px] font-bold text-[#FAFAFA] md:text-[120px]">
          {weekDayShort}
        </p>
        <div className="absolute right-0 bottom-10 flex w-fit items-center justify-end gap-1 md:bottom-[60px]">
          <div className="flex items-center justify-between gap-1">
            <CalendarDays size={16} color="#A3A3A3" />
            <span className="-mb-[2px] text-[13px] font-light text-[#A3A3A3]">
              {WeekDayFullWithYear}
            </span>
          </div>
          <div className="flex w-fit items-center justify-between gap-1">
            <Clock4 size={16} color="#A3A3A3" />
            <span className="-mb-[2px] text-[13px] font-light text-[#A3A3A3]">
              {WeekDayTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
