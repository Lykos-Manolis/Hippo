import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_ID_KEY = "user_id";

export const saveToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error saving token:", error);
    throw error;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing token:", error);
    throw error;
  }
};

export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    if (!token) return false;

    // Decode the JWT token to get the payload
    const payload = JSON.parse(atob(token.split(".")[1]));

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const saveUserId = async (userId: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
  } catch (error) {
    console.error("Error saving user ID:", error);
    throw error;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error("Error retrieving user ID:", error);
    return null;
  }
};

export const removeUserId = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error("Error removing user ID:", error);
    throw error;
  }
};
