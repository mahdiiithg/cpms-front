import { LucideMessageCircleQuestion } from 'lucide-react';
import FAQTabs from './_components/FAQTabs';
import DashboardHeader from '@/components/ui/DashboardHeader';

const faqData = {
  payment: [
    {
      question: 'What Payment Methods Are Accepted?',
      answer:
        'We accept Credit/Debit Cards, Apple Pay, Google Pay, and local bank payments.',
    },
    {
      question: 'Will I Be Charged Automatically Each Month?',
      answer:
        'Yes, subscriptions renew automatically unless cancelled before the next billing date.',
    },
    {
      question: 'How Can I Update My Payment Method?',
      answer:
        'Go to Settings > Billing > Payment Method to update your card or method.',
    },
    {
      question: 'What Happens If My Payment Fails?',
      answer: `You'll receive a notification and your access will be paused until the issue is resolved.`,
    },
    {
      question: 'Can I Get A Refund If I Cancel Early?',
      answer: `Unfortunately, we don't offer refunds for partially used billing cycles.`,
    },
    {
      question: 'Are There Any Hidden Charges?',
      answer:
        'No. All prices are transparent and shown before you confirm your subscription.',
    },
  ],
  subscription: [
    {
      question: 'How Do I Subscribe?',
      answer:
        'You can subscribe by visiting the pricing section and selecting your preferred plan.',
    },
    {
      question: 'Can I Change My Plan Later?',
      answer:
        'Yes, you can upgrade or downgrade your plan anytime from your account settings.',
    },
    {
      question: 'Do I Need to Sign a Contract?',
      answer:
        'No contracts required — all subscriptions are month-to-month unless stated otherwise.',
    },
    {
      question: 'Can I Pause My Subscription?',
      answer:
        'Yes, you can pause your subscription temporarily from the billing section.',
    },
  ],
  services: [
    {
      question: 'What Services Are Included in the Subscription?',
      answer:
        'Your subscription includes access to multiple gyms, fitness classes, and partner facilities.',
    },
    {
      question: 'How Do I Access Partner Gyms?',
      answer:
        'Just check in through the app at any of our partner gyms — no extra steps needed.',
    },
    {
      question: 'Are Personal Trainers Available?',
      answer: `Some gyms offer personal training sessions. You can book these directly through the gym's profile.`,
    },
    {
      question: 'Is There an App for Booking?',
      answer:
        'Yes, our app allows you to browse gyms, check availability, and book sessions instantly.',
    },
  ],
};

const FAQPage = () => {
  return (
    <div className="flex h-full flex-col">
      <DashboardHeader />

      <div className="flex flex-1 items-start justify-center">
        <div className="flex h-full w-full max-w-[1200px] flex-col items-start justify-start gap-4 md:p-10 lg:p-32 lg:py-5">
          {/* Header */}
          <div className="flex h-fit w-full flex-wrap items-start justify-between gap-3">
            <div className="flex w-fit items-center justify-start gap-1">
              <LucideMessageCircleQuestion
                size={38}
                className="h-[23px] w-[23px] md:h-[38px] md:w-[38px]"
              />
              <h1 className="text-xl uppercase md:text-2xl lg:text-4xl">
                FAQ & Helps
              </h1>
            </div>
          </div>

          <FAQTabs faqData={faqData} />
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
