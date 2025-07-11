import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import AppLogo from "@/components/AppLogo";
import { RegisterForm } from "@/components/auth/forms/register/register-form-02";
import { useApiMutation, useApiQuery } from "@/hooks/hook";
import {
  registrationSchema,
  type RegistrationSchemaType,
} from "@shared/schemas/auth/auth.schema";
import type { Providers } from "@/components/auth/forms/buttons/provider-buttons";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: sendOtp } = useApiMutation("POST", "/auth/send-otp", {
    onSuccess: (data) => toast.success(data.message),
    onError: (data) => toast.success(data.message),
  });

  const { mutateAsync: register, isPending } = useApiMutation<
    { email: string },
    RegistrationSchemaType
  >("POST", "/auth/register", {
    onSuccess: ({ data, message }) => {
      const email = data?.email;
      if (email) {
        toast.success(message);
        sendOtp({ email });
        navigate(`/verify-email?email=${email}`);
      }
    },
    onError: (err) => {
      const error = err.response?.data;
      if (error?.otpRedirect && error?.email) {
        navigate(`/verify-email?email=${error.email}`);
        return;
      }
      toast.error(error?.userMessage || error?.message || "Something went wrong");
    },
  });

  const { data: providerRes, isLoading: isProvidersPending } = useApiQuery<{
    publicProviders: Providers[];
  }>(["providers"], "/auth/providers");

  const handleRegister = (data: RegistrationSchemaType) => register(data);

  return (
    <div>
      <div className="hidden lg:flex p-5 absolute">
        <AppLogo />
      </div>
      <RegisterForm
        registerForm={form}
        handleSubmit={handleRegister}
        isPending={isPending}
        providers={providerRes?.data?.publicProviders ?? []}
        isProvidersPending={isProvidersPending}
      />
    </div>
  );
};

export default Register;
