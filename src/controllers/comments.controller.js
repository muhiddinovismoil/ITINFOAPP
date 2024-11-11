import { Comments } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const getAllCommentsController = async (req, res, next) => {
    try {
        const data = await Comments.find();
        if (!data) {
            return res
                .status(statusCodes.NO_CONTENT)
                .send(errorMessages.NOT_FOUND);
        }
        return res.status(statusCodes.OK).send({
            message: "All courses",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const getByContentCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        const data = await Comments.findOne({ content });
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.NOT_FOUND);
        }
        return res.status(statusCodes.OK).send({
            message: "Course data",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const createCommentController = async (req, res, next) => {
    try {
        const content = req.body.content;
        const data = await Comments.findOne({ content });
        if (!data) {
            const newComment = new Comments(req.body);
            await newComment.save();
            return res.status(statusCodes.CREATED).send("created");
        }
        return res
            .status(statusCodes.BAD_REQUEST)
            .send("Not created with some issue");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        const data = await Comments.findOneAndUpdate({ content }, req.body);
        if (!data) {
            return res
                .status(statusCodes.NO_CONTENT)
                .send(errorMessages.NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Comment updated",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const deleteCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        const data = await Comments.findOneAndDelete({ content });
        if (!data) {
            return res
                .status(statusCodes.NO_CONTENT)
                .send(errorMessages.NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Comment deleted",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
