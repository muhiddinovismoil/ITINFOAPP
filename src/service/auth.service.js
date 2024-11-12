import jwt from "jsonwebtoken";
import { User, OTP } from "../modules/index.js";
import { genSalt, hash } from "bcrypt";
