import bcrypt from "bcrypt";
import { env } from "@/config/env";
import { jwtUtils } from "@/utils/jwt";
import { EmailUtils } from "@/utils/email";
import { generateOTP } from "@/utils/utils";
import { DecodedUser } from "@/middlewares/auth";
import { createError } from "@/middlewares/errors";
import { AccountProviders } from "@shared/types/enums";
import { UserRepo } from "@/repositories/user/user.repository";
import { AuthRepo } from "@/repositories/auth/auth.repository";
import { config } from "@shared/config/config";

const login = async (email: string, password: string) => {
  try {
    const user = await UserRepo.findByEmail(email);
    if (!user) throw createError("USER_NOT_FOUND");

    if (user.provider != AccountProviders.Credentials)
      throw createError("ACCOUNT_ALREADY_CONNECTED_WITH_PROVIDER");

    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw createError("INVALID_CURRENT_PASSWORD");

    if (!user.emailVerified) throw createError("EMAIL_NOT_VERIFIED");

    return jwtUtils.generateToken(user.id, user.username);
  } catch (err) {
    throw err;
  }
};

const handleAuthCallback = async (user: DecodedUser) => {
  if (!user) throw createError("USER_NOT_FOUND");
  return jwtUtils.generateToken(user.id, user.username);
};

const register = async (username: string, email: string, password: string) => {
  try {
    const existingUserEmail = await UserRepo.findByEmail(email);
    if (existingUserEmail) {
      if (!existingUserEmail.emailVerified) {
        throw createError("EMAIL_ALREADY_TAKEN", {
          extra: { otpRedirect: true, email },
        });
      }

      throw createError("EMAIL_ALREADY_TAKEN");
    }

    const existingUserUsername = await UserRepo.findByUsername(username);
    if (existingUserUsername) throw createError("USERNAME_ALREADY_TAKEN");

    return await AuthRepo.createUser(username, email, password);
  } catch (err) {
    throw err;
  }
};

const sendOtp = async (email: string) => {
  try {
    const otp = generateOTP();
    const otpExpiry = Date.now() + env.OTP_EXPIRY;

    const user = await UserRepo.findByEmail(email);

    if (!user) throw createError("USER_NOT_FOUND");
    if (user.emailVerified) throw createError("EMAIL_ALREADY_VERIFIED");

    await UserRepo.safeUpdate({ email }, { otp, tokenExpiry: otpExpiry });

    const otpEmail = EmailUtils.getEmailTemplate("otp");
    const html = otpEmail
      .replace("{{OTP_CODE}}", otp)
      .replace("{{YEAR}}", new Date().getFullYear().toString())
      .replace("{{APP_NAME}}", config.app.name);

    await EmailUtils.sendEmail(email, "Your OTP code", html);
  } catch (err) {
    throw err;
  }
};

const validateOtp = async (email: string, otp: string) => {
  try {
    const user = await UserRepo.findByEmail(email);
    if (!user) throw createError("USER_NOT_FOUND");

    if (!user || !user.otp) throw createError("OTP_NOT_FOUND");
    if (Date.now() > user.tokenExpiry!) throw createError("OTP_EXPIRED");
    if (user.otp !== otp) throw createError("INVALID_OTP");

    await UserRepo.safeUpdate(
      { email },
      {
        $set: { emailVerified: true },
        $unset: { otp: 1, tokenExpiry: 1 },
      }
    );
  } catch (err) {
    throw err;
  }
};

const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const user = await UserRepo.findById(userId);
    if (!user) throw createError("USER_NOT_FOUND");

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw createError("INVALID_CURRENT_PASSWORD");

    if (currentPassword === newPassword) throw createError("SAME_PASSWORD");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserRepo.safeUpdate({ id: user.id }, { password: hashedPassword });
  } catch (err) {
    throw err;
  }
};

const sendPasswordEmail = async (email: string) => {
  try {
    const user = await UserRepo.findByEmail(email);
    if (!user) throw createError("USER_NOT_FOUND");

    if (user.provider !== AccountProviders.Credentials)
      throw createError("ACCOUNT_ALREADY_CONNECTED_WITH_PROVIDER");

    const token = jwtUtils.generateToken(user.id, user.username);
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // one hour

    await UserRepo.safeUpdate(
      { _id: user.id },
      { tokenExpiry, resetToken: token }
    );

    const resetLink = `${env.CORS_ORIGINS}/reset-password`;

    const emailTemplate = EmailUtils.getEmailTemplate("reset-password");
    const html = emailTemplate
      .replace("{{RESET_LINK}}", resetLink)
      .replace("{{APP_NAME}}", config.app.name)
      .replace("{{YEAR}}", new Date().getFullYear().toString());

    await EmailUtils.sendEmail(email, "Reset Password Link", html);

    return { token };
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (userId: string, newPassword: string) => {
  try {
    const user = await UserRepo.findById(userId);
    if (!user) throw createError("USER_NOT_FOUND");

    if (newPassword === user.password) throw createError("SAME_PASSWORD");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserRepo.safeUpdate(
      { _id: user.id },
      { password: hashedPassword, $unset: { resetToken: 1, tokenExpiry: 1 } }
    );
  } catch (err) {
    throw err;
  }
};

export const AuthService = {
  login,
  sendOtp,
  register,
  validateOtp,
  resetPassword,
  updatePassword,
  sendPasswordEmail,
  handleAuthCallback,
};
