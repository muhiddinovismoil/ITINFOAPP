import {
    createComment,
    deleteComment,
    getCommentByContent,
    getComments,
    updateComment,
} from "../service/index.js";
import {
    statusCodes,
    errorMessages,
    ApiError,
    logger,
} from "../utils/index.js";
export const getAllCommentsController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/comments, Method: GET`);
        const data = await getComments();
        return res.status(statusCodes.OK).send({
            message: "All courses",
            Comments: data,
        });
    } catch (error) {
        logger.error(
            `Route: /api/v1/comments, Method: GET,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const getByContentCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        logger.info(`Route: /api/v1/comments/${content}, Method: GET`);
        const data = await getCommentByContent(content);
        return res.status(statusCodes.OK).send({
            message: "Comment",
            data: data,
        });
    } catch (error) {
        logger.error(
            `Route: /api/v1/comments/${content}, Method: GET,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const createCommentController = async (req, res, next) => {
    try {
        const { content, course_id, article_id } = req.body;
        const commentitems = req.body;
        logger.info(`Route: /api/v1/comments, Method: POST`);
        const data = await createComment(
            content,
            commentitems,
            course_id,
            article_id
        );
        res.send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/comments, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        logger.info(`Route: /api/v1/comments/${content}, Method: PUT`);
        const data = await updateComment(content, req.body);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/comments/${content}, Method: PUT,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const deleteCommentController = async (req, res, next) => {
    try {
        const content = req.params.content;
        logger.info(`Route: /api/v1/comments/${content}, Method: DELETE`);
        const data = await deleteComment(content);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/comments/${content}, Method: DELETE,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
