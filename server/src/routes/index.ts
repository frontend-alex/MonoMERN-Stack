import { Router } from "express";
import { protectedAuthRoutes } from "./auth/private.routes";
import { publicAuthRoutes } from "./auth/public.routes";

const router = Router();

router.use('/auth', publicAuthRoutes)
router.use('/auth', protectedAuthRoutes)


export { router }