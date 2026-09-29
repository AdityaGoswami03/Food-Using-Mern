const API_BASE_URL = "http://localhost:9090/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data: ApiResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || data.error || "Registration failed. Please try again.");
    }

    return data;
  },
};
