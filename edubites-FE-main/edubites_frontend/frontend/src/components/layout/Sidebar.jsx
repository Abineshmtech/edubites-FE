import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdEvent,
  MdMenuBook,
  MdRestaurant,
  MdShoppingCart,
  MdReceiptLong,
  MdHealing,
  MdAdminPanelSettings,
} from "react-icons/md";

const menuItems = [
  { path: "/", icon: MdDashboard, label: "Dashboard" },
  { path: "/events", icon: MdEvent, label: "Events" },
  { path: "/library", icon: MdMenuBook, label: "Library" },
  { path: "/canteen", icon: MdRestaurant, label: "Canteen" },
  { path: "/cart", icon: MdShoppingCart, label: "Cart" },
  { path: "/order-history", icon: MdReceiptLong, label: "Order History" },
  { path: "/pad-request", icon: MdHealing, label: "EduBites Care" },
  { path: "/admin", icon: MdAdminPanelSettings, label: "Admin Panel" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm z-40 hidden lg:flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-edubites-sky">🍎 EduBites</h1>
        <p className="text-xs text-gray-500 mt-1">Smart Campus</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive ? "bg-edubites-sky/10 text-edubites-sky font-medium" : "text-gray-600 hover:bg-gray-50"}
              `
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
