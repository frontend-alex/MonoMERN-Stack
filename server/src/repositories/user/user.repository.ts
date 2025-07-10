import { IUser, User } from "@/models/User";
import { createError } from "@/middlewares/errors";

export const safeUpdate = async (
  query: Record<string, any>,
  update: Record<string, any>
): Promise<IUser | null> => {
  try {
    return await User.findOneAndUpdate(query, update, { new: true });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const findByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const findById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId).select("-password -refreshToken")
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const findByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    return await User.findOne({ username }).select(
      "-email -createdAt -updatedAt -_id"
    );
  } catch {
    throw createError("DATABASE_ERROR");
  }
};
