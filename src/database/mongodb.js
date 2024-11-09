import mongoose from "mongoose";
import { logger } from "../utils/index.js";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MONGODB CONNECTED!");
  } catch (error) {
    throw new Error(error);
  }
};
