import { courseValidator } from "../validators/index.js";
export const validateCourse = (req, res, next) => {
    try {
        courseValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
