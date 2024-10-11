import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.MONGO_URL);
export const useDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
