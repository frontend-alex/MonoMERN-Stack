import passport from "passport";

import { Router } from "express";

import { validate } from "@/middlewares/validation";
import { AuthController } from "@/controllers/auth/auth.controller";
import { strategies } from "@/constants/authProviders";
import {
  loginSchema,
  otpSchema,
  registrationSchema,
} from "@shared/schemas/auth/auth.schema";
import { emailSchema } from "@shared/schemas/user/user.schema";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.login);
router.post("/register", validate(registrationSchema), AuthController.register);

router.post("/send-otp", validate(emailSchema, "body", "email"), AuthController.sendOtp);
router.put("/validate-otp", validate(otpSchema), AuthController.validateOtp);

router.get("/providers", AuthController.providers);

strategies.forEach(({ name }) => {
  router.get(
    `/${name}`,
    passport.authenticate(name, { scope: ["profile", "email"] })
  );

  router.get(
    `/${name}/callback`,
    passport.authenticate(name, {
      failureRedirect: "/login",
      session: false,
    }),
    AuthController.handleAuthCallback
  );
});

export { router as publicAuthRoutes };
