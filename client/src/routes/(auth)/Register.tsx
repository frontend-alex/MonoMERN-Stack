import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "@/components/auth/forms/register/register-form-02";
import {
  registrationSchema,
  type RegistrationSchemaType,
} from "@shared/schemas/auth/auth.schema";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

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
      navigate(`/verify-email?email=${data.data?.email}`);
      sendOtp({ email: data.data?.email })
    },
  });

  const handleRegister = useCallback(
    async (data: RegistrationSchemaType) => {
      register(data);
    },
    [register]
  );

  return (
    <div>
      <div className="hidden lg:flex p-5 absolute">
        <AppLogo />
      </div>
      <RegisterForm
        registerForm={registerForm}
        handleSubmit={handleRegister}
        isPending={isPending}
      />
    </div>
  );
};

export default Register;
