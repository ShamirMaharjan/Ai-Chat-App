import express from 'express';
import dotenv from 'dotenv';
import { db_connection } from './lib/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
import aiRoute from './routes/ai.route.js';
import morgan from 'morgan';
import redisClient from './lib/redis.js';
import groupRoute from './routes/group.route.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';
dotenv.config();


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]

}));

//console.log(process.env.GOOGLE_AI_KEY);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoute);
app.use("/api/group", groupRoute);
app.use("/api/ai", aiRoute);
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    db_connection();
    redisClient.on("connect", () => {
        console.log("Connected to Redis");
    });
});