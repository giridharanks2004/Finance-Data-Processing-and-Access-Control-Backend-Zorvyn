import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const dbConnect = async () => {
    await mongoose.connect(process.env.DB_URI);

    console.log(`connected at ${mongoose.connection.host} at ${mongoose.connection.name}`)
}