import { User } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const userController = async (req, res, next) => {
    try {
        const payload = req.user;
        const currentUser = await User.find({ email: payload.sub });
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const getAllController = async (req, res, next) => {
    try {
        const payload = req.user;
        const currentUser = await User.find();
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const updateUserController = async (req, res, next) => {
    try {
        const payload = req.user;
        const email = req.params.email;
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        await User.updateOne(req.body);
        res.send({
            message: "Successfully Updated",
        });
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const deleteUserController = async (req, res, next) => {
    try {
        const payload = req.user;
        const  email  = req.params.email;
        const currentUser = await User.findOneAndDelete({ email: payload.sub });
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.send({
            message: "Deleted",
            deletedUser: currentUser,
        });
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
