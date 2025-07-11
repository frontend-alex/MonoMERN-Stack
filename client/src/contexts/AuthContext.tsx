import type { User } from "@shared/types/user";
import type { ApiError } from "@shared/types/api";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation, useApiQuery } from "@/hooks/hook";
import { createContext, useContext, useMemo } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
  logout: () => void;
  refetch: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const { data, isLoading, error, refetch } = useApiQuery<{ user: User }>(
    ["auth", "me"],
    "/auth/me",
    {
      staleTime: 1000 * 60 * 10, 
      cacheTime: 1000 * 60 * 15, 
      enabled: true, 
    }
  );

  const { mutateAsync: logoutMutation } = useApiMutation(
    "POST",
    "/auth/logout",
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["auth", "me"], null);
        navigate("/", { replace: true });
        toast.success(data.message);
      },
    }
  );

  const logout = async () => {
    await logoutMutation(undefined);
  };

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      user: data?.data?.user ?? null,
      isLoading,
      error,
      isAuthenticated: Boolean(data?.data?.user) && !error,
      logout,
      refetch,
    };
  }, [data, isLoading, error, refetch, logout]);

  return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
