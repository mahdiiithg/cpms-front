import { Bookmark } from 'lucide-react';

const BookmarkButton = ({ isActive, onClick, loading }) => {
  return (
    <button
      className={`hover:bg-primary absolute top-2 right-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-1 opacity-90 shadow-lg duration-300 ${
        isActive ? 'bg-primary' : 'bg-white'
      }`}
      onClick={onClick}
      disabled={loading}
    >
      <Bookmark size={19} fill={isActive ? '#000' : 'none'} color="#000" />
    </button>
  );
};

export default BookmarkButton;
