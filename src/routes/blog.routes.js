import { Router } from "express";
import { blogController } from "../controllers/index.js";
import { authGuard } from "../middleware/auth.middleware.js";
import { roleGuard } from "../middleware/guard.middleware.js";

export const blogRouter = new Router();

blogRouter.get("/", blogController);
blogRouter.post("/", authGuard, roleGuard(["admin"]), blogController);
