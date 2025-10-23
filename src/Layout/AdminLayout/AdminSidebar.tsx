
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
      className={`relative flex flex-col   bg-[#EBEBEB] border-r border-[#C6C8CB] text-white transition-all duration-300 ease-in-out ${
        sidebarOpen ? (isCollapsed ? "w-20" : "w-70") : "w-0 overflow-hidden"
      }`}
    >
      {/* Close Button for mobile */}
      {sidebarOpen && (
        <div className="absolute top-2 right-2 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:cursor-pointer cursor-pointer w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
          >
            ✖
          </button>
        </div>
      )}

      {/* Logo */}
      {sidebarOpen && (
      <div className="px-3">
          <div
          className={`flex items-center gap-3 border-b border-b-[#C6C8CB] transition-all duration-300 ${
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
            <h1 className="font-bold text-2xl text-[#111827]">B1 Italian</h1>
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
                    ? "bg-[#111827] text-white"
                    : "text-[#7E7E7E] hover:bg-[#111827] hover:text-white"
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
        <div className="hidden lg:block border-t border-[#C6C8CB] p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex cursor-pointer  text-[#7E7E7E] hover:bg-[#111827] hover:text-white justify-center w-full gap-2 px-3 py-2 rounded-lg bg-white   transition-all duration-200"
          >
            {isCollapsed ? (
              <>
                
              <MdOutlineKeyboardDoubleArrowRight className="text-3xl"/>
              </>
            ) : (
              <>
          
                  


             <div className="flex items-start gap-4">
                 <MdKeyboardDoubleArrowLeft  className="text-3xl"/>

                <span className="text-base pt-1">Collapse</span>
             </div>
         
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
















// import { Link, useLocation } from "react-router-dom";
// import React from "react";
// import itimg from "../../assets/cube-group.png";
// import overviewIcon from "../../assets/Dashbord/fi_7.svg";
// import usermanagementicon from "../../assets/Dashbord/fi_5.svg";
// import contentmanagementicon from "../../assets/Dashbord/fi_4.svg";
// import Subscriptionicon from "../../assets/Dashbord/fi_6.svg";
// import Analyticsicon from "../../assets/Dashbord/fi_3.svg";
// import Supporticon from "../../assets/Dashbord/fi_2.svg";
// import Settingsicon from "../../assets/Dashbord/fi_1.svg";

// interface AdminSidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   sidebarOpen,
//   setSidebarOpen,
// }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/admin", label: "Overview", icon: overviewIcon },
//     { path: "/admin/users", label: "User Management", icon: usermanagementicon },
//     { path: "/admin/content", label: "Content Management", icon: contentmanagementicon },
//     { path: "/admin/subscription", label: "Subscription", icon: Subscriptionicon },
//     { path: "/admin/analytics", label: "Analytics", icon: Analyticsicon },
//     { path: "/admin/support", label: "Support", icon: Supporticon },
//     { path: "/admin/settings", label: "Settings", icon: Settingsicon },
//   ];

//   return (
//     <div
//       className={`rounded-r-2xl border border-r-[#C6C8CB] bg-[#EBEBEB] text-white flex flex-col transition-all duration-400 ${
//         sidebarOpen ? "w-70" : "w-0 overflow-hidden"
//       }`}
//     >
//       {sidebarOpen && (
//         <>
//           {/* Close Button */}
//           <div className="flex justify-end p-2">
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="hover:cursor-pointer w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="px-11 pt-7 pb-8 border-b border-b-[#C6C8CB] flex items-center gap-2">
//             <img className="w-11" src={itimg} alt="Logo" />
//             <h1 className="font-bold text-3xl text-[#111827]">B1 Italian</h1>
//           </div>

//           {/* Menu */}
//           <nav className="flex-1 mt-4 p-4">
//             {menuItems.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   className={`w-full mb-3 text-left px-4 py-3 rounded-lg flex items-center gap-2 transition ${
//                     isActive
//                       ? "bg-[#111827] text-white"
//                       : "text-[#7E7E7E] hover:bg-[#111827] hover:text-white"
//                   }`}
//                 >
//                   <img src={item.icon} alt={item.label} className="w-6 h-6" />
//                   <span className="p1">{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminSidebar;














// import React from "react";
// import itimg from "../../assets/cube-group.png";
// import overviewIcon from "../../assets/Dashbord/fi_7.svg";
// import usermanagementicon from "../../assets/Dashbord/fi_5.svg";
// import contentmanagementicon from "../../assets/Dashbord/fi_4.svg";
// import Subscriptionicon from "../../assets/Dashbord/fi_6.svg";
// import Analyticsicon from "../../assets/Dashbord/fi_3.svg";
// import Supporticon from "../../assets/Dashbord/fi_2.svg";
// import Settingsicon from "../../assets/Dashbord/fi_1.svg";

// interface AdminSidebarProps {
//   sidebarOpen: boolean;
//   currentRoute: string;
//   setSidebarOpen: (open: boolean) => void;
//   setCurrentRoute: (route: string) => void;
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({
//   sidebarOpen,
//   currentRoute,
//   setSidebarOpen,
//   setCurrentRoute,
// }) => {
//   const menuItems = [
//     { id: "overview", label: "Overview", icon: overviewIcon },
//     { id: "users", label: "User Management", icon: usermanagementicon },
//     { id: "content", label: "Content Management", icon: contentmanagementicon },
//     { id: "subscription", label: "Subscription", icon: Subscriptionicon },
//     { id: "analytics", label: "Analytics", icon: Analyticsicon },
//     { id: "support", label: "Support", icon: Supporticon },
//     { id: "settings", label: "Settings", icon: Settingsicon },
//   ];

//   return (
//     <div
//       className={`rounded-r-2xl border border-r-[#C6C8CB] bg-[#EBEBEB] text-white flex flex-col transition-all duration-400 ${
//         sidebarOpen ? "w-64" : "w-0 overflow-hidden"
//       }`}
//     >
//       {sidebarOpen && (
//         <>
//           {/* Close Button */}
//           <div className="flex justify-end p-2">
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="hover:cursor-pointer w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Logo */}
//           <div className="px-11 pt-7 pb-8 border-b border-b-[#C6C8CB] flex items-center gap-2">
//             <img className="w-11" src={itimg} alt="Logo" />
//             <h1 className="font-bold text-3xl text-[#111827]">B1 Italian</h1>
//           </div>

//           {/* Menu */}
//           <nav className="flex-1 mt-4 p-4">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setCurrentRoute(item.id)}
//                 className={`w-full mb-3 text-left px-4 py-3 rounded-lg flex items-center gap-2 transition ${
//                   currentRoute === item.id
//                     ? "bg-[#111827] text-white"
//                     : "text-[#7E7E7E] hover:bg-[#111827] hover:text-white"
//                 }`}
//               >
//                 <img src={item.icon} alt={item.label} className="w-6 h-6" />
//                 <span className="p1">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminSidebar;
