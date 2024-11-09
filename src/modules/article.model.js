import mongoose, { Schema } from "mongoose";
const articleScheme = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const Article = mongoose.model("article", articleScheme);
