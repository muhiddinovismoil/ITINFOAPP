import { Course } from "../modules/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const getAllCourseController = async (req, res, next) => {
    try {
        const data = await Course.find();
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.NOT_FOUND);
        }
        return res.status(statusCodes.OK).send({
            message: "All courses",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const getByNameCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await Course.findOne({ name });
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Course data",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const createCourseController = async (req, res, next) => {
    try {
        const name = req.body.name;
        const data = await Course.findOne({ name });
        if (!data) {
            const newData = new Course(req.body);
            await newData.save();
            return res.status(statusCodes.OK).send({
                message: "Course created",
            });
        }
        return res.status(statusCodes.CONFLICT).send("sdfasdfas");
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const updateCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await Course.findOneAndUpdate({ name }, req.body);
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Course updated",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
export const deleteCourseController = async (req, res, next) => {
    try {
        const name = req.params.name;
        const data = await Course.findOneAndDelete({ name });
        if (!data) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.NOT_FOUND);
        }
        res.status(statusCodes.OK).send({
            message: "Course deleted",
            data: data,
        });
    } catch (error) {
        next(new ApiError(error.statusCode, error.message));
    }
};
