import { Router } from "express";
import {
    getAllArticlesController,
    createArticlesController,
    updateArticlesController,
    deleteArticlesController,
} from "../controllers/index.js";
import { authGuard, roleGuard } from "../middleware/index.js";
export const articleRoutes = new Router();
articleRoutes.get("/article", authGuard, getAllArticlesController);
articleRoutes.post(
    "/article",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    createArticlesController
);
articleRoutes.put(
    "/article/:title",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    updateArticlesController
);
articleRoutes.delete(
    "/article/:title",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteArticlesController
);
