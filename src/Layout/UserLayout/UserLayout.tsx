import { useState } from "react";
import { UserSidebar } from "./UserSidebar";
import { Outlet } from "react-router-dom";
import { LayoutNavber } from "../LayoutNavber";
import adminimg from "../../assets/adminimg.svg";
import themeicon from "../../assets/Component 10.svg";
export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleclick =()=>{
alert("clicked")

  }
  return (
    <div className="flex h-screen  bg-[#F5F5F5]">
      <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {!sidebarOpen && (
          <div className="p-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-8 h-8 bg-gray-900 text-white cursor-pointer rounded-full cursor-pointer flex items-center justify-center"
            >
              ☰
            </button>
          </div>
        )}
<LayoutNavber
  userImage={adminimg}
  userName="Darlene Robertson"
  userRole="Admin"
  themeIcon={themeicon}
  onThemeClick={handleclick}
/>
        <div className="flex-1 overflow-auto p-4">
          <Outlet/> {/* ✅ This is where nested pages render */}
        </div>
      </div>
    </div>
  );
}









// import { useState } from 'react';
 
 

// import { Analytics } from '@/components/UserDashbord/Analytics';
// import { Flashcards } from '@/components/UserDashbord/Flashcards';
// import { Leaderboard } from '@/components/UserDashbord/Leaderboard';
// import ItalianPractice from '@/components/UserDashbord/ItalianPractice/ItalianPractice';
// import { StudyPlanner } from '@/components/UserDashbord/StudyPlanner';
// import { Overview } from '@/components/UserDashbord/Overviwe/Overview';

// import userimg from '../assets/adminimg.svg';
// import themeicon from '../assets/Component 10.svg';
// import itimg from '../assets/cube-group.png';
// import overviewIcon from "../assets/Dashbord//fi_18.svg";
// import Practiceicon from "../assets/Dashbord//fi_17.svg";
// import TrendingUpicon from "../assets/Dashbord//fi_16.svg";
// import Brainicon from "../assets/Dashbord//fi_15.svg";
// import Usersicon from "../assets/Dashbord//fi_14.svg";
// import Calendaricon from "../assets/Dashbord//fi_13.svg";
// import Settingsicon from "../assets/Dashbord//fi_1.svg";
// import { Settings } from '@/components/UserDashbord/Settings';
// import { LayoutNavber } from './LayoutNavber';
// export default function UserLayout() {
//   const [activeSection, setActiveSection] = useState<
//     'overview' | 'practice' | 'analytics' | 'flashcards' | 'leaderboard' | 'planner' | 'settings'
//   >('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const menuItems = [
//     { id: 'overview', label: 'Pro Overview', icon: overviewIcon },
//     { id: 'practice', label: 'Practice', icon: Practiceicon },
//     { id: 'analytics', label: 'Advanced Analytics', icon: TrendingUpicon },
//     { id: 'flashcards', label: 'Advanced Flashcards', icon: Brainicon },
//     { id: 'leaderboard', label: 'Pro Leaderboard', icon: Usersicon },
//     { id: 'planner', label: 'AI Study Planner', icon: Calendaricon },
//     { id: 'settings', label: 'Settings', icon: Settingsicon },
//   ];

//   const renderContent = () => {
//     switch (activeSection) {
//       case 'overview':
//         return <Overview />; // no props needed
//       case 'practice':
//         return <ItalianPractice />;
//       case 'analytics':
//         return <Analytics />;
//       case 'flashcards':
//         return <Flashcards />;
//       case 'leaderboard':
//         return <Leaderboard />;
//       case 'planner':
//         return <StudyPlanner />;
//       case 'settings':
//         return <Settings />;
//       default:
//         return <Overview />;
//     }
//   };
//  const handleThemeClick = () => {
//     console.log("Theme button clicked!");
//   };
//   return (
// <div className="flex h-screen   bg-[#F5F5F5]">      {/* Sidebar */}
//       {sidebarOpen && (
//                 <div className=" rounded-r-2xl border border-r-[#C6C8CB]  bg-[#EBEBEB]  text-white flex flex-col transition-all duration-400">
//                     <div className="flex justify-end p-2">
//             <button
//               onClick={() => setSidebarOpen(false)}
//                         className=" hover:cursor-pointer  top-4 left-4 z-50 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//             >
//               ✖
//             </button>
//           </div>

//           {/* Logo */}
//           <div className='p-3'>   <div className=" px-11 pt-7 pb-8  border-b-[#C6C8CB] border-b flex items-center gap-2">
//                         <div className=" rounded-lg flex items-center justify-center">
//                             <img className='w-11' src={itimg} alt="" />
//                         </div>
//                         <h1 className="font-bold text-3xl  " style={{ color: "var(--dark-gray)" }}>B1 Italian</h1>

//                     </div></div>

//           {/* Menu */}
//                     <nav className="flex-1 mt-4 p-4">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id as any)}
//                 className={`w-full mb-3  text-left px-4 py-3 rounded-lg   flex items-center gap-2 transition ${activeSection === item.id
//                                         ? 'bg-[#111827]  text-[#fff]'
//                                         : 'text-[#7E7E7E] hover:bg-[#111827] hover:text-white'
//                                     }`}
//               >
//                <img src={item.icon} alt={item.label} className="w-6 h-6" />
//                                 <span className="p1">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden relative">
//         {!sidebarOpen && (
//           <div className="p-2">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//             >
//               ☰
//             </button>
//           </div>
//         )}

//         {/* Top Bar */}
        
//            <LayoutNavber
//         userImage={userimg}
//         userName="Marco Rossi"
//         userRole="Learner"
//         themeIcon={themeicon}
//         onThemeClick={handleThemeClick}
//       />

//         {/* Section */}
//                 <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
//       </div>
//     </div>
//   );
// }







 