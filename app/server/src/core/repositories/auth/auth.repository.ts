import { IUser, User } from "@/core/models/User";
import { AccountProviders } from "@shared/types/user";

const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const user = new User({
    email,
    username,
    password,
  });

  await user.save();
  return user;
};

const CreateOAuthUser = async (
  username: string,
  email: string,
  provider: AccountProviders
): Promise<IUser> => {
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
};

export const AuthRepo = {
  createUser,
  CreateOAuthUser,
};
