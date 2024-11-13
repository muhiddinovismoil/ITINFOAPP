import { User, OTP } from "../modules/index.js";
import { genSalt, hash } from "bcrypt";
import {
    otpGenerator,
    sendMail,
    generateAccessToken,
    generateRefreshToken,
    decodeToken,
} from "../helpers/index.js";
export const register = async (email, role, body) => {
    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            const otp = otpGenerator();
            sendMail(email, `OTP`, `This is your OTP: ${otp}`);
            const user = new User(body);
            await user.save();
            const db_otp = new OTP({
                user_id: user._id,
                otp_code: otp,
            });
            await db_otp.save();
            return { msg: "created" };
        }
        throw new Error({ msg: "Email is already exists" });
    } catch (error) {
        return error.messsage;
    }
};
export const login = async (email, password) => {
    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) throw new Error("User not found");
        if (currentUser.is_active === false) {
            throw new Error(
                "You cannot log in. Please confirm your email before accessing the system."
            );
        }
        const passwordIsEqual = await currentUser.compare(password);
        if (!passwordIsEqual) {
            throw new Error("Incorrect email or password");
        }
        const payload = {
            sub: email,
            role: currentUser.role,
        };
        const access = generateAccessToken(payload);
        const refresh = generateRefreshToken(payload);
        return { access, refresh };
    } catch (error) {
        console.error("Login Error:", error.message);
        throw new Error(error.message);
    }
};
export const refresh = async (token) => {
    try {
        const refreshed = await decodeToken(token);
        return refreshed;
    } catch (error) {
        return error.message;
    }
};
export const createAdmin = async (email, body) => {
    try {
        const users = await User.findOne({ email });
        if (!users) {
            const newAdmin = new User(body);
            await newAdmin.save();
            return { status: "success", msg: "Admin created successfully" };
        }
        throw new Error("Admin creation failed: User already exists");
    } catch (error) {
        throw new Error(error.message);
    }
};
export const updateAdmin = async (email, password, newpassword, name, role) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Not Found");
        if (role == "superAdmin")
            throw new Error("Cannot assign the SuperAdmin role");
        const passwordIsEqual = await user.compare(password);
        if (!passwordIsEqual)
            throw new Error(
                "Password is wrong or other problem with your value"
            );
        const salt = await genSalt(10);
        const updatedData = {
            password: newpassword
                ? await hash(newpassword, salt)
                : user.password,
            name: name || user.name,
            role: role || user.role,
        };
        await User.updateOne({ email }, updatedData);
        return { msg: "Updated successfully" };
    } catch (error) {
        return error.message;
    }
};
export const deleteAdmin = async (email) => {
    try {
        const users = await User.findOneAndDelete({ email });
        if (!users) throw new Error("Not found");
        return { msg: "Deleted", userId: users._id };
    } catch (error) {
        return error.message;
    }
};
export const verification = async (email, otp) => {
    try {
        const currentUser = await User.findOne({ email });
        const currentOtp = await OTP.findOne({ user_id: currentUser._id });
        const isEqual = currentOtp.verify(otp);
        if (!isEqual) throw new Error("OTP is not valid");
        await OTP.deleteOne({ user_id: currentUser._id });
        await User.updateOne({ email }, { is_active: true });
        return { msg: "User is activated now" };
    } catch (error) {
        return error.message;
    }
};
export const restorePassword = async (email, newpassword, otp) => {
    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) throw new Error("Not found");
        const salt = await genSalt(10);
        sendMail(
            email,
            `New Password`,
            `Here is your new passoword ${newpassword}`
        );
        const hashPassword = await hash(newpassword, salt);
        await User.updateOne({ email }, { password: hashPassword });
        return { msg: "Updated" };
    } catch (error) {
        return error.message;
    }
};
