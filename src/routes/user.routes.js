import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
    userController,
    getAllController,
    updateUserController,
    deleteUserController,
} from "../controllers/index.js";

export const userRouter = new Router();

userRouter.post(
    "/profile",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    userController
);
userRouter.get("/profile/all", authGuard, getAllController);
userRouter.put(
    "/profile/:email",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    updateUserController
);
userRouter.delete(
    "/profile/:email",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteUserController
);
