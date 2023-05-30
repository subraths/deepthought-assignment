import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import Unauthenticated from "../errors/unauthenticated";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

declare module "express" {
  interface Request {
    user?: {
      userId: string;
    };
  }
}

export default function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken) {
    throw new Unauthenticated(
      "please login or register before proceeding furthur"
    );
  }
  try {
    const payload = jwt.verify(authToken, JWT_SECRET) as JwtPayload;
    req.user = { userId: payload.userId };
  } catch (err) {
    throw new Unauthenticated("invalid user credentials");
  }
  next();
}
