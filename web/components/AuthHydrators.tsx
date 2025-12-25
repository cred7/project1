"use client";
import { useAuthStore } from "@/lib/hooks/useAuthStore";
import { fetchWithCredentials } from "@/lib/utils/api";
import { useEffect } from "react";

export const AuthHydrators = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const stopLoading = useAuthStore((state) => state.stopLoading);

  useEffect(() => {
    const hydrateAuth = async () => {
      try {
        const res = await fetchWithCredentials(
          "http://localhost:7000/account/me/"
        );
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
