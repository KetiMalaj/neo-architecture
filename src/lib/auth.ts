const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "arcan2026";
const AUTH_KEY = "arcan_admin_auth";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ user: username, ts: Date.now() }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated(): boolean {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    // Session expires after 24 hours
    return parsed.user === ADMIN_USERNAME && Date.now() - parsed.ts < 86400000;
  } catch {
    return false;
  }
}
