export const getBaseURL = () => localStorage.getItem("apiBaseURL") || "";
export const setBaseURL = (v) => localStorage.setItem("apiBaseURL", v);

export const getToken = () => localStorage.getItem("token") || "";
export const setToken = (v) => localStorage.setItem("token", v);

export const verifyURL = async (url) => {
  try {
    const res = await fetch(`${url}/api/health`, { method: "GET" });

    // agar status 200 bo'lmasa, false qaytar
    if (!res.ok) return false;

    const text = await res.text();

    // text bo'sh bo'lmasligi va server javobi kutgan matn bilan mos bo'lishi kerak
    return text.includes("Server is running");
  } catch (err) {
    console.log("verifyURL xato:", err);
    return false;
  }
};
