import { IUser, User } from "@/models/User";
import { config } from "@shared/config/config";
import { createError } from "@/middlewares/errors";

function filterAllowedUpdates<T extends Record<string, any>>(
  updates: T,
  allowedFields: string[]
): Partial<T> {
  return Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowedFields.includes(key))
  ) as Partial<T>;
}

const safeUpdate = async (
  query: Record<string, any>,
  update: Record<string, any>
): Promise<IUser | null> => {
  try {
    return await User.findOneAndUpdate(query, update, { new: true });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

const updateUser = async (
  query: Record<string, any>,
  update: Record<string, any>
): Promise<IUser | null> => {
  try {
    const filteredUpdate = filterAllowedUpdates(
      update,
      config.user.allowedUpdates
    );

    return await User.findOneAndUpdate(query, filteredUpdate, { new: true });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

const findByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

const findById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId);
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

const findByUsername = async (username: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ username }).select(
      "-email -createdAt -updatedAt -_id"
    );
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) throw createError("USER_NOT_FOUND");
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const UserRepo = {
  safeUpdate,
  updateUser,
  findByEmail,
  findById,
  findByUsername,
  deleteUser
};
