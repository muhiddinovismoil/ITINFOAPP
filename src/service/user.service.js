import { User } from "../modules/index.js";
export const getOneUser = async (payload) => {
    try {
        const currentUser = await User.find({ email: payload.sub });
        return currentUser;
    } catch (error) {
        return error.message;
    }
};
export const getUsers = async () => {
    try {
        const currentUser = await User.find();
        return currentUser;
    } catch (error) {
        return error.message;
    }
};
export const updateUser = async (email, body) => {
    try {
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            throw new Error("User not found");
        }
        await User.updateOne({ email }, body);
        return { msg: "Successfully Updated" };
    } catch (error) {
        return error.message;
    }
};
export const deleteUser = async (payload, email) => {
    try {
        const currentUser = await User.findOneAndDelete({ email: payload.sub });
        if (!currentUser) {
            throw new Error("User not found");
        }
        return { msg: "Successfully deleted" };
    } catch (error) {
        return error.message;
    }
};
