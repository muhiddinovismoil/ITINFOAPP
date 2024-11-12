import { Article } from "../modules/index.js";
export const getArticle = async () => {
    try {
        const data = await Article.find();
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const createArticle = async (title, content, author_id, category_id) => {
    try {
        if (!title || !content || !author_id || !category_id) {
            throw new Error("Values are not valid");
        }
        const data = await Article.findOne({ title });
        if (!data) {
            const article = new Article({
                title,
                content,
                author_id,
                category_id,
            });
            await article.save();
            return { msg: "created" };
        }
        throw new Error("Article is already created before");
    } catch (error) {
        return error.message;
    }
};
export const updateArticle = async (title, data) => {
    try {
        const article = await Article.findOneAndUpdate({ title }, data);
        if (!article) {
            throw new Error("Not found");
        }
        return { msg: "Updated", updatedArticle: article._id };
    } catch (error) {
        return error.message;
    }
};
export const deleteArticle = async (title) => {
    try {
        const article = await Article.findOneAndDelete({ title });
        if (!article) {
            throw new Error("Not found");
        }
        return { msg: "Deleted", deletedArticle: article._id };
    } catch (error) {
        return error.message;
    }
};
