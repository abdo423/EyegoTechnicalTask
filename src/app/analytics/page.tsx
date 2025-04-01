import ChartComponent from "@/components/Chart";
import DashboardTable from "@/components/dashboard-table";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/page-header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 h-screen  w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4">
          <PageHeader text="Analytics" />
          <ChartComponent />
        </div>
      </div>
    </div>
  );
}
