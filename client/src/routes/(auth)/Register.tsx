import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "@/schemas/auth/authSchema";
import { RegisterForm } from "@/components/auth/register-form-03";
import type { RegistrationSchemaType } from "@/schemas/auth/authSchema";

const Register = () => {
  const registerForm = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: register, isPending } =
    useApiMutation<RegistrationSchemaType>("POST", "/register", {
      onSuccess: () => {
        toast.success("Register successfull");
      },
      onError: (err) => {
        toast.error("Error!", {
          description: err.response?.data.message || "Registraton failed",
        });
      },
    });

  const handleRegister = async (data: RegistrationSchemaType) => {
    register(data);
  };

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
