import { Router } from "express";

import { validate } from "@/middlewares/validation";
import {
  login,
  providers,
  register,
  sendOtp,
  validateOtp,
  handleAuthCallback,
} from "@/controllers/auth/auth.controller";
import {
  emailSchema,
  loginSchema,
  otpSchema,
  registrationSchema,
} from "@shared/schemas/auth/auth.schema";
import { strategies } from "@/constants/authProviders";
import passport from "passport";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registrationSchema), register);

router.post("/send-otp", validate(emailSchema), sendOtp);
router.put("/validate-otp", validate(otpSchema), validateOtp);

router.get("/providers", providers);

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
  handleAuthCallback
);
});

export { router as publicAuthRoutes };
