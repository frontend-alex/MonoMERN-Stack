import { IUser, User } from "@/models/User";
import { createError } from "@/middlewares/ErrorHandler";

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
    const c = await User.findOne({ email });
    console.log(c);
    return c;
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const findById = async (userId: string): Promise<IUser | null> => {
  try {
    return await User.findById(userId).populate({
      path: "workspaces",
      populate: {
        path: "members.user",
        model: "User",
        select: "username imageUrl email",
      },
    });
  } catch {
    throw createError("DATABASE_ERROR");
  }
};

export const findByUsername = async (
  username: string
): Promise<IUser | null> => {
  try {
    const c = await User.findOne({ username }).select(
      "-email -role -createdAt -updatedAt -_id"
    );
    console.log(c);
    return c;
  } catch {
    throw createError("DATABASE_ERROR");
  }
};
