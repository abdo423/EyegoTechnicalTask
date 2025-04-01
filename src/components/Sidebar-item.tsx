import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  href: string;
  imgSrc: string;
  text: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ href, imgSrc, text }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative">
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-800 transition-all duration-200 ease-in-out
          ${
            isActive
              ? "bg-gray-300 dark:bg-gray-300" // Active item styling
              : "hover:bg-gray-200 dark:hover:bg-gray-300"
          }`}
      >
        <img
          src={imgSrc}
          alt={`${text} Icon`}
          width={20}
          height={20}
          className="h-5 w-5"
        />
        <span className="text-sm font-medium">{text}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
