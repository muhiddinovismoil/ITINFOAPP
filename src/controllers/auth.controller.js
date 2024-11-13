import {
    statusCodes,
    errorMessages,
    ApiError,
    logger,
} from "../utils/index.js";
import {
    createAdmin,
    deleteAdmin,
    login,
    refresh,
    register,
    restorePassword,
    updateAdmin,
    verification,
} from "../service/index.js";

export const registerController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/register, Method: POST`);
        const { email, role } = req.body;
        const currentUser = await register(email, role, req.body);
        return res.status(statusCodes.CREATED).send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /auth/register, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const loginController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/login, Method: POST`);
        const { email, password } = req.body;

        const currentUser = await login(email, password);
        return res.send({
            accessToken: currentUser.access,
            refreshToken: currentUser.refresh,
        });
    } catch (error) {
        logger.error(
            `Route: /auth/login, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const refreshTokenController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/refreshToken, Method: POST`);
        const { token } = req.body;
        const refreshedTokens = await refresh(token);
        return res.send({
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
        });
    } catch (error) {
        logger.error(
            `Route: /auth/refreshToken, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};

export const adminController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/admin, Method: POST`);
        const { email } = req.body;
        const result = await createAdmin(email, req.body);
        return res.status(statusCodes.CREATED).send(result);
    } catch (error) {
        logger.error(
            `Route: /auth/admin, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
        logger.info(`Route: /auth/admin/${email}, Method: PUT`);
        let { password, newpassword, name, role } = req.body;
        const user = await updateAdmin(
            email,
            password,
            newpassword,
            name,
            role
        );
        res.status(statusCodes.OK).send(user);
    } catch (error) {
        logger.error(
            `Route: /auth/admin/${email}, Method: PUT,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode || 500, error.message));
    }
};
export const deleteAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
        logger.info(`Route: /auth/admin/${email}, Method: DELETE`);
        const users = await deleteAdmin(email);
        res.status(statusCodes.OK).send(users);
    } catch (error) {
        logger.error(
            `Route: /auth/admin/${email}, Method: DELETE,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};

export const verifyController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/admin/verify, Method: POST`);
        const { otp, email } = req.body;
        const verifyAcc = await verification(email, otp);
        res.status(statusCodes.OK).send(verifyAcc);
    } catch (error) {
        logger.error(
            `Route: /auth/admin/verify, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const forgetPasswordController = async (req, res, next) => {
    try {
        logger.info(`Route: /auth/admin/restore-password, Method: PUT`);
        const { email, newpassword, otp } = req.body;
        const currentUser = await restorePassword(email, newpassword, otp);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        logger.error(
            `Route: /auth/admin/restore-password, Method: PUT,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
