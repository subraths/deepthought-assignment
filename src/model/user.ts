import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

const User = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    immutable: true,
    maxLength: 20,
    minLength: 1,
    required: [true, "must provide username"],
  },
  name: {
    type: String,
    maxLength: 20,
    minLength: 3,
    required: [true, "name cannot be empty"],
  },
  email: {
    type: String,
    unique: [true, "email already in use"],
    required: [true, "must provide email"],
  },
  password: {
    type: String,
    required: [true, "password field cannot be empty"],
  },
});

User.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

User.methods.comparePassword = async function (
  password1: string,
  password2: string
) {
  const isMatch = await bcrypt.compare(password1, password2);
  return isMatch;
};

User.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET, { expiresIn: "10d" });
};

export default mongoose.model("User", User);
