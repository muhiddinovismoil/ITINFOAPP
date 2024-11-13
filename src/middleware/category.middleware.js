import { categoryValidator } from "../validators/index.js";
export const validateCategory = (req, res, next) => {
    try {
        categoryValidator.parse(req.body);
    } catch (error) {
        next(error);
    }
};
