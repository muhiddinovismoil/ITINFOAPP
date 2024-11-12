import { generate } from "otp-generator";

export const otpGenerator = () => {
    return generate(6, { upperCaseAlphabets: true, specialChars: true });
};
