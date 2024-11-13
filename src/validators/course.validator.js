import z from "zod";
export const courseValidator = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    category_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID" }),
    description: z
        .string()
        .min(5, { message: "Description must be at least 5 character" }),
});
