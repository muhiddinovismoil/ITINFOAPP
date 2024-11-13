import {
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../service/index.js";
import {
    statusCodes,
    ApiError,
    errorMessages,
    logger,
} from "../utils/index.js";

export const getAllArticlesController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/article, Method: GET`);
        const data = await getArticle();
        res.status(statusCodes.OK).send({
            Articles: data,
        });
    } catch (error) {
        logger.error(
            `Route: /api/v1/article, Method: GET,Error: ${error.message}`
        );
        next(error);
    }
};
export const createArticlesController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/article, Method: POST`);
        const { title, content, author_id, category_id } = req.body;
        const data = await createArticle(
            title,
            content,
            author_id,
            category_id
        );
        res.status(200).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/article, Method: POST,Error: ${error.message}`
        );
        next(error);
    }
};
export const updateArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        logger.info(`Route: /api/v1/article/${title}, Method: PUT`);
        const update = await updateArticle(title, req.body);
        res.status(statusCodes.OK).send(update);
    } catch (error) {
        logger.error(
            `Route: /api/v1/article${title}, Method: PUT,Error: ${error.message}`
        );
        next(error);
    }
};
export const deleteArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        logger.info(`Route: /api/v1/article/${title}, Method: DELETE`);
        const deleted = await deleteArticle(title);
        res.send(deleted);
    } catch (error) {
        logger.error(
            `Route: /api/v1/article/${title}, Method: DELETE,Error: ${error.message}`
        );
        next(error);
    }
};
