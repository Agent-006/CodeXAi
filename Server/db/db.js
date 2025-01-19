import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function dbConnect() {
    try {
        const isConnected = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            `Connected to the database: ${isConnected.connection.host}/${isConnected.connection.name}`
        );
    } catch (error) {
        console.log("Failed to connect to the database", error);
        process.exit(1);
    }
}

export default dbConnect;
