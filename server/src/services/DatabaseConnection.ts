import mongoose from "mongoose";
import { MONGO_URI } from "../config/config";
export const connectDatabase = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MONGODB Connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
