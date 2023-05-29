import { Request, Response } from "express";
import BadRequest from "../errors/bad-request";
import User from "../model/user";
import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../utils/async-wrapper";
import Unauthenticated from "../errors/unauthenticated";
import NotFound from "../errors/not-found";

export const register = asyncWrapper(async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    throw new BadRequest("all fields are mandatory");
  }

  const user = await User.create({ username, name, email, password });
  res.status(StatusCodes.CREATED).json({
    message: "user created successfully",
    user: { name: user.name, username: user.username, email: user.email },
  });
});

interface reqObjectType {
  username?: string;
  email?: string;
}

interface UserDocument {
  username: string;
  password: string;
  name: string;
  email: string;
  comparePassword(password1: string, password2: string): boolean;
  createJWT(): string;
}

export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new BadRequest("please provide username or email");
  }

  if (!password) {
    throw new BadRequest("password cannot be empty");
  }

  const reqObject: reqObjectType = {};

  if (username) {
    reqObject.username = username;
  }
  if (email) {
    reqObject.email = email;
  }
  const user: UserDocument | null = await User.findOne(reqObject);

  if (!user) {
    throw new NotFound(
      "user not found, please register or provide correct credentials"
    );
  }

  const isPasswordCorrect = user.comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Unauthenticated("please check password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ username, email, token });
});
