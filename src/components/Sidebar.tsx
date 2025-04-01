"use client";
import { useState, useEffect } from "react";
import SidebarItem from "./Sidebar-item";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/Store/store";
import { useRouter } from "next/navigation"; // Updated import for Next.js app router
import { logout } from "@/Store/Reducers/authSlice"; // Import logout action

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for medium screens
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // If mobile and sidebar would be open, don't show it
  const shouldHide = isMobile;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <aside
      className={`flex flex-col min-h-0 flex-shrink-0 border-r border-gray-200 bg-gray-50 transition-all duration-300 ease-in-out 
      ${isOpen && !shouldHide ? "w-80" : "w-0"} 
    `}
    >
      <div className="flex items-center justify-between p-2 h-16 border-b border-gray-200">
        <div className="flex items-center gap-2 px-4">
          <img
            src="/box.svg"
            alt="Box"
            className={`transition-all ${isOpen ? "w-6 h-6" : "w-0 h-0 hidden"}`}
          />
          <span className={`font-semibold transition-all ${isOpen ? "block" : "hidden"}`}>
            Acme Inc
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
        <ul className="flex w-full min-w-0 flex-col gap-2 mt-2">
          <SidebarItem href="/" imgSrc="/house.svg" text="Dashboard" />
       
       
            <SidebarItem href="/analytics" imgSrc="/analitics.svg" text="analytics" />
        
        </ul>
      </div>

      {/* Conditionally show user info or login button */}
      {isAuthenticated ? (
        <div className={`flex items-center gap-2 p-4 border-t border-gray-200 ${isOpen ? "block" : "hidden"}`}>
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
            <img className="aspect-square h-full w-full" alt="User" src={user?.avatar || "/placeholder.svg"} />
          </span>
          <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300 ease-in-out">
            <span className="truncate text-sm font-medium">{user?.name || "User"}</span>
            <span className="truncate text-xs text-muted-foreground">{user?.email || "user@example.com"}</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-red-500">
            Logout
          </button>
        </div>
      ) : (
        <div className={`flex items-center justify-center p-4 border-t border-gray-200 ${isOpen ? "block" : "hidden"}`}>
          <button onClick={() => router.push("/auth/login")} className="px-4 py-2 bg-blue-600 text-white rounded">
            Login
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
