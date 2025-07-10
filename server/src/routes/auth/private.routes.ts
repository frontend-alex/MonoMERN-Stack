import { Router } from "express";
import { jwtMiddleware } from "@/middlewares/auth";
import { getUser } from "@/controllers/user/user.controller";
import { logout } from "@/controllers/auth/auth.controller";

const router = Router();

router.use(jwtMiddleware)

router.get('/me', getUser)
router.post('/logout', logout)
    
export { router as protectedAuthRoutes };