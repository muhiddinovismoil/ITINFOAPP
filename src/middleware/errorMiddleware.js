import { statusCodes, errorMessages } from "../utils/constants/index.js";
import { logger } from "../utils/winstonLogger.js";

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || errorMessages.INTERNAL_SERVER_ERROR;
    logger.error(err);
    res.status(statusCode).json({
        success: false,
        message,
    });
};
