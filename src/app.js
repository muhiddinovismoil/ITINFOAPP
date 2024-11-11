import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
// other modules
import {
    authRouter,
    blogRouter,
    userRouter,
    categoryRoutes,
    articleRoutes,
    commentRouter,
    courseRouter,
} from "./routes/index.js";

dotenv.config();

const app = express();
const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
});
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", articleRoutes);
app.use("/api/v1", commentRouter);
app.use("/api/v1", courseRouter);

app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).send(err.message);
    }
});

export default app;
