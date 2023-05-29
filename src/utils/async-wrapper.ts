import { Request, Response, NextFunction } from "express";

const asyncWrapper = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res);
    } catch (err: any) {
      next(err);
    }
  };
};

export default asyncWrapper;
