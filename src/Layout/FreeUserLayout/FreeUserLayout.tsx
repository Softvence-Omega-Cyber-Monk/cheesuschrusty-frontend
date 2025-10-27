import { useState } from "react";
import { FreeUserSidebar } from "./FreeUserSidebar";
import { Outlet } from "react-router-dom";
import { LayoutNavber } from "../LayoutNavber";
import adminimg from "../../assets/adminimg.svg";
import themeicon from "../../assets/Component 10.svg";
export default function FreeUserLayout() {
    const [ sidebarOpen, setSidebarOpen ] = useState(true);
    const handleclick = () => {
        alert("clicked")

    }
    return (
        <div className="flex h-screen  bg-[#F5F5F5] dark:bg-gray-900">
            <FreeUserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                {!sidebarOpen && (
                    <div className="p-2">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="w-8 h-8 bg-gray-900 text-white cursor-pointer rounded-full flex items-center justify-center"
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
                <div className="flex-1 overflow-auto p-4 dark:text-gray-200">
                    <Outlet /> {/* ✅ This is where nested pages render */}
                </div>
            </div>
        </div>
    );
}


