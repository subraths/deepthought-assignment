import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import NotFound from "../errors/not-found";

export default async function userExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      throw new NotFound("user not found");
    }
    next();
  } catch (err) {
    throw new NotFound("user not found");
  }
}
