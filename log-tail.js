import { Logtail } from "@logtail/node";
import { config } from "dotenv";
config();

const logtail = new Logtail(process.env.LOGGER_TOKEN);

logtail.error("Something bad happend.");
logtail.info("Log message with structured.", {
    item: "Orange Soda",
    price: 100.0,
});
logtail.flush();
