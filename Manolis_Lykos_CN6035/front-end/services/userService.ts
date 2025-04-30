import { API_BASE_URL, API_HEADERS } from "../config/api";
import { getToken } from "../utils/tokenStorage";

interface Reservation {
  reservation_id: number;
  user_id: number;
  restaurant_id: number;
  date: string;
  time: string;
  people_count: number;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  activeReservations: Reservation[];
  reservationHistory: Reservation[];
}

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const headers = {
      ...API_HEADERS,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const cancelReservation = async (
  reservationId: number
): Promise<void> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const headers = {
      ...API_HEADERS,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${API_BASE_URL}/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to cancel reservation");
    }
  } catch (error) {
    console.error("Error canceling reservation:", error);
    throw error;
  }
};

export interface UpdateReservationParams {
  user_id: number;
  restaurant_id: number;
  date: string;
  time: string;
  people_count: number;
}

export const updateReservation = async (
  reservationId: number,
  params: UpdateReservationParams
): Promise<void> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const headers = {
      ...API_HEADERS,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(
      `${API_BASE_URL}/reservations/${reservationId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update reservation");
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
};

export const getUserId = async (): Promise<number> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const headers = {
      ...API_HEADERS,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}/userid`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch user ID");
    }

    const data = await response.json();
    return data.userId;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
};

export interface CreateReservationParams {
  restaurant_id: number;
  date: string;
  time: string;
  people_count: number;
}

export const createReservation = async (
  params: CreateReservationParams
): Promise<void> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const headers = {
      ...API_HEADERS,
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: "POST",
      headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create reservation");
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};
