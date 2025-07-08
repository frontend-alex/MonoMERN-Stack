import type { UseFormReturn } from "react-hook-form";
import type { LoginSchemaType, RegistrationSchemaType } from "@/schemas/auth/authSchema";

export interface LoginFormProps extends React.ComponentProps<"div"> {
  loginForm: UseFormReturn<LoginSchemaType>;
  handleSubmit?: (data: LoginSchemaType) => void;
  isPending: boolean,
}

export interface RegisterFormProps extends React.ComponentProps<"div"> {
  registerForm: UseFormReturn<RegistrationSchemaType>;
  handleSubmit?: (data: RegistrationSchemaType) => void;
  isPending: boolean,
}
