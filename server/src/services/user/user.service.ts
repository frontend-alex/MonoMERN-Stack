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


export const UserService = {
  updateUser
}