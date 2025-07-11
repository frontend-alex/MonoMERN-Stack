import { z } from "zod";

import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from "../user/user.schema";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;

export const otpSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: emailSchema,
});

export type OtpSchemaType = z.infer<typeof otpSchema>;



export const updatePasswordSchema = z
  .object({
    password: z.string(),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type updatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;
