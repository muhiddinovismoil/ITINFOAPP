import {
    createCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from "../service/index.js";
import {
    errorMessages,
    statusCodes,
    ApiError,
    logger,
} from "../utils/index.js";

export const getAllCategoryController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/category, Method: GET`);
        const categories = await getCategory();
        res.status(statusCodes.OK).send(categories);
    } catch (error) {
        logger.error(
            `Route: /api/v1/category, Method: GET,Error: ${error.message}`
        );
        next(error);
    }
};
export const createCategoryController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/category, Method: POST`);
        const { name, description } = req.body;
        const data = await createCategory(name, description);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/category, Method: POST,Error: ${error.message}`
        );
        next(error);
    }
};
export const updateCategoryController = async (req, res, next) => {
    try {
        const name = req.params.name;
        logger.info(`Route: /api/v1/category/${name}, Method: PUT`);
        const data = await updateCategory(name, req.body);
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        res.status(statusCodes.OK).send("updated");
    } catch (error) {
        logger.error(
            `Route: /api/v1/category/:name, Method: PUT,Error: ${error.message}`
        );
        next(error);
    }
};
export const deleteCategoryController = async (req, res, next) => {
    try {
        const name = req.params.name;
        logger.info(`Route: /api/v1/category/${name}, Method: DELETE`);
        const data = await deleteCategory(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/category/:name, Method: DELETE,Error: ${error.message}`
        );
        next(error);
    }
};
