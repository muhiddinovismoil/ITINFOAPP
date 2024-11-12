import {
    createCourse,
    deleteCourse,
    getCourse,
    getCourseByName,
    updateCourse,
} from "../service/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const getAllCourseController = async (req, res, next) => {
    try {
        const data = await getCourse();
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const getByNameCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await getCourseByName(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const createCourseController = async (req, res, next) => {
    try {
        const { name, category_id, description } = req.body;
        const data = await createCourse(name, category_id, description);
        return res.status(statusCodes.CONFLICT).send(data);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await updateCourse(name, req.body);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const deleteCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await deleteCourse(name);
        res.status(statusCodes.OK).send(data);
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
