import { Category } from "../modules/index.js";
export const getCategory = async () => {
    try {
        const data = await Category.find();
        if (!data) {
            throw new Error("Not found");
        }
        return data;
    } catch (error) {
        return error.message;
    }
};
export const createCategory = async (name, description) => {
    try {
        if (!name || !description) {
            throw new Error("Values are not valid");
        }
        const data = await Category.findOne({ name });
        if (!data) {
            const category = new Category({
                name,
                description,
            });
            await category.save();
            return { msg: "created" };
        }
        throw new Error("Categiry is already created before");
    } catch (error) {
        return error.message;
    }
};
export const updateCategory = async (name, body) => {
    try {
        const catogry = await Category.findOneAndUpdate({ name }, body);
        if (!catogry) {
            throw new Error("Not found");
        }
        return { msg: "Updated", updatedCategory: catogry._id };
    } catch (error) {
        return error.message;
    }
};
export const deleteCategory = async (name) => {
    try {
        const category = await Category.findOneAndDelete({ name });
        if (!category) {
            throw new Error("Not found");
        }
        return { msg: "Deleted", deletedCategory: category._id };
    } catch (error) {
        return error.message;
    }
};
