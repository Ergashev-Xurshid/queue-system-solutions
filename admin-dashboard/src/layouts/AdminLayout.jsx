import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import { useState } from "react";

export default function AdminLayout({ admin }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1">
        <Navbar setSidebarOpen={setSidebarOpen} admin={admin} />
        <main className="lg:ml-64 h-[calc(100vh-5rem)] bg-gray-50">
          <div className="h-full p-4 sm:p-6 lg:p-8 overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
