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
    "/course/new",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    createCourseController
);
courseRouter.get("/course/:name", authGuard, getByNameCourseController);
courseRouter.put(
    "/course/:name",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    updateCourseController
);
courseRouter.delete(
    "/course/:name",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteCourseController
);
