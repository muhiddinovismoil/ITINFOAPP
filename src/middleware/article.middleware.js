import { articleValidator } from "../validators/index.js";
export const validateArticle = (req, res, next) => {
    try {
        articleValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
