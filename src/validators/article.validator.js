import z from "zod";
export const articleValidator = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
    author_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid author ID" }),
    category_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID" }),
});
