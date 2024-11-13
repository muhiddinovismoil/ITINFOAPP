import jwt from "jsonwebtoken";
import { userValidator } from "../validators/index.js";
import { logger } from "../utils/winstonLogger.js";
export const authGuard = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(409).send("token not found");
        }

        const [type, token] = req.headers.authorization?.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(409).send("Not valid data");
        }

        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
            if (err) {
                return res.status(403).send("Forbidden");
            }
            req.user = payload;
            console.log(payload);

            next();
        });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
export const validateUser = (req, res, next) => {
    try {
        userValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
