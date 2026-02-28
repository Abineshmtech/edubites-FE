import { useState } from "react";
import { MdMenu, MdNotifications, MdPerson } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 shadow-sm z-30 flex items-center justify-between px-4 lg:px-8">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <MdMenu className="w-6 h-6 text-gray-600" />
      </button>

      <div
        onClick={() => navigate("/")}
        className="lg:hidden text-lg font-bold text-edubites-sky cursor-pointer"
      >
        🍎 EduBites
      </div>

      <div className="flex-1 lg:flex-none" />

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <MdNotifications className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
          <div className="w-8 h-8 rounded-full bg-edubites-mint flex items-center justify-center">
            <MdPerson className="w-5 h-5 text-gray-600" />
          </div>
          <span className="hidden sm:inline text-sm font-medium text-gray-700">Student</span>
        </button>
      </div>
    </header>
  );
}
