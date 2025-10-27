import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import adminimg from "../../assets/adminimg.svg";
import themeicon from "../../assets/Component 10.svg";
import { LayoutNavber } from "../LayoutNavber";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 const handleclick =()=>{
alert("clicked")

  }
  return (
    <div className="flex h-screen bg-[#F5F5F5]">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Toggle button when sidebar is hidden */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute cursor-pointer top-4 left-4 z-50 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
          >
            ☰
          </button>
        )}

        {/* Top bar */}
        {/* <div className="px-10 border-b border-b-[#C6C8CB] py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={adminimg}
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold text-sm">Darlene Robertson</div>
              <div className="text-base text-gray-500">Admin</div>
            </div>
          </div>
          <button className="w-10 h-10 hover:cursor-pointer flex items-center justify-center">
            <img src={themeicon} alt="Theme" />
          </button>
        </div> */}
<LayoutNavber
  userImage={adminimg}
  userName="Darlene Robertson"
  userRole="Admin"
  themeIcon={themeicon}
  onThemeClick={handleclick}
/>
        {/* Main content area */}
       <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
  <Outlet />
</div>

      </div>
    </div>
  );
};

export default AdminLayout;















// import { useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import Overview from "@/components/AdminDashbord/Overview/AdminOverview";
// import UserManagement from "@/components/AdminDashbord/Admin/AdminUserManagement";
// import ContentManagement from "@/components/AdminDashbord/Admin/AdminContentManagement";
// import Subscription from "@/components/AdminDashbord/Admin/AdminSubscription";
// import Analytics from "@/components/AdminDashbord/Admin/AdminAnalytics";
// import Support from "@/components/AdminDashbord/Admin/AdminSupport";
// import { Settings } from "lucide-react";
// import adminimg from "../../assets/adminimg.svg";
// import themeicon from "../../assets/Component 10.svg";

// const AdminLayout = () => {
//   const [currentRoute, setCurrentRoute] = useState("overview");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const renderContent = () => {
//     switch (currentRoute) {
//       case "overview":
//         return <Overview />;
//       case "users":
//         return <UserManagement />;
//       case "content":
//         return <ContentManagement />;
//       case "subscription":
//         return <Subscription />;
//       case "analytics":
//         return <Analytics />;
//       case "support":
//         return <Support />;
//       case "settings":
//         return <Settings />;
//       default:
//         return <Overview />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#F5F5F5]">
//       {/* Sidebar */}
//       <AdminSidebar
//         sidebarOpen={sidebarOpen}
//         currentRoute={currentRoute}
//         setSidebarOpen={setSidebarOpen}
//         setCurrentRoute={setCurrentRoute}
//       />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden relative">
//         {/* Toggle button when sidebar is hidden */}
//         {!sidebarOpen && (
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="absolute top-4 left-4 z-50 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//           >
//             ☰
//           </button>
//         )}

//         {/* Top bar */}
//         <div className="px-10 border-b border-b-[#C6C8CB] py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img
//               src={adminimg}
//               alt="Admin"
//               className="w-10 h-10 rounded-full"
//             />
//             <div>
//               <div className="font-semibold text-sm">Darlene Robertson</div>
//               <div className="text-base text-gray-500">Admin</div>
//             </div>
//           </div>
//           <button className="w-10 h-10 hover:cursor-pointer flex items-center justify-center">
//             <img src={themeicon} alt="Theme" />
//           </button>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;












// import { useState } from 'react';
// import { Settings } from 'lucide-react';
// import Overview from '@/components/AdminDashbord/Overview/Overview';
// import UserManagement from '@/components/AdminDashbord/Admin/UserManagement';
// import ContentManagement from '@/components/AdminDashbord/Admin/ContentManagement';
// import Subscription from '@/components/AdminDashbord/Admin/Subscription';
// import Analytics from '@/components/AdminDashbord/Admin/Analytics';
// import Support from '@/components/AdminDashbord/Admin/Support';
// import itimg from "../assets/cube-group.png"; // relative path
// import overviewIcon from "../assets/Dashbord//fi_7.svg";
// import usermanagementicon from "../assets/Dashbord//fi_5.svg";
// import contentmanagementicon from "../assets/Dashbord//fi_4.svg";
// import Subscriptionicon from "../assets/Dashbord//fi_6.svg";
// import Analyticsicon from "../assets/Dashbord//fi_3.svg";
// import Supporticon from "../assets/Dashbord//fi_2.svg";
// import Settingsicon from "../assets/Dashbord//fi_1.svg";
// import themeicon from "../assets/Component 10.svg";
// import adminimg from "../assets/adminimg.svg";
 
