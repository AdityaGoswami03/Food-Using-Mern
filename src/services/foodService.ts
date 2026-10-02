const API_BASE_URL = "http://localhost:9090/api/food";

export interface FoodOption {
  half?: number | string;
  full?: number | string;
  regular?: number | string;
  medium?: number | string;
  large?: number | string;
  [key: string]: number | string | undefined;
}

export interface FoodItem {
  _id?: string;
  name: string;
  CategoryName?: string;
  category?: string;
  description: string;
  price?: number;
  options?: FoodOption[];
  img?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FoodApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
  food?: T;
  foodItems?: T[];
  [key: string]: unknown;
}

export const foodService = {
  async addFood(formData: FormData): Promise<FoodApiResponse> {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/add`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Failed to add food item (${response.status})`);
    }

    return data;
  },

  async getAllFoods(): Promise<FoodApiResponse> {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch food items");
    }

    return data;
  },

  async getFoodById(id: string): Promise<FoodApiResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch food details");
    }

    return data;
  },

  async updateFood(id: string, formData: FormData): Promise<FoodApiResponse> {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Failed to update food item (${response.status})`);
    }

    return data;
  },

  async deleteFood(id: string): Promise<FoodApiResponse> {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || data.error || `Failed to delete food item (${response.status})`);
    }

    return data;
  },
};
