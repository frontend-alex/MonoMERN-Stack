import { Router } from "express";
import { jwtMiddleware } from "@/middlewares/auth";
import { getUser } from "@/controllers/user/user.controller";

const router = Router();

router.use(jwtMiddleware)

router.get('/me', getUser)
    
export { router as protectedAuthRoutes };