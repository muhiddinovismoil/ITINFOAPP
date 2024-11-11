import mongoose, { Schema } from "mongoose";
const courseScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export const Course = mongoose.model("course", courseScheme);
