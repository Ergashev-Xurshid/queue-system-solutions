import { Lock, Eye, EyeOff, MonitorSmartphone } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DeviceLogin() {
  const [selectedType, setSelectedType] = useState("ANDROID_TV");
  const [deviceLogin, setDeviceLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://navbat.kstu.uz/api/devices/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: deviceLogin,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.body?.token) {
        toast.error("Login yoki parol noto‘g‘ri!");
        setPassword("");
        setDeviceLogin("");
        return;
      }
      toast.success(data.message);
      setDeviceLogin("");
      setPassword("")
      
    } catch (err) {
      toast.error("Server bilan ulanishda xato! Internetni tekshiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="bg-white w-[350px] h-85 p-6 rounded-2xl shadow-lg border border-gray-100 mt-20">
        <h2 className="text-2xl font-bold text-center mb-1">Device Login</h2>
        <p className="text-center text-gray-500 mb-5">
          Qurilma orqali tizimga kiring
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Device Login */}
          <div className="relative">
            <MonitorSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="text"
              placeholder="Device Login"
              className="w-full pl-10 px-12 py-2 border rounded-xl focus:border-indigo-500"
              value={deviceLogin}
              onChange={(e) => setDeviceLogin(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Parol"
              className="w-full px-12 py-2 border rounded-xl focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          {/* <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="ANDROID_TV">ANDROID_TV</option>
            <option value="MONITOR">MONITOR</option>
            <option value="TABLET">TABLET</option>
          </select> */}
          {/* Button */}
          <button
            disabled={loading}
            className="bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeviceLogin;
