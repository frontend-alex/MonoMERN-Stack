import { Router } from "express";

import { validate } from "@/middlewares/validation";
import { login, register } from "@/controllers/auth/auth.controller";
import { loginSchema, registrationSchema }  from '@shared/schemas/auth/auth.schema'

const router = Router();


router.post('/register', validate(registrationSchema), register)
router.post('/login', validate(loginSchema), login)
// router.post('/send-otp',)
// router.put('/validate-otp',)

export { router as publicAuthRoutes };