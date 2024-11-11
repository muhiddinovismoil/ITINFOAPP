import mongoose, { Schema } from "mongoose";
const commentsScheme = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        article_id: {
            type: Schema.Types.ObjectId,
            ref: "article",
            required: true,
        },
        course_id: {
            type: Schema.Types.ObjectId,
            ref: "course",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const Comments = mongoose.model("comments", commentsScheme);
