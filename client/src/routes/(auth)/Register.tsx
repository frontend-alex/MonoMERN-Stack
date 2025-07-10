import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation, useApiQuery } from "@/hooks/hook";
import { RegisterForm } from "@/components/auth/forms/register/register-form-02";
import type { Providers } from "@/components/auth/forms/buttons/provider-buttons";
import {
  registrationSchema,
  type RegistrationSchemaType,
} from "@shared/schemas/auth/auth.schema";

const Register = () => {
  const navigate = useNavigate();

  const registerForm = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: sendOtp } = useApiMutation("POST", "/auth/send-otp");

  const { mutateAsync: register, isPending } = useApiMutation<
    { email: string },
    RegistrationSchemaType
  >("POST", "/auth/register", {
    onError: (err) => {
      const errorData = err.response?.data;

      if (errorData?.otpRedirect && errorData?.email) {
        navigate(`/verify-email?email=${errorData.email}`);
        return;
      }

      toast.error(
        errorData?.userMessage || errorData?.message || "Something went wrong"
      );
    },
    onSuccess: (data) => {
      const email = data.data?.email;
      navigate(`/verify-email?email=${email}`);
      sendOtp({ email });
    },
  });

  const { data: providersResponse, isLoading: isProvidersPending } =
    useApiQuery<{ publicProviders: Providers[] }>(
      ["providers"],
      "/auth/providers"
    );

  const handleRegister = useCallback(
    async (data: RegistrationSchemaType) => {
      register(data);
    },
    [register]
  );

  const providers = providersResponse?.data?.publicProviders ?? [];

  return (
    <div>
      <div className="hidden lg:flex p-5 absolute">
        <AppLogo />
      </div>
      <RegisterForm
        registerForm={registerForm}
        handleSubmit={handleRegister}
        isPending={isPending}
        providers={providers}
        isProvidersPending={isProvidersPending}
      />
    </div>
  );
};

export default Register;
