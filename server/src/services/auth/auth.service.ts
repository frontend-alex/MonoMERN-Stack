import { createError } from "@/middlewares/ErrorHandler";
import { createUser } from "@/repositories/auth/auth.repository";
import {
  findByEmail,
  findByUsername,
} from "@/repositories/user/user.repository";

export const registerService = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const existingUserUsername = await findByUsername(username);
    if (existingUserUsername) throw createError("USERNAME_ALREADY_TAKEN");

    const existingUserEmail = await findByEmail(email);
    if (existingUserEmail) {
      if (!existingUserEmail.emailVerified) {
        throw createError("EMAIL_ALREADY_TAKEN", {
          extra: { otpRedirect: true },
        });
      }

      throw createError("EMAIL_ALREADY_TAKEN");
    }

    return await createUser(username, email, password);
  } catch (err) {
    throw err;
  }
};
