import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import BadRequest from "../errors/bad-request";
import asyncWrapper from "../utils/async-wrapper";

export const getEvents = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "get events route" });
};

export const createEvent = asyncWrapper(async (req: Request, res: Response) => {
  const imageFile: UploadedFile | undefined = req.files?.image as UploadedFile;

  if (!imageFile) {
    throw new BadRequest("please provide image file");
  }

  const imagePath = path.join(__dirname, "../../images/" + `${imageFile.name}`);

  await imageFile.mv(imagePath);

  res.status(StatusCodes.CREATED).json({ image: { src: `${imageFile.name}` } });
});

export const updateEvent = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "update event" });
};

export const deleteEvent = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ message: "delete events" });
};
