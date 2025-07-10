import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/components/auth/forms/login/login-form-02";
import {
  loginSchema,
  type LoginSchemaType,
} from "@shared/schemas/auth/auth.schema";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { refetch } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useApiMutation<LoginSchemaType>(
    "POST",
    "/auth/login",
    {
      onSuccess: () => {
        refetch();
        navigate("/dashboard");
        toast.success("Login successfull");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Login failed");
      },
    }
  );

  const handleLogin = useCallback(
    async (data: LoginSchemaType) => {
      login(data);
    },
    [login]
  );

  return (
    <div>
      <div className="hidden lg:flex p-5 absolute">
        <AppLogo />
      </div>
      <LoginForm
        isPending={isPending}
        loginForm={loginForm}
        handleSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
