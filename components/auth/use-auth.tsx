"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useCallback } from "react";

export function useAuth() {
  const { login, logout, authenticated, user, ready, createWallet } =
    usePrivy();

  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated: authenticated,
    isLoading: !ready,
    user,
    createWallet,
  };
}
