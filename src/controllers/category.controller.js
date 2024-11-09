import { Category } from "../modules/index.js";
import { errorMessages, statusCodes, ApiError } from "../utils/index.js";

export const getAllCategoryController = async (req, res, next) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};
export const createCategoryController = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const data = await Category.findOne({ name });
        if (!name || !description) {
            return res
                .status(statusCodes.NO_CONTENT)
                .send("Values are not valid");
        }
        if (!data) {
            const category = new Category(req.body);
            await category.save();
            return res.status(statusCodes.CREATED).send("created");
        }
        return res
            .status(statusCodes.CONFLICT)
            .send(errorMessages.INVALID_CATEGORY_DATA);
    } catch (error) {
        next(error);
    }
};
export const updateCategoryController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await Category.findOneAndUpdate({ name }, req.body);
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.status(statusCodes.OK).send("updated");
    } catch (error) {
        next(error);
    }
};
export const deleteCategoryController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await Category.findOneAndDelete({ name });
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.status(statusCodes.OK).send("deleted");
    } catch (error) {
        next(error);
    }
};
