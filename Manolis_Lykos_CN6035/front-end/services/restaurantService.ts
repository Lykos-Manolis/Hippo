import { Restaurant } from "@/data/restaurants";
import { API_BASE_URL, API_HEADERS, API_TIMEOUT } from "@/config/api";

/**
 * Fetches all restaurants from the API
 */
export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}/restaurants`, {
      headers: API_HEADERS,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    console.error("Failed to fetch restaurants:", error);
    throw error;
  }
};

/**
 * Fetches a single restaurant by ID
 */
export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const response = await fetch(`${API_BASE_URL}/restaurants/${id}`, {
      headers: API_HEADERS,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }

    console.error(`Failed to fetch restaurant with ID ${id}:`, error);
    throw error;
  }
};
