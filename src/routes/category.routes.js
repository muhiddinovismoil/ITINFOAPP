import { Router } from "express";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    updateCategoryController,
} from "../controllers/index.js";
import { authGuard, roleGuard, validateCategory } from "../middleware/index.js";
export const categoryRoutes = new Router();
categoryRoutes.get("/category", authGuard, getAllCategoryController);
categoryRoutes.post(
    "/category",
    validateCategory,
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    createCategoryController
);
categoryRoutes.put(
    "/category/:name",
    validateCategory,
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    updateCategoryController
);
categoryRoutes.delete(
    "/category/:name",
    authGuard,
    roleGuard(["user", "superAdmin"]),
    deleteCategoryController
);
