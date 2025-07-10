import { IUser, User } from "@/models/User";
import { createError } from "@/middlewares/errors";
import { AccountProviders } from "@shared/types/enums";
import { safeUpdate } from "@/repositories/user/user.repository";


export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const user = new User({
      email,
      username,
      password,
    });

    await user.save();
    return user;
  } catch(err) {
    throw createError("REGISTRATION_FAILED");
  }
};

export const CreateOAuthUser = async (
  username: string,
  email: string,
  provider: keyof typeof AccountProviders = AccountProviders.Credentials,
): Promise<IUser> => {
  try {
    const user = new User({
      email,
      username,
      provider,
      emailVerified: true,
      hasPassword: false,
    });

    await user.save();
    return user;
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const createPassword = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  return safeUpdate({ email }, { password, hasPassword: true });
};

export const updatePassword = async (
  email: string,
  newPassword: string
): Promise<IUser | null> => {
  return safeUpdate({ email }, { password: newPassword });
};

export const setResetToken = async (
  email: string,
  resetToken: string,
  resetTokenExpires: Date
): Promise<IUser | null> => {
  return safeUpdate({ email }, { resetToken, resetTokenExpires });
};

export const clearResetToken = async (
  email: string
): Promise<IUser | null> => {
  return safeUpdate({ email }, { $unset: { resetToken: 1, resetTokenExpires: 1 } });
};
