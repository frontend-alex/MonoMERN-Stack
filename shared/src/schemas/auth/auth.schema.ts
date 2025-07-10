import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;


export const otpSchema = z.object({
  pin: z.string().min(6, {
     message: "Your one-time password must be 6 characters."
  }),
  email: z.string().email("Invalid email address"),
})

export type OtpSchemaType = z.infer<typeof otpSchema>

export const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export type EmailSchemaType = z.infer<typeof emailSchema>
