const pinImage =
  'https://www.freepnglogos.com/uploads/pin-png/pin-transparent-png-pictures-icons-and-png-backgrounds-7.png';

const StickyNoteCard = () => {
  return (
    <div className="relative w-80 h-auto p-4 bg-[#FFF176] rounded-md shadow-xl transform rotate-[-3deg] transition-transform duration-300 hover:-translate-y-1 hover:scale-105">
      <img
        src={pinImage}
        alt="Pin"
        className="absolute -top-5 -right-4 w-10 h-10 drop-shadow-lg rotate-[-20deg]"
      />

      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg font-bold text-gray-800">Today's Schedule</h2>
        <p className="text-sm text-gray-700">Wednesday, August 6, 2025</p>
      </div>

      {/* Schedule Info */}
      <div className="mt-2">
        <div className="flex items-center space-x-2">
          <span className="bg-[#2979FF] text-white text-xs px-2 py-0.5 rounded-full">
            Chargeable
          </span>
          <span className="text-sm font-semibold text-gray-800">Site Visit</span>
        </div>
        <p className="text-sm text-gray-800 mt-1">
          <strong>Project:</strong> PRJ001
        </p>
        <p className="text-sm text-gray-800">Commissioning work at client site</p>
      </div>

      {/* Reminder */}
      <div className="mt-4 p-2 bg-[#FFF9C4] border-l-4 border-yellow-400">
        <p className="text-sm text-yellow-900">
          <strong>Remember:</strong> Submit tomorrow's schedule before 5 PM today.
        </p>
      </div>
    </div>
  );
};

export default StickyNoteCard;
