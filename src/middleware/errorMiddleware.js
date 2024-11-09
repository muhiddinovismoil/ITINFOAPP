import { statusCodes, errorMessages } from "../utils/constants/index.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || statusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || errorMessages.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
