import { Comments } from "../modules/index.js";
export const getComments = async () => {
    try {
        const data = await Comments.find();
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const getCommentByContent = async (content) => {
    try {
        const data = await Comments.findOne({ content });
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const createComment = async (
    content,
    commentitems,
    course_id,
    article_id
) => {
    try {
        const data = await Comments.findOne({ content });
        if (!data) {
            const comment = new Comments({
                content,
                commentitems,
                course_id,
                article_id,
            });
            await comment.save();
            return { msg: "created" };
        }
        throw new Error("Comment is already created before");
    } catch (error) {
        return error.message;
    }
};

export const updateComment = async (content, body) => {
    try {
        const data = await Comments.findOneAndUpdate({ content }, body);
        if (!data) {
            throw new Error("Not found");
        }
        return { msg: "Updated", updatedComment: data._id };
    } catch (error) {
        return error.message;
    }
};
export const deleteComment = async (content) => {
    try {
        const comment = await Comments.findOneAndDelete({ content });
        if (!comment) {
            throw new Error("Not found");
        }
        return { msg: "Deleted", deletedComment: comment._id };
    } catch (error) {
        return error.message;
    }
};
