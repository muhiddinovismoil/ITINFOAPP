import z from "zod";
export const otpValidator = z.object({
    user_id: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID" }),
    otp_code: z.string().min(1, { message: "OTP CODE IS REQUIRED" }),
    expires_at: z.date().optional(),
});
