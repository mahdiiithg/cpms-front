import { CalendarDays, Clock4 } from 'lucide-react';

const NotificationItem = ({ notif }) => {
  return (
    <div
      key={notif.id}
      className={`w-full border-l-4 bg-[#FAFAFA] p-3 md:p-5 ${notif.isRead ? 'border-black' : 'border-primary'}`}
    >
      <div className="flex flex-col items-start justify-between gap-3">
        <div className="flex w-fit items-center justify-start gap-1">
          <div
            className={`${notif.isRead ? 'bg-black' : 'bg-primary'} h-6 w-6 rounded`}
          />
          <h2
            className={`${notif.isRead ? 'text-black' : 'text-primary'} text-lg font-semibold md:text-2xl`}
          >
            {notif.type}
          </h2>
        </div>
        <p className="text-sm leading-5 font-light md:text-base">
          {notif.description}
        </p>
        <div className="flex w-full items-center justify-end gap-1">
          <div className="flex w-fit items-center justify-between gap-1">
            <CalendarDays size={16} color="#A3A3A3" />
            <span className="-mb-[2px] text-[13px] font-light text-[#A3A3A3]">
              {notif.date}
            </span>
          </div>
          <div className="flex w-fit items-center justify-between gap-1">
            <Clock4 size={16} color="#A3A3A3" />
            <span className="-mb-[2px] text-[13px] font-light text-[#A3A3A3]">
              {notif.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
