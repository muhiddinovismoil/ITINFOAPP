import { Router } from "express";
import {
    adminController,
    deleteAdminController,
    forgetPasswordController,
    loginController,
    refreshTokenController,
    registerController,
    updateAdminController,
    verifyController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";
export const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/verify", verifyController);
// TO REFRESH YOUR ACCESS TOKEN
authRouter.post("/refreshToken", refreshTokenController);
// TO ADD NEW ADMIN
authRouter.post(
    "/admin",
    authGuard,
    roleGuard(["superAdmin"]),
    adminController
);
// TO UPDATE ADMIN
authRouter.put(
    "/admin/:email",
    authGuard,
    roleGuard(["superAdmin"]),
    updateAdminController
);
// TO DELETE ADMIN
authRouter.delete(
    "/admin/:email",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteAdminController
);
authRouter.put("/restore-password", forgetPasswordController);
