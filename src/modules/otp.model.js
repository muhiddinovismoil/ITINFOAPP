import mongoose, { Schema } from "mongoose";
const otpScheme = new mongoose.Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        otp_code: {
            type: String,
            required: true,
        },
        expires_at: {
            type: Date,
            default: new Date(Date.now() + 60 * 15 * 1000),
        },
    },
    {
        timestamps: true,
    }
);
otpScheme.method("verify", function (userOtp) {
    return userOtp == this.otp_code;
});
export const OTP = mongoose.model("otp", otpScheme);
