import { MapPin } from 'lucide-react';

const NotFoundSearchMap = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
      <div className="text-center">
        <div className="mb-2 text-gray-400">
          <MapPin className="mx-auto h-12 w-12" />
        </div>
        <p className="font-medium text-gray-500">No gyms to display on map</p>
        <p className="text-sm text-gray-400">Try adjusting your filters</p>
        <p className="text-sm text-gray-400">Check your spelling</p>
      </div>
    </div>
  );
};

export default NotFoundSearchMap;
