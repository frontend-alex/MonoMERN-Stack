import { Router } from "express";
import { jwtMiddleware } from "@/middlewares/auth";
import { validate } from "@/middlewares/validation";
import { AuthController } from "@/controllers/auth/auth.controller";
import { updateUserSchema } from "@shared/schemas/user/user.schema";
import { UserController } from "@/controllers/user/user.controller";


const router = Router();

router.use(jwtMiddleware);

router.get("/me", UserController.getUser);
router.post("/logout", AuthController.logout);

router.put("/update", validate(updateUserSchema), UserController.updateUser);

router.delete("/delete", UserController.deleteUser);

export { router as protectedAuthRoutes };
