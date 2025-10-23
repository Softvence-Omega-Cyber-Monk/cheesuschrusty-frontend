

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import itimg from "../../assets/cube-group.png";
import overviewIcon from "../../assets/Dashbord/fi_18.svg";
import Practiceicon from "../../assets/Dashbord/fi_17.svg";
import TrendingUpicon from "../../assets/Dashbord/fi_16.svg";
import Brainicon from "../../assets/Dashbord/fi_15.svg";
import Usersicon from "../../assets/Dashbord/fi_14.svg";
import Calendaricon from "../../assets/Dashbord/fi_13.svg";
import Settingsicon from "../../assets/Dashbord/fi_1.svg";
import { MdKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const UserSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: "/user", label: "Pro Overview", icon: overviewIcon },
    { path: "/user/practice", label: "Practice", icon: Practiceicon },
    { path: "/user/analytics", label: "Advanced Analytics", icon: TrendingUpicon },
    { path: "/user/flashcards", label: "Advanced Flashcards", icon: Brainicon },
    { path: "/user/leaderboard", label: "Pro Leaderboard", icon: Usersicon },
    { path: "/user/planner", label: "AI Study Planner", icon: Calendaricon },
    { path: "/user/settings", label: "Settings", icon: Settingsicon },
   ];

  return (
    <div
      className={`relative flex flex-col bg-[#EBEBEB]   border-r border-[#C6C8CB] transition-all duration-300 ease-in-out ${
        sidebarOpen ? (isCollapsed ? "w-20" : "w-70") : "w-0 overflow-hidden"
      }`}
    >
      {/* Mobile Close Button */}
      {sidebarOpen && (
        <div className="absolute top-2 right-2 lg:hidden">
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 bg-gray-900 cursor-pointer text-white rounded-full flex items-center justify-center hover:cursor-pointer"
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
            src={itimg}
            alt="Logo"
            className={`transition-all duration-300 ${isCollapsed ? "w-10" : "w-11"}`}
          />
          {!isCollapsed && (
            <h1 className="font-bold text-2xl text-[#111827]">B1 Italian</h1>
          )}
        </div>
      </div>
      )}

      {/* Menu Items */}
      {sidebarOpen && (
        <nav className="flex-1 overflow-y-auto mt-4 px-3">
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
            className="flex items-center cursor-pointer justify-center w-full gap-2 px-3 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200"
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















// import { Link, useLocation } from "react-router-dom";
// import itimg from "../../assets/cube-group.png";
// import overviewIcon from "../../assets/Dashbord/fi_18.svg";
// import Practiceicon from "../../assets/Dashbord/fi_17.svg";
// import TrendingUpicon from "../../assets/Dashbord/fi_16.svg";
// import Brainicon from "../../assets/Dashbord/fi_15.svg";
// import Usersicon from "../../assets/Dashbord/fi_14.svg";
// import Calendaricon from "../../assets/Dashbord/fi_13.svg";
// import Settingsicon from "../../assets/Dashbord/fi_1.svg";

// interface SidebarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (open: boolean) => void;
// }

// export const UserSidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
//   const location = useLocation();

//   const menuItems = [
//     { path: "/user", label: "Pro Overview", icon: overviewIcon },
//     { path: "/user/practice", label: "Practice", icon: Practiceicon },
//      { path: "/user/analytics", label: "Advanced Analytics", icon: TrendingUpicon },
//     { path: "/user/flashcards", label: "Advanced Flashcards", icon: Brainicon },
//     { path: "/user/leaderboard", label: "Pro Leaderboard", icon: Usersicon },
//     { path: "/user/planner", label: "AI Study Planner", icon: Calendaricon },
//     { path: "/user/settings", label: "Settings", icon: Settingsicon },
//   ];

//   return (
//     <div
//       className={`rounded-r-2xl border border-r-[#C6C8CB] bg-[#EBEBEB] flex flex-col transition-all duration-300 ${
//         sidebarOpen ? "w-70" : "w-0 overflow-hidden"
//       }`}
//     >
//       {/* Close Button */}
//       {sidebarOpen && (
//         <div className="flex justify-end p-2">
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:cursor-pointer"
//           >
//             ✖
//           </button>
//         </div>
//       )}

//       {/* Logo */}
//       {sidebarOpen && (
//         <div className="px-6 pt-4 pb-6 border-b border-b-[#C6C8CB] flex items-center gap-2">
//           <img src={itimg} alt="Logo" className="w-11" />
//           <h1 className="font-bold text-3xl text-[#111827]">B1 Italian</h1>
//         </div>
//       )}

//       {/* Menu */}
//       <nav className="flex-1 mt-4 px-4">
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`w-full mb-3 text-left px-4 py-3 rounded-lg flex items-center gap-2 transition ${
//                 isActive
//                   ? "bg-[#111827] text-white"
//                   : "text-[#7E7E7E] hover:bg-[#111827] hover:text-white"
//               }`}
//             >
//               <img src={item.icon} alt={item.label} className="w-6 h-6" />
//               <span>{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };
