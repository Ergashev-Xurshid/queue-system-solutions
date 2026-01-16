import { Bell, Menu, RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function Navbar({ setSidebarOpen, admin }) {
  //qayta yuklash start
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    // Ikonkani aylantirish
    setSpinning(true);

    // 500ms keyin spinningni to'xtatish (animatsiya davomiyligi)
    setTimeout(() => setSpinning(false), 500);

    // Sahifani yangilash
    window.location.reload(); // Bu F5 kabi sahifani to'liq yangilaydi
  };
  //qayta yuklash end

  return (
    <header className="w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-2 px-2 py-2 rounded-full text-sm font-medium hover:bg-slate-100  transition-colors cursor-pointer ${
              spinning ? "animate-spin-reverse" : ""
            }`}
            onClick={handleRefresh}
          >
            <RefreshCcw size={16} />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-700">
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {/* {admin.fullName} */}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {/* {admin.email} */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
