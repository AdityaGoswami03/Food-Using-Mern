export interface UserTokenPayload {
  id?: string;
  email?: string;
  role?: string;
  user?: {
    id?: string;
    email?: string;
    role?: string;
  };
}

export function getUserRole(): string | null {
  const directRole = localStorage.getItem("userRole");
  if (directRole) return directRole;

  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload: UserTokenPayload = JSON.parse(atob(parts[1]));
      const role = payload.role || payload.user?.role;
      if (role) {
        localStorage.setItem("userRole", role);
        return role;
      }
    }
  } catch (error) {
    console.error("Failed to decode token payload:", error);
  }

  return null;
}

export function isAdmin(): boolean {
  return getUserRole() === "admin";
}

export function clearAuth(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  localStorage.removeItem("userRole");
}
