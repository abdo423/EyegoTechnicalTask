"use client";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../Store/Reducers/sideBarSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <header className="sticky top-0 z-10 flex h-16 px-4 shrink-0 items-center gap-2 border-b border-gray-200 bg-[#ffffff00] ">
      <button
        onClick={() => dispatch(toggleSidebar())}
        aria-label="Toggle Sidebar"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium 
  transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
  disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-800 
  hover:text-gray-900 dark:hover:text-gray-100 h-7 w-7 -ml-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-panel-left"
        >
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 3v18"></path>
        </svg>
        <span className="sr-only">Toggle Sidebar</span>
      </button>
      <div
        data-orientation="vertical"
        role="none"
        className="shrink-0 bg-[#e4e4e7] w-[1px] mr-2 h-4"
      ></div>
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
          <li className="inline-flex items-center gap-1.5">
            <span
              aria-current="page"
              aria-disabled="true"
              className="font-normal text-foreground"
              role="link"
            >
              Dashboard
            </span>
          </li>
        </ol>
      </nav>
    </header>
  );
};
export default Navbar;
