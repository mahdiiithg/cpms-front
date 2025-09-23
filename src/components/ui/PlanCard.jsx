import React from 'react';
import Link from 'next/link';
import { CircleCheck, CircleX, Dumbbell } from 'lucide-react';
import { Button } from 'antd';

const PlanCard = ({
  type = 'standard',
  cardNumber,
  title,
  price,
  description,
  pros,
  cons,
  planId,
  isCurrentPlan = false,
}) => {
  const planHeaderColor = () => {
    switch (type) {
      case 'standard':
        return 'from-[#E7FAE3] to-[#85E872]';
      case 'premium':
        return 'from-[#E5E5E5] to-[#171717]';

      default:
        return 'from-[#F2F2F2] to-[#D4D4D4]';
    }
  };

  return (
    <div className="flex h-[600px] w-full flex-col items-start justify-start gap-4 overflow-hidden rounded-4xl bg-[#FAFAFA]">
      {/* Card Header */}
      <div
        className={`card-header relative flex h-[130px] min-h-[130px] w-full items-end justify-start bg-linear-to-r p-4 xl:h-[150px] ${planHeaderColor()}`}
      >
        <span className="absolute top-0 right-0 text-9xl font-semibold text-[#FAFAFA]">
          {cardNumber}
        </span>
        <div className="flex w-full items-center justify-start gap-1">
          <Dumbbell size={22} />
          <p className="text-2xl uppercase">{title}</p>
        </div>
      </div>
      {/* Price */}
      <div className="w-full p-4">
        <div className="flex items-end justify-start gap-0">
          <div className="flex items-center justify-around gap-1 text-4xl">
            <span className="uppercase">aed</span>
            <p>{price}</p>
          </div>
          <span className="text-base">/Month</span>
        </div>
        <p className="mt-2 text-base text-gray-400 capitalize">{description}</p>
      </div>
      {/* Action Button */}
      <div className="w-full px-4">
        {isCurrentPlan ? (
          <Button
            disabled
            className="w-full capitalize"
            style={{ borderRadius: 999 }}
          >
            Current Plan
          </Button>
        ) : (
          <Link href={`/dashboard/plans/payment?planId=${planId}`}>
            <Button
              type="primary"
              className="w-full capitalize"
              style={{ borderRadius: 999 }}
            >
              upgrade to {type}
            </Button>
          </Link>
        )}
      </div>
      <div className="w-full px-4">
        <p className="mt-4 mb-6 text-base font-semibold capitalize">
          for beginners
        </p>
        <div className="flex items-start justify-between gap-1 capitalize">
          {/* Pros */}
          <ul className="space-y-2">
            {pros.map((item, idx) => (
              <li key={idx}>
                <div className="flex items-center justify-start gap-1">
                  <CircleCheck size={20} color="#404040" />
                  <p className="text-base text-gray-400">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
          {/* Cons */}
          <ul className="space-y-2">
            {cons.map((item, idx) => (
              <li key={idx}>
                <div className="flex items-center justify-start gap-1">
                  <CircleX size={20} color="#404040" />
                  <p className="text-base text-gray-400">{item.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
