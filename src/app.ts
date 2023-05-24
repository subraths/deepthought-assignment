import express from "express";
import dotenv from "dotenv";
import router from "./routes/router";
import "express-async-errors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/v3/app/events", router);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
