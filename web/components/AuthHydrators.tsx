"use client";
import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { fetchWithCredentials } from "@/lib/utils/api";
import { useEffect } from "react";

export const AuthHydrators = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const stopLoading = useAuthStore((state) => state.stopLoading);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const res = await fetchWithCredentials(`${BASE_URL}/account/me/`);
        login(res);
      } catch {
        // network error → do NOT auto logout
        logout();
      } finally {
        stopLoading();
      }
    };

    hydrateAuth();
  }, [login, logout, stopLoading]);

  return null;
};
