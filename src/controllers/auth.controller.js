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
        const { email, role } = req.body;
        const currentUser = await register(email, role, req.body);
        return res.status(statusCodes.CREATED).send(currentUser);
    } catch (error) {
        console.log(error);
        next(new ApiError(error.statusCode, error.message));
    }
};
export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const currentUser = await login(email, password);
        return res.send({
            accessToken: currentUser.access,
            refreshToken: currentUser.refresh,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const refreshTokenController = async (req, res, next) => {
    try {
        const { token } = req.body;
        const refreshedTokens = await refresh(token);
        return res.send({
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};

export const adminController = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await createAdmin(email, req.body);
        return res.status(statusCodes.CREATED).send(result);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
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
        next(new ApiError(error.statusCode || 500, error.message));
    }
};
export const deleteAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
        const users = await deleteAdmin(email);
        res.status(statusCodes.OK).send(users);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};

export const verifyController = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        const verifyAcc = await verification(email, otp);
        res.status(statusCodes.OK).send(verifyAcc);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const forgetPasswordController = async (req, res, next) => {
    try {
        const { email, newpassword, otp } = req.body;
        const currentUser = await restorePassword(email, newpassword, otp);
        res.status(statusCodes.OK).send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
