import jwt from "jsonwebtoken";
import { User } from "../modules/index.js";
import { genSalt, hash } from "bcrypt";
import {
    statusCodes,
    errorMessages,
    ApiError,
    logger,
} from "../utils/index.js";

export const registerController = async (req, res, next) => {
    try {
        const { email, role } = req.body;
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            const user = new User(req.body);
            await user.save();
            return res.status(statusCodes.CREATED).send("created");
        }
        return res
            .status(statusCodes.CONFLICT)
            .send(errorMessages.EMAIL_ALREADY_EXISTS);
    } catch (error) {
        console.log(error);
        next(new ApiError(error.statusCode, error.message));
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }

        const passwordIsEqual = await currentUser.compare(password);

        if (!passwordIsEqual) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .send(errorMessages.INVALID_CREDENTIALS);
        }

        const payload = {
            sub: email,
            role: currentUser.role,
        };

        const accessSecretKey = process.env.JWT_ACCESS_SECRET;
        const refreshSecretKey = process.env.JWT_REFRESH_SECRET;

        const accessToken = jwt.sign(payload, accessSecretKey, {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
        });

        const refreshToken = jwt.sign(payload, refreshSecretKey, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        return res.send({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const refreshTokenController = async (req, res, next) => {
    try {
        const { token } = req.body;
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (error, decode) => {
            if (error)
                throw new Error(statusCodes.FORBIDDEN, errorMessages.FORBIDDEN);
            logger.info({ decode });
            const accessToken = jwt.sign(
                {
                    sub: decode.sub,
                    role: decode.role,
                },
                process.env.JWT_ACCESS_SECRET,
                {
                    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
                }
            );
            return res.send({ accessToken, refreshToken: token });
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const adminController = async (req, res, next) => {
    try {
        const { email } = req.body;
        const users = await User.findOne({ email });
        if (!users) {
            const newAdmin = new User(req.body);
            await newAdmin.save();
            return res.send("created");
        }
        return res.send("Cannot created");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
        let { password, newpassword, name, role } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        if (role === "superAdmin") {
            return res
                .status(statusCodes.INVALID_USER_DATA)
                .send("Cannot assign the superAdmin role.");
        }
        const passwordIsEqual = await user.compare(password);
        console.log(passwordIsEqual);
        if (!passwordIsEqual) {
            return res
                .status(statusCodes.UNAUTHORIZED)
                .send(errorMessages.INVALID_USER_DATA);
        }
        const solt = await genSalt(10);
        const updatedData = {
            password: newpassword
                ? await hash(newpassword, solt)
                : user.password,
            name: name || user.name,
            role: role || user.role,
        };
        await User.updateOne({ email }, updatedData);
        res.status(statusCodes.OK).send("Updated successfully");
    } catch (error) {
        next(new ApiError(error.statusCode || 500, error.message));
    }
};
export const deleteAdminController = async (req, res, next) => {
    try {
        const email = req.params.email;
        const users = await User.findOneAndDelete({ email });
        if (!users) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.status(statusCodes.OK).send("deleted");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
