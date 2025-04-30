import { API_BASE_URL, API_HEADERS } from "../config/api";
import { getToken, isTokenValid } from "./tokenStorage";
import { router } from "expo-router";

/**
 * Utility for making authenticated API requests
 */
export const apiClient = {
  /**
   * Check token validity and redirect if needed
   */
  checkAuth: async () => {
    const valid = await isTokenValid();
    if (!valid) {
      // Don't redirect if already on login or signup page
      // Since we can't use hooks directly here, just redirect and let
      // route protection in AuthContext handle this
      console.log("Token is invalid or expired, redirecting to login");
      router.replace("/login");
      return false;
    }
    return true;
  },

  /**
   * Make a GET request
   */
  get: async (endpoint: string) => {
    // Check token validity first
    const isValid = await apiClient.checkAuth();
    if (!isValid) {
      throw new Error("Authentication required");
    }

    const token = await getToken();
    const headers = token
      ? { ...API_HEADERS, Authorization: `Bearer ${token}` }
      : API_HEADERS;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      // Handle expired token error from server (403)
      if (response.status === 403) {
        router.replace("/login");
        throw new Error("Authentication expired");
      }

      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return await response.json();
  },

  /**
   * Make a POST request
   */
  post: async (endpoint: string, data: any) => {
    // Check token validity first
    const isValid = await apiClient.checkAuth();
    if (!isValid && endpoint !== "/login" && endpoint !== "/register") {
      throw new Error("Authentication required");
    }

    const token = await getToken();
    const headers = token
      ? { ...API_HEADERS, Authorization: `Bearer ${token}` }
      : API_HEADERS;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle expired token error from server (403)
      if (response.status === 403) {
        router.replace("/login");
        throw new Error("Authentication expired");
      }

      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return await response.json();
  },

  /**
   * Make a PUT request
   */
  put: async (endpoint: string, data: any) => {
    // Check token validity first
    const isValid = await apiClient.checkAuth();
    if (!isValid) {
      throw new Error("Authentication required");
    }

    const token = await getToken();
    const headers = token
      ? { ...API_HEADERS, Authorization: `Bearer ${token}` }
      : API_HEADERS;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Handle expired token error from server (403)
      if (response.status === 403) {
        router.replace("/login");
        throw new Error("Authentication expired");
      }

      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return await response.json();
  },

  /**
   * Make a DELETE request
   */
  delete: async (endpoint: string) => {
    // Check token validity first
    const isValid = await apiClient.checkAuth();
    if (!isValid) {
      throw new Error("Authentication required");
    }

    const token = await getToken();
    const headers = token
      ? { ...API_HEADERS, Authorization: `Bearer ${token}` }
      : API_HEADERS;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      // Handle expired token error from server (403)
      if (response.status === 403) {
        router.replace("/login");
        throw new Error("Authentication expired");
      }

      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return await response.json();
  },
};
