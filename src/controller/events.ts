import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import BadRequest from "../errors/bad-request";
import asyncWrapper from "../utils/async-wrapper";
import User from "../model/user";
import Unauthenticated from "../errors/unauthenticated";
import mongoose from "mongoose";
import Event from "../model/event";
import NotFound from "../errors/not-found";
import event from "../model/event";

export const getEvents = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new Unauthenticated("user not found, please register or login");
  }

  const events = await Event.find();

  res.status(StatusCodes.OK).json(events);
});

interface eventObjectType {
  uid: mongoose.Types.ObjectId;
  name: string;
  tagline: string;
  schedule: Date;
  description: string;
  image: string;
  moderator: string;
  category: string;
  subcategory: string;
  rigor_rank?: number;
  attendees: [string];
}

export const createEvent = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new Unauthenticated("user not found, please register or login");
  }

  const imageFile: UploadedFile | undefined = req.files?.image as UploadedFile;

  if (!imageFile) {
    throw new BadRequest("please provide image file");
  }

  const imagePath = path.join(__dirname, "../../images/" + `${imageFile.name}`);

  await imageFile.mv(imagePath);

  const eventObject: eventObjectType = {
    uid: user._id,
    name: req.body.name,
    tagline: req.body.tagline,
    schedule: req.body.schedule,
    description: req.body.description,
    image: imageFile.name,
    moderator: req.body.moderator,
    category: req.body.category,
    subcategory: req.body?.subcategory,
    attendees: req.body.attendees.split(","),
  };

  const event = await Event.create(eventObject);

  res.status(StatusCodes.CREATED).json(event);
});

export const updateEvent = asyncWrapper(async (req: Request, res: Response) => {
  const eventId = req.params.id;

  const {
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    subcategory,
    attendees,
    rigor_rank,
  } = req.body;

  const updatedEventObject: any = {};

  const userId = req.user?.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new Unauthenticated("user not found, please register or login");
  }

  const imageFile: UploadedFile | undefined = req.files?.image as UploadedFile;

  const imagePath = path.join(__dirname, "../../images/" + `${imageFile.name}`);

  await imageFile.mv(imagePath);

  if (imageFile) {
    updatedEventObject.image = imageFile.name;
  }

  if (name) {
    updatedEventObject.name = name;
  }

  if (tagline) {
    updatedEventObject.tagline = tagline;
  }

  if (schedule) {
    updatedEventObject.schedule = schedule;
  }

  if (description) {
    updatedEventObject.description = description;
  }

  if (moderator) {
    updatedEventObject.moderator = moderator;
  }

  if (category) {
    updatedEventObject.category = category;
  }

  if (subcategory) {
    updatedEventObject.subcategory = subcategory;
  }

  if (attendees) {
    updatedEventObject.attendees = attendees.split(",");
  }

  if (rigor_rank) {
    updatedEventObject.rigor_rank = rigor_rank;
  }

  const event = await Event.findByIdAndUpdate(eventId, updatedEventObject, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(event);
});

export const deleteEvent = asyncWrapper(async (req: Request, res: Response) => {
  const eventId = req.params.id;

  const deletedEvent = await Event.findByIdAndDelete(eventId);

  if (!deletedEvent) {
    throw new NotFound(`event with id ${eventId} not found`);
  }

  res.status(StatusCodes.OK).json({
    message: "deleted successfully",
  });
});