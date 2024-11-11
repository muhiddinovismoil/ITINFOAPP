import { Router } from "express";
import {
    adminController,
    deleteAdminController,
    loginController,
    refreshTokenController,
    registerController,
    updateAdminController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";
export const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refreshToken", refreshTokenController);
authRouter.post(
    "/admin",
    authGuard,
    roleGuard(["superAdmin"]),
    adminController
);
authRouter.put(
    "/admin/:email",
    authGuard,
    roleGuard(["superAdmin"]),
    updateAdminController
);
authRouter.delete(
    "/admin/:email",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteAdminController
);
