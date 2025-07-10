import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return <>{isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />}</>;
};

export default AuthLayout;
