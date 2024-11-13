import { commentsValidator } from "../validators/index.js";
export const validateComments = (req, res, next) => {
    try {
        commentsValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
