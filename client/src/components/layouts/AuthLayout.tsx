import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  return <>{false ? <Navigate to="/dashboard" /> : <Outlet />}</>;
};

export default AuthLayout;
