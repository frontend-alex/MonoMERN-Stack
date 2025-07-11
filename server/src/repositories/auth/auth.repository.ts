import { IUser, User } from "@/models/User";
import { createError } from "@/middlewares/errors";
import { AccountProviders } from "@shared/types/enums";
import { UserRepo } from "@/repositories/user/user.repository";

const createUser = async (
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
  } catch (err) {
    throw createError("REGISTRATION_FAILED");
  }
};

const CreateOAuthUser = async (
  username: string,
  email: string,
  provider: AccountProviders
): Promise<IUser> => {
  try {
    const user = new User({
      email,
      username,
      provider,
      password: "",
      emailVerified: true,
      hasPassword: false,
    });

    await user.save();
    return user;
  } catch (err) {
    throw createError("DATABASE_ERROR");
  }
};

const createPassword = async (
  id: string,
  password: string
): Promise<IUser | null> => {
  return UserRepo.safeUpdate({ id }, { password, hasPassword: true });
};


const setResetToken = async (
  id: string,
  resetToken: string,
  resetTokenExpires: Date
): Promise<IUser | null> => {
  return UserRepo.safeUpdate({ id }, { resetToken, resetTokenExpires });
};


export const AuthRepo = {
  createUser,
  CreateOAuthUser,
  createPassword,
  setResetToken,
};
