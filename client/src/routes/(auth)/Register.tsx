import AppLogo from "@/components/AppLogo";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useApiMutation } from "@/hooks/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "@/components/auth/register-form-03";
import {
  registrationSchema,
  type RegistrationSchemaType,
} from "@shared/schemas/auth/auth.schema";

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
    useApiMutation<RegistrationSchemaType>("POST", "/auth/register", {
      onSuccess: () => {
        toast.success("Register successfull");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Registraton failed");
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
