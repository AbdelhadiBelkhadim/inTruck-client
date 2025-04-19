import { X } from "lucide-react";

export default function MoreDetails({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-50">
      <div className="relative w-full max-w-md bg-[#00b4d8] rounded-3xl p-8 shadow-xl">
        {/* Close button */}
        <button 
          className="absolute top-6 right-6 text-white hover:opacity-80" 
          onClick={onClose}
          aria-label="Close More Details"
        >
          <X size={32} strokeWidth={3} />
        </button>

        {/* Title */}
        <h2 className="text-white text-4xl font-bold text-center mb-12">More Details</h2>

        {/* Details */}
        <div className="space-y-6">
          {/* Exit */}
          <div className="bg-[#ffffff] rounded-xl p-4 px-6">
            <div className="flex items-center">
              <span className="text-[#000000] text-2xl font-medium w-[180px]">Exit :</span>
              <span className="text-[#ff0000] text-2xl font-medium">April 7, 2025 – 9:01 PM</span>
            </div>
          </div>

          {/* Arrival */}
          <div className="bg-[#ffffff] rounded-xl p-4 px-6">
            <div className="flex items-center">
              <span className="text-[#000000] text-2xl font-medium w-[180px]">Arrival :</span>
              <span className="text-[#ff0000] text-2xl font-medium">April 9, 2025 – 6:42 PM</span>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="bg-[#ffffff] rounded-xl p-4 px-6">
            <div className="flex items-center">
              <span className="text-[#000000] text-2xl font-medium w-[180px]">Pickup Location:</span>
              <span className="text-[#ff0000] text-2xl font-medium">Casablanca, Morocco</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
