import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
} from "../utils/authStorage";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 앱 시작 시 로그인 여부 확인
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const accessToken = await getAccessToken();
      const refreshToken = await getRefreshToken();
      setIsAuthenticated(!!accessToken || !!refreshToken);
    } catch (error) {
      console.error("❌ Error checking auth status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (accessToken: string, refreshToken: string) => {
    await saveTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
