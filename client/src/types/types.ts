import type { UseFormReturn } from "react-hook-form";
import type {
  LoginSchemaType,
  OtpSchemaType,
  RegistrationSchemaType,
} from "@shared/schemas/auth/auth.schema";
import type { Providers } from "@/components/auth/forms/buttons/provider-buttons";

export interface LoginFormProps extends React.ComponentProps<"div"> {
  loginForm: UseFormReturn<LoginSchemaType>;
  handleSubmit: (data: LoginSchemaType) => void;
  isPending: boolean;
  providers: Providers[] | undefined;
  isProvidersPending: boolean;
}

export interface RegisterFormProps extends React.ComponentProps<"div"> {
  registerForm: UseFormReturn<RegistrationSchemaType>;
  handleSubmit: (data: RegistrationSchemaType) => void;
  isPending: boolean;
  providers: Providers[] | undefined;
  isProvidersPending: boolean;
}

export interface OtpFormProps extends React.ComponentProps<"div"> {
  otpForm: UseFormReturn<OtpSchemaType>;
  isOtpverifying: boolean;
  isOtpPending: boolean;
  cooldown: number;
  handleSubmit: (data: OtpSchemaType) => void;
  resendOtp: () => void;
}
