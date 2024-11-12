import {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from "../service/index.js";
import { errorMessages, statusCodes, ApiError } from "../utils/index.js";

export const getAllCategoryController = async (req, res, next) => {
    try {
        const categories = await getCategory();
        res.status(statusCodes.OK).send(categories);
    } catch (error) {
        next(error);
    }
};
export const createCategoryController = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const data = await createCategory(name, description);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(error);
    }
};
export const updateCategoryController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await updateCategory(name, req.body);
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
        const data = await deleteCategory(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(error);
    }
};
