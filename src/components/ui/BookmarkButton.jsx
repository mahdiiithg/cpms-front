import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ isActive, onClick, loading }) => {
  return (
    <button
      aria-label={isActive ? 'Remove bookmark' : 'Save property'}
      className={`hover:bg-primary absolute top-2 right-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full p-0.5 opacity-90 shadow-md duration-300 sm:right-3 sm:h-8 sm:w-8 ${
        isActive ? 'bg-primary' : 'bg-white'
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <Bookmark size={15} fill={isActive ? '#000' : 'none'} color="#000" />
    </button>
  );
};

export default BookmarkButton;
