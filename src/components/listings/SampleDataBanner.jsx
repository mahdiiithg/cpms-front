'use client';

/**
 * Soft notice shown when listings come from local demo/sample data.
 */
export default function SampleDataBanner({
  message = 'Showing demo coastal listings while live inventory is unavailable.',
}) {
  return (
    <div className="rounded-lg border border-[#ccff00]/25 bg-[#212121] p-4">
      <p className="text-sm text-gray-300">
        <span className="mr-2 font-medium text-[#ccff00]">Demo listings</span>
        {message}
      </p>
    </div>
  );
}
