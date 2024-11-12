import { User } from "../modules/index.js";
import {
    deleteUser,
    getOneUser,
    getUsers,
    updateUser,
} from "../service/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const userController = async (req, res, next) => {
    try {
        const payload = req.user;
        const currentUser = await getOneUser(payload);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const getAllController = async (req, res, next) => {
    try {
        const currentUser = await getUsers(payload);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const updateUserController = async (req, res, next) => {
    try {
        const email = req.params.email;
        const currentUser = await updateUser(email, req.body);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const deleteUserController = async (req, res, next) => {
    try {
        const payload = req.user;
        const email = req.params.email;
        const currentUser = await deleteUser(payload, email);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
