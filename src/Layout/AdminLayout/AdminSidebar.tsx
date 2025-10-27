import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import itimg from "../../assets/cube-group.png";
import overviewIcon from "../../assets/Dashbord/fi_7.svg";
import usermanagementicon from "../../assets/Dashbord/fi_5.svg";
import contentmanagementicon from "../../assets/Dashbord/fi_4.svg";
import Subscriptionicon from "../../assets/Dashbord/fi_6.svg";
import Analyticsicon from "../../assets/Dashbord/fi_3.svg";
import Supporticon from "../../assets/Dashbord/fi_2.svg";
import Settingsicon from "../../assets/Dashbord/fi_1.svg";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/admin", label: "Overview", icon: overviewIcon },
    { path: "/admin/users", label: "User Management", icon: usermanagementicon },
    { path: "/admin/content", label: "Content Management", icon: contentmanagementicon },
    { path: "/admin/subscription", label: "Subscription", icon: Subscriptionicon },
    { path: "/admin/analytics", label: "Analytics", icon: Analyticsicon },
    { path: "/admin/support", label: "Support", icon: Supporticon },
    { path: "/admin/settings", label: "Settings", icon: Settingsicon },
  ];

  return (
    <div
      className={`relative flex flex-col bg-[#EBEBEB] dark:bg-[#1F1F1F] border-r border-[#C6C8CB] dark:border-[#444444] text-white dark:text-gray-300 transition-all duration-300 ease-in-out ${
        sidebarOpen ? (isCollapsed ? "w-20" : "w-72") : "w-0 overflow-hidden"
      }`}
    >
      {/* Close Button for mobile */}
      {sidebarOpen && (
        <div className="absolute top-2 right-2 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:cursor-pointer w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
          >
            ✖
          </button>
        </div>
      )}

      {/* Logo */}
      {sidebarOpen && (
        <div className="px-3">
          <div
            className={`flex items-center gap-3 border-b border-b-[#C6C8CB] dark:border-b-[#444444] transition-all duration-300 ${
              isCollapsed ? "justify-center px-2 py-5" : "px-6 py-6"
            }`}
          >
            <img
              className={`transition-all duration-300 ${
                isCollapsed ? "w-10" : "w-11"
              }`}
              src={itimg}
              alt="Logo"
            />
            {!isCollapsed && (
              <h1 className="font-bold text-2xl text-[#111827] dark:text-white">
                B1 Italian
              </h1>
            )}
          </div>
        </div>
      )}

      {/* Menu Items */}
      {sidebarOpen && (
        <nav className="flex-1 overflow-y-auto mt-4 p-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 mb-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#111827] text-white dark:bg-[#333333] dark:text-white"
                    : "text-[#5e5e5e] hover:bg-[#111827] hover:text-white dark:text-gray-300 dark:hover:bg-[#333333]"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
                />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      )}

      {/* Collapse / Expand Toggle (Desktop only) */}
      {sidebarOpen && (
        <div className="hidden lg:block border-t border-[#C6C8CB] dark:border-[#444444] p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex cursor-pointer text-[#7E7E7E] dark:text-gray-300 hover:bg-[#111827] hover:text-white justify-center w-full gap-2 px-3 py-2 rounded-lg bg-white dark:bg-[#333333] transition-all duration-200"
          >
            {isCollapsed ? (
              <MdOutlineKeyboardDoubleArrowRight className="text-3xl" />
            ) : (
              <>
                <MdKeyboardDoubleArrowLeft className="text-3xl" />
                <span className="text-base pt-1">Collapse</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
