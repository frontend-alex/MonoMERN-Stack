import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginForm } from "@/components/auth/login-form-02";
import { loginSchema, type LoginSchemaType } from "@/schemas/auth/authSchema";

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
    "/login",
    {
      onSuccess: () => {
        toast.success("Login successfull");
      },
      onError: (err) => {
        toast.error("Error!", {
          description: err.response?.data.message || "Login failed",
        });
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
