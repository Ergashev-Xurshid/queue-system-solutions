import { Eye, EyeOff, User, Lock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "ROLE_OPERATOR") {
      navigate("/staff", { replace: true });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("https://navbat.kstu.uz/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // API status = false => xato
      if (!response.ok || !data?.body?.token) {
        toast.error("Login yoki parol noto‘g‘ri!");
        console.log("Server javobi:", response.status, data);
        setPassword("");
        setEmail("");
        return;
      }

      // Login muvaffaqiyatli
      const { token, role } = data.body;

      if (role !== "ROLE_OPERATOR") {
        toast.error("Siz operator emassiz!");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      navigate("/staff", { replace: true });
    } catch (error) {
      console.error("Email Error:", error);
      toast.error("Server bilan aloqa mavjud emas!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-linear-to-br from-indigo-100 via-indigo-100 to-cyan-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute top-0 left-1/6 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-200/20 rounded-full blur-3xl"></div>
      </div>
      <div className="flex flex-col gap-6 w-[350px] h-[380px] rounded-2xl bg-[#fcfcfc] p-6 border border-gray-200 z-10">
        <div className="w-full text-center">
          <h2 className="font-bold text-2xl mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col gap-2">
            <p className="font-semibold text-gray-500">Email</p>
            <div className="relative group ">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white w-full text-gray-500 py-2 px-10 shadow-sm border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                type="text"
                placeholder="Enter your email"
              />
            </div>
          </label>
          <label className="flex flex-col gap-2">
            <p className="font-semibold text-gray-500">Password</p>
            <div className="relative group ">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input
                required
                className="bg-white w-full py-2 px-10  shadow-sm border border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-6  bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold  text-lg cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Yuklanmoqda...</span>
              </div>
            ) : (
              "Kirish"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
