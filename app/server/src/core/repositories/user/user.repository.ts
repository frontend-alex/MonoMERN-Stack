import { IUser, User } from "@/core/models/User";
import { config } from "@shared/config/config";

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
  return await User.findOneAndUpdate(query, update, { new: true });
};

const updateUser = async (
  query: Record<string, any>,
  update: Record<string, any>
): Promise<IUser | null> => {
  const filteredUpdate = filterAllowedUpdates(
    update,
    config.user.allowedUpdates
  );

  return await User.findOneAndUpdate(query, filteredUpdate, { new: true });
};

const findByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

const findById = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId);
};

const findByUsername = async (username: string): Promise<IUser | null> => {
  return await User.findOne({ username }).select(
    "-email -createdAt -updatedAt -_id"
  );
};

const deleteUser = async (userId: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(userId);
};

export const UserRepo = {
  safeUpdate,
  updateUser,
  findByEmail,
  findById,
  findByUsername,
  deleteUser,
};
