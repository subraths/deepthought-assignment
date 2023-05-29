import mongoose from "mongoose";

export default (uri: string) => mongoose.connect(uri);
