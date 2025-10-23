import React from "react";
// import { Navigate, useNavigate } from "react-router-dom";

interface UserHeaderProps {
  userImage: string;
  userName: string;
  userRole: string;
  themeIcon: string;
  onThemeClick?: () => void; // optional handler
}

export const LayoutNavber: React.FC<UserHeaderProps> = ({
  userImage,
  userName,
  userRole,
  themeIcon,
  onThemeClick,
}) => {

// const navigate =useNavigate()

  return (
    <div className="px-10 border-b border-[#C6C8CB] py-5 flex items-center justify-between">
      {/* Left Side: User Info */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-sm">{userName}</div>
          <div className="text-base text-gray-500">{userRole}</div>
        </div>
      </div>

      {/* Right Side: Theme Icon */}
      <button
        className="w-10 h-10 flex cursor-pointer items-center justify-center hover:bg-gray-100 rounded-full transition"
        onClick={onThemeClick}
      >
        <img src={themeIcon} alt="Theme" className="w-10 h-10" />
      </button>
       

 

    </div>
  );
};

 