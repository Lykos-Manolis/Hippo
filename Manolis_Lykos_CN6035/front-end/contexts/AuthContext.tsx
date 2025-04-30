import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  login as loginService,
  register as registerService,
} from "../services/authService";
import {
  saveToken,
  getToken,
  removeToken,
  saveUserId,
  isTokenValid,
} from "../utils/tokenStorage";
import { router, useSegments } from "expo-router";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  checkAuthStatus: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const segments = useSegments();

  const checkAuthStatus = async () => {
    try {
      const isValid = await isTokenValid();
      setIsAuthenticated(isValid);

      // Redirect to login if token is invalid
      if (!isValid && segments[0] !== "login" && segments[0] !== "signup") {
        console.log("Token is invalid or expired, redirecting to login");
        router.replace("/login");
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await loginService({ email, password });
      await saveToken(response.token);
      setIsAuthenticated(true);
      router.replace("/(tabs)");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await registerService({ name, email, password });
      await saveUserId(response.userId);
      router.replace("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await removeToken();
      setIsAuthenticated(false);
      router.replace("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    error,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