// const AdminLayout = () => {
//     const [currentRoute, setCurrentRoute] = useState('overview');
//     const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ sidebar state

//     const menuItems = [
//         { id: 'overview', label: 'Overview', icon: overviewIcon },
//         { id: 'users', label: 'User Management', icon: usermanagementicon },
//         { id: 'content', label: 'Content Management', icon: contentmanagementicon },
//         { id: 'subscription', label: 'Subscription', icon: Subscriptionicon },
//         { id: 'analytics', label: 'Analytics', icon: Analyticsicon },
//         { id: 'support', label: 'Support', icon: Supporticon },
//         { id: 'settings', label: 'Settings', icon: Settingsicon },
//     ];

//     const renderContent = () => {
//         switch (currentRoute) {
//             case 'overview': return <Overview />;
//             case 'users': return <UserManagement />;
//             case 'content': return <ContentManagement />;
//             case 'subscription': return <Subscription />;
//             case 'analytics': return <Analytics />;
//             case 'support': return <Support />;
//             case 'settings': return <Settings />;
//             default: return <Overview />;
//         }
//     };

//     return (
//         <div className="flex h-screen   bg-[#F5F5F5]">
//             {/* Sidebar */}
//             {sidebarOpen && (
//                 <div className=" rounded-r-2xl border border-r-[#C6C8CB]  bg-[#EBEBEB]  text-white flex flex-col transition-all duration-400">
//                     {/* Close button */}
//                     <div className="flex justify-end p-2">
                         
//   <button
//                         onClick={() => setSidebarOpen(false)}
//                         className=" hover:cursor-pointer  top-4 left-4 z-50 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//                     >
//                        ✖
//                     </button>

//                     </div>

//                     {/* Logo */}
//                  <div className='p-3'>   <div className=" px-11 pt-7 pb-8  border-b-[#C6C8CB] border-b flex items-center gap-2">
//                         <div className=" rounded-lg flex items-center justify-center">
//                             <img className='w-11' src={itimg} alt="" />
//                         </div>
//                         <h1 className="font-bold text-3xl  " style={{ color: "var(--dark-gray)" }}>B1 Italian</h1>

//                     </div></div>

//                     {/* Menu */}
//                     <nav className="flex-1 mt-4 p-4">
//                         {menuItems.map((item) => (
//                             <button
//                                 key={item.id}
//                                 onClick={() => setCurrentRoute(item.id)}
//                                 className={`w-full mb-3  text-left px-4 py-3 rounded-lg   flex items-center gap-2 transition ${currentRoute === item.id
//                                         ? 'bg-[#111827]  text-[#fff]'
//                                         : 'text-[#7E7E7E] hover:bg-[#111827] hover:text-white'
//                                     }`}
//                             >
//                                 <img src={item.icon} alt={item.label} className="w-6 h-6" />
//                                 <span className="p1">{item.label}</span>
//                             </button>
//                         ))}
//                     </nav>
//                 </div>
//             )}

//             {/* Main Content */}
//             <div className="flex-1 flex  flex-col overflow-hidden relative">
               
//                  <div className=' '>
//                  {/* Toggle button when sidebar is hidden */}
//                 {!sidebarOpen && (
//                     <button
//                         onClick={() => setSidebarOpen(true)}
//                         className="  top-4 left-4 z-50 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center"
//                     >
//                         ☰
//                     </button>
//                 )}
//                </div>

//                 {/* Top bar */}
//                <div className=' px-10 '>
//                  <div className="  border-b border-b-[#C6C8CB]   py-4 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <img
//                             src={adminimg}
//                             alt="Admin"
//                             className="w-10 h-10 rounded-full"
//                         />
//                         <div>
//                             <div className="font-semibold text-sm">Darlene Robertson</div>
//                             <div className="text-base text-gray-500">Admin</div>
//                         </div>
//                     </div>
//                     <button className="w-10 h-10 hover:cursor-pointer flex items-center justify-center">
//                         <img src={themeicon} alt="" />
//                     </button>
//                 </div>
//                </div>
               

//                 {/* Main content area */}
//                 <div className="flex-1 overflow-auto p-4">{renderContent()}</div>
//             </div>
//         </div>
//     );
// };

// export default AdminLayout;
