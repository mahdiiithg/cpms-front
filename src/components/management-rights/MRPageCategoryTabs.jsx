import Link from 'next/link';
import { Button } from 'antd';

export default function MRPageCategoryTabs({}) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <Link href="/management-rights/permanent">
        <Button className="border-0 bg-[#ccff00] font-semibold text-[#171717] shadow-[0_0_15px_rgba(204,255,0,0.6)] hover:bg-[#ccff00]">
          Permanent
        </Button>
      </Link>
      <Link href="/management-rights/resort-holiday">
        <Button className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">
          Resort | Holiday
        </Button>
      </Link>
      <Link href="/management-rights/retirement">
        <Button className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">
          Retirement
        </Button>
      </Link>
      <Link href="/management-rights/off-the-plan">
        <Button className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">
          Off The Plan
        </Button>
      </Link>
      <Link href="/investment-property">
        <Button className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">
          Investment Property
        </Button>
      </Link>
      <Link href="/rentals-property">
        <Button className="border-gray-700 bg-[#212121] text-gray-300 hover:border-[#ccff00] hover:text-[#ccff00]">
          Rentals
        </Button>
      </Link>
    </div>
  );
}
