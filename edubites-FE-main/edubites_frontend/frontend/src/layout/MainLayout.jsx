import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-white shadow-xl z-50 lg:hidden
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-edubites-sky">🍎 EduBites</h1>
        </div>
        <nav className="p-4">
          {[
            { path: "/", label: "Dashboard", icon: "📊" },
            { path: "/events", label: "Events", icon: "📅" },
            { path: "/library", label: "Library", icon: "📚" },
            { path: "/canteen", label: "Canteen", icon: "🍽" },
            { path: "/order-history", label: "Order History", icon: "🧾" },
            { path: "/pad-request", label: "EduBites Care", icon: "🌸" },
            { path: "/admin", label: "Admin Panel", icon: "⚙" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 ${
                  isActive ? "bg-edubites-sky/10 text-edubites-sky" : "hover:bg-gray-50"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-8 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
