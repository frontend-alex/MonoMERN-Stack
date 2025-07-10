import { Router } from "express";

import { validate } from "@/middlewares/validation";
import {
  login,
  register,
  sendOtp,
  validateOtp,
} from "@/controllers/auth/auth.controller";
import {
  emailSchema,
  loginSchema,
  otpSchema,
  registrationSchema,
} from "@shared/schemas/auth/auth.schema";
import { strategies } from "@/constants/authStrategies";
import passport from "passport";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", validate(registrationSchema), register);

router.post("/send-otp", validate(emailSchema), sendOtp);
router.put("/validate-otp", validate(otpSchema), validateOtp);

strategies.forEach(({ name }) => {
  console.log(name)
  router.get(`/${name}`, passport.authenticate(name, { scope: ["profile", "email"] }));

  router.get(
    `/${name}/callback`,
    passport.authenticate(name, {
      failureRedirect: "/login", 
      successRedirect: "/dashboard", 
    })
  );
});

export { router as publicAuthRoutes };
