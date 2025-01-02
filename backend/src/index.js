import express from 'express';
import dotenv from 'dotenv';
import { db_connection } from './lib/db.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js';
import aiRoute from './routes/ai.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

//console.log(process.env.GOOGLE_AI_KEY);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoute);
app.use("/api/ai", aiRoute);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    db_connection();
});