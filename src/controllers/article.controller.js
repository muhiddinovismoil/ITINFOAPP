import { Article } from "../modules/index.js";
import { statusCodes, ApiError, errorMessages } from "../utils/index.js";

export const getAllArticlesController = async (req, res, next) => {
    try {
        const data = await Article.find();
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.ARTICLE_NOT_FOUND);
        }
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
        const data = await Article.findOne({ title });
        if (!title || !content || !author_id || !category_id) {
            return res
                .status(statusCodes.NO_CONTENT)
                .send("Values are not valid");
        }
        if (!data) {
            const article = new Article(req.body);
            await article.save();
            return res.status(statusCodes.CREATED).send("created");
        }
        return res
            .status(statusCodes.CONFLICT)
            .send(errorMessages.INVALID_CATEGORY_DATA);
    } catch (error) {
        next(error);
    }
};
export const updateArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        const data = await Article.findOneAndUpdate({ title }, req.body);
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.ARTICLE_NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Updated",
            Article: data,
        });
    } catch (error) {
        next(error);
    }
};
export const deleteArticlesController = async (req, res, next) => {
    try {
        const title = req.params.title;
        const data = await Article.findOneAndDelete({ title }, req.body);
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.ARTICLE_NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Deleted",
            Article: data,
        });
    } catch (error) {
        next(error);
    }
};
