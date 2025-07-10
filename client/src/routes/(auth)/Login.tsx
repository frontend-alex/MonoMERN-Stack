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

const Login = () => {
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
      onSuccess: (data) => {
        console.log(data);
        toast.success("Login successfull");
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response?.data.message || "Login failed");
      },
    }
  );

  const handleLogin = async (data: LoginSchemaType) => {
    login(data);
  };

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
