import { env } from "@/config/env";
import { DecodedUser } from "@/middlewares/auth";
import { createError } from "@/middlewares/errors";
import { createUser } from "@/repositories/auth/auth.repository";
import {
  findByEmail,
  findByUsername,
  safeUpdate,
} from "@/repositories/user/user.repository";
import { getEmailTemplate, sendEmail } from "@/utils/email";
import { jwtUtils } from "@/utils/jwt";
import { generateOTP } from "@/utils/utils";
import { AccountProviders } from '@shared/types/enums'

export const loginService = async (email: string, password: string) => {
  try {
    const user = await findByEmail(email);
    if (!user) throw createError("USER_NOT_FOUND");

    if(user.provider != AccountProviders.Credentials) throw createError("ACCOUNT_ALREADY_CONNECTED_WITH_PROVIDER")

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw createError("INVALID_CURRENT_PASSWORD");

    if (!user.emailVerified) throw createError("EMAIL_NOT_VERIFIED");

    return jwtUtils.generateToken(user.id, user.username);
  } catch (err) {
    throw err;
  }
};

export const handleAuthCallbackService = async (user: DecodedUser) => {
  if (!user) throw createError("USER_NOT_FOUND");
  return jwtUtils.generateToken(user.id, user.username);
};

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const existingUserEmail = await findByEmail(email);
    if (existingUserEmail) {
      if (!existingUserEmail.emailVerified) {
        throw createError("EMAIL_ALREADY_TAKEN", {
          extra: { otpRedirect: true, email },
        });
      }

      throw createError("EMAIL_ALREADY_TAKEN");
    }

    const existingUserUsername = await findByUsername(username);
    if (existingUserUsername) throw createError("USERNAME_ALREADY_TAKEN");

    return await createUser(username, email, password);
  } catch (err) {
    throw err;
  }
};

export const sendOtpService = async (email: string) => {
  try {
    const otp = generateOTP();
    const otpExpiry = Date.now() + env.OTP_EXPIRY;

    const user = await findByEmail(email);

    if (!user) throw createError("USER_NOT_FOUND");
    if (user.emailVerified) throw createError("EMAIL_ALREADY_VERIFIED");

    await safeUpdate({ email }, { otp, otpExpiry });

    const otpEmail = getEmailTemplate("otp");
    const html = otpEmail
      .replace("{{OTP_CODE}}", otp)
      .replace("{{YEAR}}", new Date().getFullYear().toString());

    await sendEmail(email, "Your OTP code", html);
  } catch (err) {
    throw err;
  }
};

export const validateOtpService = async (email: string, otp: string) => {
  try {
    const user = await findByEmail(email);
    if (!user) throw createError("USER_NOT_FOUND");

    if (!user || !user.otp) throw createError("OTP_NOT_FOUND");
    if (Date.now() > user.otpExpiry!) throw createError("OTP_EXPIRED");
    if (user.otp !== otp) throw createError("INVALID_OTP");

    await safeUpdate(
      { email },
      {
        $set: { emailVerified: true },
        $unset: { otp: 1, otpExpiry: 1 },
      }
    );
  } catch (err) {
    throw err;
  }
};
