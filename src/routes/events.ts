import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controller/events";

const router = Router();

router.route("/").get(getEvents).post(createEvent);

router.route("/:id").put(updateEvent).delete(deleteEvent);

export default router;
