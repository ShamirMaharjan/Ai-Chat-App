import mongoose from "mongoose";

export const db_connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected: ${con.connection.host}`);

    } catch (error) {
        console.log(error);
        console.log("Database connection failed");

    }
}