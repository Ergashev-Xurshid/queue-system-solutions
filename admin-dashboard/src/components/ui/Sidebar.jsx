import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  X,
  Activity,
  Layers,
  Dock,
  FolderTree,
  MonitorSmartphone
} from "lucide-react";
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navItems = [
    { id: 1, path: "", label: "Dashboard", icon: LayoutDashboard },
    { id: 2, path: "operators", label: "Operators", icon: Users },
    { id: 3, path: "reports", label: "Reports", icon: FileText },
    { id: 4, path: "menu", label: "Menu", icon: Dock  },
    { id: 5, path: "category", label: "Category", icon: Layers },
    { id: 6, path: "sub-category", label: "SubCategory", icon: FolderTree },
    // { id: 7, path: "devices", label: "Devices", icon: MonitorSmartphone },
  ];
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            QueuePro
          </span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
          key={item.id}
          end={item.path === ""}
          to={item.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              }
              w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all `
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
