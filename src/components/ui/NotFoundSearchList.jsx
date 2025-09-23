import { MapPin } from 'lucide-react';

const NotFoundSearchList = ({ inputSearchQuery, message }) => {
  return (
    <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
      <div className="text-center">
        <div className="mb-2 text-gray-400">
          <MapPin className="mx-auto h-12 w-12" />
        </div>
        <p className="font-medium text-gray-500"> No gyms found!</p>
        {message && (
          <span className="font-normal text-gray-500">{message}</span>
        )}
        {inputSearchQuery && !message && (
          <>
            We couldn't find any gyms matching "
            <span className="font-medium">{inputSearchQuery}</span>"
          </>
        )}
      </div>
    </div>
  );
};

export default NotFoundSearchList;
