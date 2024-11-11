import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
    createCommentController,
    deleteCommentController,
    getAllCommentsController,
    getByContentCommentController,
    updateCommentController,
} from "../controllers/index.js";
export const commentRouter = new Router();
commentRouter.get("/comments", authGuard, getAllCommentsController);
commentRouter.get(
    "/comments/:content",
    authGuard,
    getByContentCommentController
);
commentRouter.post(
    "/comments",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    createCommentController
);
commentRouter.put(
    "/comments/:content",
    authGuard,
    roleGuard(["admin", "superAdmin"]),
    updateCommentController
);
commentRouter.delete(
    "/comments/:content",
    authGuard,
    roleGuard(["superAdmin"]),
    deleteCommentController
);
