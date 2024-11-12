import { Course } from "../modules/index.js";
export const getCourse = async () => {
    try {
        const data = await Course.find();
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const getCourseByName = async (name) => {
    try {
        const data = await Course.findOne({ name });
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const createCourse = async (name, category_id, description) => {
    try {
        const data = await Course.findOne({ name });
        if (!data) {
            const course = new Course({
                name,
                category_id,
                description,
            });
            await course.save();
            return { msg: "created" };
        }
        throw new Error("Course is already created before");
    } catch (error) {
        return error.message;
    }
};
export const updateCourse = async (name, body) => {
    try {
        const course = await Course.findOneAndUpdate({ name }, body);
        if (!course) {
            throw new Error("Not found");
        }
        return { msg: "Updated", updatedCourse: course._id };
    } catch (error) {
        return error.message;
    }
};
export const deleteCourse = async (name) => {
    try {
        const course = await Course.findOneAndDelete({ name });
        if (!course) {
            throw new Error("Not found");
        }
        return { msg: "Deleted", deletedCourse: course._id };
    } catch (error) {
        return error.message;
    }
};
