import jwt from "jsonwebtoken";
import { User, OTP } from "../modules/index.js";
import { genSalt, hash } from "bcrypt";
import {
    statusCodes,
    errorMessages,
    ApiError,
    logger,
} from "../utils/index.js";
import { otpGenerator, sendMail } from "../helpers/index.js";

export const registerController = async (req, res, next) => {
    try {
        const { email, role } = req.body;
        const currentUser = await User.findOne({ email });

        if (!currentUser) {
            const otp = otpGenerator();
            sendMail(email, `otp","this is your OTP:`, otp);
            const user = new User(req.body);
            await user.save();
            const db_otp = new OTP({
                user_id: user._id,
                otp_code: otp,
            });
            await db_otp.save();
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
        if (currentUser.is_active == false) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .send("You are not able to login");
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

export const verifyController = async (req, res, next) => {
    try {
        const { otp, email } = req.body;
        const currentUser = await User.findOne({ email });
        const currentOtp = await OTP.findOne({ user_id: currentUser._id });
        const isEqual = currentOtp.verify(otp);
        if (!isEqual) {
            return res.send("OTP is not valid");
        }
        await OTP.deleteOne({ user_id: currentUser._id });
        await User.updateOne({ email }, { is_active: true });
        res.send("User is activated");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const forgetPasswordController = async (req, res, next) => {
    try {
        const { email, newpassword, otp } = req.body;
        const currentUser = await User.findOne({ email });
        if (!currentUser) return res.status(404).send("Not found");
        const salt = await genSalt(10);
        sendMail(
            email,
            `New Password`,
            `Here is your new password: ${newpassword}`
        );
        const hashPassword = await hash(newpassword, salt);
        await User.updateOne(
            { email },
            {
                password: hashPassword,
            }
        );
        res.status(statusCodes.OK).send("Updated");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
