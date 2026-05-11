export const CURRENT_QUEUE_KEY = "current_operator_queue";

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem(CURRENT_QUEUE_KEY);
}

export function handleUnauthorized() {
  clearAuth();
  if (window.location.hash !== "#/") {
    window.location.hash = "#/";
  }
}
