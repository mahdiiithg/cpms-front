'use client';

import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import NotificationTabButton from '@/components/ui/NotificationTabButton';

const FAQTabs = ({ faqData }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState('subscription');

  const handleClickTabs = (tabKey) => {
    if (activeTab === tabKey) return;
    setActiveTab(tabKey);
  };

  return (
    <>
      {/* Tab Buttons */}
      <div className="ml-auto flex w-fit items-center justify-start gap-1">
        <NotificationTabButton
          text="subscription"
          isActive={activeTab === 'subscription'}
          onClick={handleClickTabs}
          isMobileSize={isMobile}
        />
        <NotificationTabButton
          text="services"
          isActive={activeTab === 'services'}
          onClick={handleClickTabs}
          isMobileSize={isMobile}
        />
        <NotificationTabButton
          text="payment"
          isActive={activeTab === 'payment'}
          onClick={handleClickTabs}
          isMobileSize={isMobile}
        />
      </div>

      {/* FAQ List */}
      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {faqData[activeTab]?.map((faq, index) => (
          <div
            key={index}
            className={`rounded-3xl bg-gray-100 p-4 md:p-8 ${
              !isMobile && index % 2 !== 0 ? 'mt-2' : ''
            }`}
          >
            <p className="mb-2 text-base font-medium text-green-500">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </p>
            <h3 className="mb-1 text-lg text-gray-900 md:text-xl">
              {faq.question}
            </h3>
            <p className="text-sm text-gray-400 md:text-base">{faq.answer}</p>
          </div>
        ))}
        {faqData[activeTab]?.length === 0 && (
          <div className="col-span-2 mt-10 text-center text-gray-400">
            No FAQs available in this category.
          </div>
        )}
      </div>
    </>
  );
};

export default FAQTabs;
