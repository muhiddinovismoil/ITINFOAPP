import z from "zod";
export const userValidator = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().optional(),
    role: z.enum(["user", "admin", "superAdmin"]).default("user"),
    is_active: z.boolean().default(false),
});
