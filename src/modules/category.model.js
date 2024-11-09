import mongoose from "mongoose";
const categoryScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
});
export const Category = mongoose.model("category", categoryScheme);
