import { createContext, useContext, useMemo } from "react";
import { useApiQuery } from "@/hooks/hook";
import type { User } from "@shared/types/user";
import type { ApiError } from "@shared/types/api";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: ApiError | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, error } = useApiQuery<{user: User}>(
    ["auth", "me"],
    "/auth/me",
    {
      staleTime: 1000 * 60 * 10,
      enabled: true,
    }
  );

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      user: data?.data?.user ?? null,
      isLoading,
      error,
      isAuthenticated: Boolean(data?.data) && !error,
    };
  }, [data, isLoading, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
