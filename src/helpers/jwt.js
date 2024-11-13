import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const generateAccessToken = (payload) => {
    const access = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    return access;
};

export const generateRefreshToken = (payload) => {
    const refresh = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return refresh;
};
export const decodeToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    reject(new Error("Token has expired"));
                } else {
                    reject(new Error("FORBIDDEN: " + error.message));
                }
            } else {
                const accessToken = generateAccessToken({
                    sub: decoded.sub,
                    role: decoded.role,
                });
                resolve({ accessToken, refreshToken: token });
            }
        });
    });
};
