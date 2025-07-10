import { useAuth } from "@/contexts/AuthContext";
import { useApiMutation } from "@/hooks/hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {  mutateAsync: login } = useApiMutation("POST", '/auth/login')

  useEffect(() => {
    const handleAuth = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await login(token);
      } catch (error) {
        navigate("/login");
        return;
      }
    };

    handleAuth();
  }, [login, navigate]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging you in...</p>
    </div>
  );
};

export default AuthCallback;
