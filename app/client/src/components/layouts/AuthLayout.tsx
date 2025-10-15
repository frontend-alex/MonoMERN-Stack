import Loading from "@/components/Loading";

import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Loading/>;

  if (isAuthenticated) {
    return <Navigate to="/dashboard"/>;
  }

  return <Outlet />;
};

export default AuthLayout;


