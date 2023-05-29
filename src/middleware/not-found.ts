import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export default (req: Request, res: Response) =>
  res.status(StatusCodes.NOT_FOUND).json({ message: "route not found" });
