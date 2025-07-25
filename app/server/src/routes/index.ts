import { Router } from "express";
import { publicAuthRoutes } from "./auth/public.routes";
import { protectedAuthRoutes } from "./auth/private.routes";

const router = Router();

router.use('/auth', publicAuthRoutes)
router.use('/auth', protectedAuthRoutes)


export { router }