import {
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} from "../service/index.js";
import { statusCodes, ApiError, errorMessages } from "../utils/index.js";

export const getAllArticlesController = async (req, res, next) => {
    try {
        const data = await getArticle();
        res.status(statusCodes.OK).send({
            Articles: data,
        });
    } catch (error) {
        next(error);
    }
};
export const createArticlesController = async (req, res, next) => {
    try {
        const { title, content, author_id, category_id } = req.body;
        const data = await createArticle(
            title,
            content,
            author_id,
            category_id
        );
        res.status(200).send(data);
    } catch (error) {
        next(error);
    }
};
export const updateArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        const update = await updateArticle(title, req.body);
        res.status(statusCodes.OK).send(update);
    } catch (error) {
        next(error);
    }
};
export const deleteArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        const deleted = await deleteArticle(title);
        res.send(deleted);
    } catch (error) {
        next(error);
    }
};
