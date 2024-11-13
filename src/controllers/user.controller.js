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
        logger.info(`Route: /api/v1/profile, Method: POST`);
        const payload = req.user;
        const currentUser = await getOneUser(payload);
        res.send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /api/v1/profile, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const getAllController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/profile/all, Method: GET`);
        const currentUser = await getUsers(payload);
        res.send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /api/v1/profile/all, Method: GET,Error: ${error.message}`
        );
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const updateUserController = async (req, res, next) => {
    try {
        const email = req.params.email;
        logger.info(`Route: /api/v1/profile/${email}, Method: PUT`);
        const currentUser = await updateUser(email, req.body);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /api/v1/profile/${email}, Method: PUT,Error: ${error.message}`
        );
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const deleteUserController = async (req, res, next) => {
    try {
        const payload = req.user;
        const email = req.params.email;
        logger.info(`Route: /api/v1/profile/${email}, Method: DELETE`);
        const currentUser = await deleteUser(payload, email);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /api/v1/profile/${email}, Method: DELETE,Error: ${error.message}`
        );
        next(new ApiError(error.statusCodes, error.message));
    }
};
