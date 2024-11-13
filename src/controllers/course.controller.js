import {
    createCourse,
    deleteCourse,
    getCourse,
    getCourseByName,
    updateCourse,
} from "../service/index.js";
import {
    statusCodes,
    errorMessages,
    ApiError,
    logger,
} from "../utils/index.js";
export const getAllCourseController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/course, Method: GET`);
        const data = await getCourse();
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/course, Method: GET,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const getByNameCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        logger.info(`Route: /api/v1/course/${name}, Method: GET`);
        const data = await getCourseByName(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/course/${name}, Method: GET,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const createCourseController = async (req, res, next) => {
    try {
        logger.info(`Route: /api/v1/course, Method: POST`);
        const { name, category_id, description } = req.body;
        const data = await createCourse(name, category_id, description);
        return res.status(statusCodes.CONFLICT).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/course, Method: POST,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        logger.info(`Route: /api/v1/course/${name}, Method: PUT`);
        const data = await updateCourse(name, req.body);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/course/${name}, Method: PUT,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
export const deleteCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        logger.info(`Route: /api/v1/course/${name}, Method: DELETE`);
        const data = await deleteCourse(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        logger.error(
            `Route: /api/v1/course/${name}, Method: DELETE,Error: ${error.message}`
        );
        next(new ApiError(error.statusCode, error.message));
    }
};
