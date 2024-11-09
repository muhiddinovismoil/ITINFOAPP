import { Router } from "express";
import { loginController, registerController } from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";

export const authRouter = new Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get(
    "/me",
    authGuard,
    roleGuard(["admin", "moderator"]),
    (req, res) => {
        res.send("ok");
    }
);
