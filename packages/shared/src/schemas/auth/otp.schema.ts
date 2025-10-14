import z from "zod";

export const otpCodeSchema = z
  .string()
  .length(6, "OTP code must be exactly 6 digits")
  .regex(/^\d{6}$/, "OTP code must contain only numbers");

export const otpTypeSchema = z.enum(['email_verification', 'password_reset', 'login']);

export const createOtpSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  type: otpTypeSchema,
  expiresInMinutes: z.number().min(1).max(60).default(5), // Default 5 minutes
});

export const verifyOtpSchema = z.object({
  code: otpCodeSchema,
  type: otpTypeSchema,
  userId: z.string().min(1, "User ID is required"),
});

export const resendOtpSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  type: otpTypeSchema,
});

export type CreateOtpSchemaType = z.infer<typeof createOtpSchema>;
export type VerifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;
export type ResendOtpSchemaType = z.infer<typeof resendOtpSchema>;
export type OtpCodeSchemaType = z.infer<typeof otpCodeSchema>;
export type OtpTypeSchemaType = z.infer<typeof otpTypeSchema>;
