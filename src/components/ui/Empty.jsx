import { Inbox } from 'lucide-react';

const Empty = ({ icon, message }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-auto max-w-md p-8 text-center">
        <div className="mb-4 text-gray-400">
          {icon || <Inbox className="mx-auto h-16 w-16" />}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {message || 'No Data!'}
        </h3>
      </div>
    </div>
  );
};

export default Empty;
