import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";

import connectDB from "./utils/db";
import notFound from "./middleware/not-found";
import errorHandler from "./middleware/errorhandler";

import eventsRouter from "./routes/events";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.URI || "";

app.use(express.static("images"));
app.use(express.json());
app.use(fileUpload());

app.use("/api/v3/app", authRouter);
app.use("/api/v3/app/events", eventsRouter);

app.use(errorHandler);
app.use(notFound);

const connect = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connect();
