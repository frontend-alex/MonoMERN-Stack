import { createError } from "@/core/error/errors";
import { UserRepo } from "@/core/repositories/user/user.repository";

const updateUser = async (
  userId: string,
  updateData: Record<string, any>
): Promise<void> => {
  if (Object.keys(updateData).length === 0) {
    throw createError("NO_UPDATES_PROVIDED");
  }

  if ("email" in updateData) {
    updateData.emailVerified = false;
  }

  await UserRepo.updateUser({ _id: userId }, updateData);
};

const deleteUser = async (userId: string) => {
  try {
    if (!userId) throw createError("USER_NOT_FOUND");

    const result = await UserRepo.deleteUser(userId);
    if (!result) throw createError("USER_NOT_FOUND");
    
  } catch (err) {
    throw err;
  }
};


export const UserService = {
  updateUser,
  deleteUser
}  


