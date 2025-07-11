import { useEffect } from "react";
import { useApiMutation } from "@/hooks/hook";
import { useNavigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

const AuthCallback = () => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const {  mutateAsync: login } = useApiMutation("POST", '/auth/login')

  useEffect(() => {
    const handleAuth = async () => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
          queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      } catch (error) {
        navigate("/login");
      }
      
    };

    handleAuth();
  }, [login, navigate]);


  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging you in...</p>
    </div>
  );
};

export default AuthCallback;
