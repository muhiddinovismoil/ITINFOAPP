import { otpValidator } from "../validators/index.js";
export const validateOtp = (req, res, next) => {
    try {
        otpValidator.parse(req.body);
        next();
    } catch (error) {
        next(error);
    }
};
