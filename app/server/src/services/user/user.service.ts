import { createError } from "@/middlewares/errors";
import { UserRepo } from "@/repositories/user/user.repository";

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

    await UserRepo.deleteUser(userId);
  } catch (err) {
    throw err;
  }
};


export const UserService = {
  updateUser,
  deleteUser
}  


