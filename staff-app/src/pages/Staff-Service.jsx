import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  UserRound,
  RefreshCcw,
  Wifi,
  WifiOff,
  Mail,
  Phone,
  RotateCcw,
} from "lucide-react";
import Footer from "./FooterComp";

function StaffServicePage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const CURRENT_QUEUE_KEY = "current_operator_queue";

  useEffect(() => {
    // Internetni tekshiruvchi funksiya
    const checkInternet = async () => {
      if (!navigator.onLine) {
        setIsOnline(false);
        return;
      }

      try {
        const res = await fetch("https://navbat.kstu.uz/api/health", {
          method: "GET",
          cache: "no-store",
        });
        setIsOnline(res.ok);
      } catch (err) {
        setIsOnline(false);
      }
    };

    // Hodisalarni handle qiluvchi funksiyalar
    const handleOnline = checkInternet;
    const handleOffline = () => setIsOnline(false);

    // Sahifa ochilganda birinchi tekshiruv
    checkInternet();

    // Event listenerlar
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Har 60 soniyada tekshiruv
    const interval = setInterval(checkInternet, 60000);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);
  //onile end

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

  const token = localStorage.getItem("token");

  //user info
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function getUser() {
    try {
      const res = await fetch("https://navbat.kstu.uz/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Status: " + res.status);

      const data = await res.json();
      setUser(data.body);
      localStorage.setItem("user", JSON.stringify(data.body));
    } catch (error) {
      console.error("Xatolik:", error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  //user info end

  const [navbatlar, setNavbatlar] = useState(null);

  // 🔹 Navbatni  chaqirish
  // 10 s da bir
  const [isCalling, setIsCalling] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const startCooldown = (buttonType) => {
    setCooldown(true);
    setActiveButton(buttonType); // "call" yoki "retry"
    setSeconds(10);

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCooldown(false);
          setActiveButton(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCallNext = async () => {
    if (!isOnline || cooldown) return;
    await callNextQueue();
    startCooldown("call"); // 👈
  };

  const handleRetry = async () => {
    if (!isOnline || cooldown || !navbatlar) return;
    await callRetryQueue();
    startCooldown("retry"); // 👈
  };

  async function callNextQueue() {
    try {
      const res = await fetch("https://navbat.kstu.uz/api/operator/call-next", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Status: " + res.status);

      const data = await res.json();

      if (data.body) {
        // Yangi navbat bo‘lsa
        setNavbatlar(data.body);
        localStorage.setItem(CURRENT_QUEUE_KEY, JSON.stringify(data.body));
      } else {
        // Navbat bo‘lmasa
        setNavbatlar(null);
        localStorage.removeItem(CURRENT_QUEUE_KEY);
        toast("Yangi navbat yo‘q");
      }
    } catch (error) {
      setNavbatlar(null);
      localStorage.removeItem(CURRENT_QUEUE_KEY);
      toast("Navbat yo‘q");
      console.error("Xatolik", error);
    }
  }

  useEffect(() => {
    const savedQueue = localStorage.getItem(CURRENT_QUEUE_KEY);
    if (savedQueue) {
      setNavbatlar(JSON.parse(savedQueue));
    }
  }, []);

  // 🔹 Navbatni qayta chaqirish
  async function callRetryQueue() {
    try {
      const res = await fetch(`https://navbat.kstu.uz/api/queues/recall`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Status: " + res.status);

      const data = await res.json();
      toast("Navbat qayta chaqirildi");
    } catch (error) {
      toast("Navbat yoq");
      console.error("Xatolik", error);
    }
  }

  //log out
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // logout dapdown
  const [logout, setLogout] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(CURRENT_QUEUE_KEY);
    navigate("/");
  };

  //queues-waiting
  const [waiting, setWaiting] = useState([]);
  const getQueuesWaiting = async () => {
    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/queues/waitings/${user.categoryId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Status: " + res.status);

      const data = await res.json();
      setWaiting(data.body);
    } catch (error) {
      console.error("Waiting queue xatolik:", error);
    }
  };

  useEffect(() => {
    getQueuesWaiting();
  }, [navbatlar]);

  const [served, setServed] = useState([]);
  const getQueuesServed = async () => {
    try {
      const res = await fetch(`https://navbat.kstu.uz/api/queues/navbatlar`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Status: " + res.status);

      const data = await res.json();
      setServed(data.body);
    } catch (error) {
      console.error("Served queue xatolik:", error);
    }
  };

  useEffect(() => {
    getQueuesServed();
  }, [navbatlar]);

  async function finishQueue(queueId) {
    try {
      const res = await fetch(
        `https://navbat.kstu.uz/api/operator/finish?queueId=${queueId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Status: " + res.status);

      toast("Navbat tugatildi");

      // Joriy navbatni tozalash
      setNavbatlar(null);
      localStorage.removeItem(CURRENT_QUEUE_KEY);
    } catch (error) {
      toast("Navbatni tugatishda xatolik");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="relative w-50" ref={dropdownRef}>
              <div
                onClick={() => setLogout(!logout)}
                className="flex items-center gap-4"
              >
                <div className="uppercase w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {user?.fullName?.[0] || "O"}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 uppercase">
                    {user?.fullName || "Operator"}
                  </h1>
                  <p className="text-sm text-slate-600">
                    Operator {user?.deskNumber || "number"}
                  </p>
                </div>
              </div>
              <div
                className={`
                absolute right-0 mt-3 w-full bg-white shadow-xl border border-slate-200 px-3 py-3 rounded-xl
                transition-all duration-300 ease-out
                ${
                  logout
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 border-b pb-1">
                    <Mail className="w-4 " />
                    <p className=" text-slate-600">
                      {user?.email || "operator@gmail.com"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 border-b pb-1">
                    <Phone className="w-4 " />
                    <p className="text-slate-600">
                      {user?.phoneNumber || "77 777 77 77"}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg
                 hover:bg-red-600 transition-colors font-medium shadow-lg cursor-pointer"
                  >
                    Chiqish
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                ${
                  isOnline
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              `}
              >
                {isOnline ? (
                  <>
                    <Wifi size={16} />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff size={16} />
                    Offline
                  </>
                )}
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 cursor-pointer ${
                  spinning ? "animate-spin-reverse" : ""
                }`}
                onClick={handleRefresh}
              >
                <RefreshCcw size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Customer */}
            <div className="bg-white p-8 flex flex-col justify-between rounded-xl shadow-lg border border-slate-200 ">
              <div className="flex flex-col gap-8 ">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">
                        Bugun xizmat qildi
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {served || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Navbatda</p>
                      <p className="text-3xl font-bold text-slate-900">
                        {waiting?.length || 0}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Joriy mijoz</h2>
                </div>

                <div className="p-8 text-center overflow-y-auto h-96 flex flex-col justify-between">
                  {navbatlar ? (
                    <>
                      <div className="w-full flex justify-center">
                        <div className="inline-block h-26 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-2xl px-8 py-4 mb-4">
                          <p className="text-sm font-medium">Navbat raqami</p>
                          <p className="text-5xl font-bold">
                            {navbatlar.queueNumber}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-start">
                          <p className="text-lg font-medium">Category:</p>
                          <p className="line-clamp-2">
                            {navbatlar.categoryName_uz}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-lg font-medium">Olingan vaqt :</p>
                          <p>{navbatlar.createdTime?.slice(0, 5)}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-8">
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <UserRound className="w-18" />
                      </div>
                      <p className="text-lg font-semibold text-slate-900 mb-1">
                        Xizmatda mijoz yo‘q
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 ">
                    <button
                      disabled={!isOnline || cooldown}
                      onClick={handleCallNext}
                      className={`flex-1 py-4 rounded-xl font-bold  transition
                      ${
                        isOnline && !cooldown
                          ? "bg-linear-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {activeButton === "call"
                        ? `Chaqirilmoqda... (${seconds}s)`
                        : "Navbatni chaqirish"}
                    </button>

                    <button
                      disabled={!isOnline || cooldown || !navbatlar}
                      onClick={handleRetry}
                      className={`flex-1 py-4 rounded-xl font-bold transition
                      ${
                        isOnline && !cooldown && navbatlar
                          ? "bg-linear-to-r from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {activeButton === "retry"
                        ? `Qayta chaqirilmoqda (${seconds}s)`
                        : "Qayta chaqirish"}
                    </button>
                    <button
                      disabled={!navbatlar || cooldown}
                      onClick={() => finishQueue(navbatlar.id)}
                      className={`flex-1 py-4 rounded-xl font-bold  transition
                      ${
                        navbatlar && !cooldown
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Navbatni tugatish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Waiting */}
            <div className="col-span-3 bg-white p-8 flex flex-col justify-between rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                {!waiting || waiting.length === 0 ? (
                  <div className="w-full text-center text-slate-500 text-lg py-6">
                    Navbatlar yo‘q
                  </div>
                ) : (
                  waiting.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                    >
                      <p className="text-gray-900 font-medium">
                        {item?.queueNumber}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StaffServicePage;
