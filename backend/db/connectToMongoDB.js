import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectToMongoDB = async () => {
    try {
       // console.log("Connecting to MongoDB with URI: ", process.env.MONGO_DB_URI);
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
    }
};

export default connectToMongoDB;
