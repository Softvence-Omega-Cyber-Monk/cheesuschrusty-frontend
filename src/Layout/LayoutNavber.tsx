
"use client"

import React from "react"
 import { ModeToggle } from "../components/ThemeToggle/mode-toggle"

interface UserHeaderProps {
  userImage: string
  userName: string
  userRole: string
  themeIcon: string
  onThemeClick?: () => void
}

export const LayoutNavber: React.FC<UserHeaderProps> = ({
  userImage,
  userName,
  userRole,
   
}) => {
  return (
    <div className="px-10 z-999 bg-white border-b  dark:border-b-[#536580] border-b-[#b9b6b6]  py-5 flex items-center justify-between   dark:bg-gray-900">
      {/* Left Side: User Info */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm text-gray-900 dark:text-white">{userName}</div>
          <div className="text-base text-gray-500 dark:text-gray-300">{userRole}</div>
        </div>
      </div>

      {/* Right Side: Theme toggle, notifications, profile */}
      <div className="flex items-center gap-4 ">
        {/* Theme toggle */}
        <ModeToggle />

      

        {/* Profile */}
        {/* <button className="p-1 rounded-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          {userImage ? (
            <img src={userImage} alt="User" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <UserCircle className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </button> */}
      </div>
    </div>
  )
}











// import React from "react";
// // import { Navigate, useNavigate } from "react-router-dom";

// interface UserHeaderProps {
//   userImage: string;
//   userName: string;
//   userRole: string;
//   themeIcon: string;
//   onThemeClick?: () => void; // optional handler
// }

// export const LayoutNavber: React.FC<UserHeaderProps> = ({
//   userImage,
//   userName,
//   userRole,
//   themeIcon,
//   onThemeClick,
// }) => {

// // const navigate =useNavigate()

//   return (
//     <div className="px-10 border-b border-[#C6C8CB] py-5 flex items-center justify-between">
//       {/* Left Side: User Info */}
//       <div className="flex items-center gap-3">
//         <img
//           src={userImage}
//           alt="User"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <div className="font-semibold text-sm">{userName}</div>
//           <div className="text-base text-gray-500">{userRole}</div>
//         </div>
//       </div>

//       {/* Right Side: Theme Icon */}
//       <button
//         className="w-10 h-10 flex cursor-pointer items-center justify-center hover:bg-gray-100 rounded-full transition"
//         onClick={onThemeClick}
//       >
//         <img src={themeIcon} alt="Theme" className="w-10 h-10" />
//       </button>
       

 

//     </div>
//   );
// };

 