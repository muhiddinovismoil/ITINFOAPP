import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
    createCourseController,
    deleteCourseController,
    getAllCourseController,
    getByNameCourseController,
    updateCourseController,
} from "../controllers/index.js";
export const courseRouter = new Router();
courseRouter.get("/course/", authGuard, getAllCourseController);
courseRouter.post(
    "/course",
    authGuard,
    roleGuard(["user", "admin", "superAdmin"]),
    createCourseController
);
courseRouter.get("/course/:name", authGuard, getByNameCourseController);
courseRouter.put(
    "/course/:name",
    authGuard,
    roleGuard(["user", "admin", "superAdmin"]),
    updateCourseController
);
courseRouter.delete(
    "/course/:name",
    authGuard,
    roleGuard(["user", "superAdmin"]),
    deleteCourseController
);
