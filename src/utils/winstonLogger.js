import { createLogger, format, transports } from "winston";
import { config } from "dotenv";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
// import { level } from "winston";
config();
const logtail = new Logtail(process.env.LOGGER_TOKEN);
export const logger = createLogger({
    level: "silly",
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.colorize({ all: true })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "application.log" }),
        new LogtailTransport(logtail),
    ],
});
if (process.env.NODE_) {
    logger.remove.Console();
}
// logger.error("This is an error message");
// logger.warn("This is a warning message");
// logger.info("This is an info message");
// logger.verbose("This is a verbose  message");
// logger.debug("This is a debug message");
// logger.silly("This is a silly message");
