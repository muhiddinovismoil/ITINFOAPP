import mongoose from "mongoose";
import { hash, genSalt, compare } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await genSalt(10);
  const hashPassword = await hash(this.password, salt);
  this.password = hashPassword;
});


userSchema.method("compare", function (userPassword) {
  return compare(userPassword, this.password);
});

export const User = mongoose.model("user", userSchema);
