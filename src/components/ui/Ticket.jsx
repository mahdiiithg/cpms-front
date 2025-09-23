'use client';

import { PencilLine } from 'lucide-react';
import { Button, Divider, Popover } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

const Ticket = ({
  item,
  isMobile,
  gymName,
  workingHours,
  date,
  qrCode,
  onEdit,
  handleChangeDate,
  handleCancelBooking,
  bookingId,
  bookingDate
}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <div className="relative flex items-start justify-between gap-2 rounded-4xl bg-[#FAFAFA] p-4 sm:gap-4 md:p-6">
      {/* Triangle 1 (pointing up) */}
      <div className="absolute bottom-0 left-[24.5%] h-1 w-1 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-white border-l-transparent" />
      {/* Triangle 2 (pointing down) */}
      <div className="absolute top-0 left-[24.5%] h-1 w-1 border-t-[10px] border-r-[10px] border-l-[10px] border-t-white border-r-transparent border-l-transparent" />

      <Image
        width={isMobile ? 150 : 200}
        height={isMobile ? 150 : 200}
        src={qrCode || ""}
        alt="qrcode"
        loading="eager"
      />
      <div className="my-auto h-full min-h-36 w-1 border-l-3 border-dashed border-black opacity-10 md:min-h-52" />
      <div className="flex flex-1 flex-col items-start justify-between gap-1">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-normal md:text-2xl">{gymName}</p>
          <Popover
            content={
              <div className="flex flex-col gap-1">
                <Button
                  size="small"
                  type="text"
                  onClick={() => {
                    handleChangeDate(bookingId);
                    setPopoverVisible(false);
                  }}
                  style={{ fontSize: 12 }}
                >
                  Change Date
                </Button>
                <Divider size="small" style={{ margin: 0 }} />
                <Button
                  size="small"
                  type="text"
                  danger
                  onClick={() => {
                    handleCancelBooking(bookingId, bookingDate);
                    setPopoverVisible(false);
                  }}
                  style={{ fontSize: 12 }}
                >
                  Cancel
                </Button>
              </div>
            }
            trigger="click"
            open={popoverVisible}
            onOpenChange={(visible) => setPopoverVisible(visible)}
          >
            <Button
              iconPosition="end"
              icon={<PencilLine size={18} />}
              type="text"
              style={{ padding: 0, background: 'none' }}
              onClick={() => onEdit(item)}
            >
              Edit
            </Button>
          </Popover>
        </div>
        <div className="flex w-fit items-center justify-start gap-1 text-sm opacity-30 sm:text-base md:gap-2 md:text-xl">
          <span>{date}</span>
          {/* <span>|</span>
          <span>8:00 am - 9:00 am</span> */}
        </div>
        <hr className="my-2 w-full opacity-5 md:my-4" />
        <div>
          <p className="mb-1 text-sm font-medium md:text-base">Booking info</p>
          <div className="flex w-full items-center justify-start gap-4 text-base font-medium sm:gap-8 md:gap-14">
            <div>
              <p className="text-sm font-light opacity-30 md:text-base">
                status
              </p>
              <p className="text-sm md:text-base">upcoming</p>
            </div>
            <div>
              <p className="text-sm font-light opacity-30 md:text-base">
                booking id
              </p>
              <p className="text-sm md:text-base">12348f</p>
            </div>
            <div>
              <p className="text-sm font-light opacity-30 md:text-base">
                class type
              </p>
              <p className="text-sm md:text-base">Gym</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
