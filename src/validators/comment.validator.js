import z from "zod";
export const commentsValidator = z.object({
    content: z.string().min(5, {
        message: "Comment content must contain at least 5 character",
    }),
    article_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid article ID" }),
    course_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid course ID" }),
});
