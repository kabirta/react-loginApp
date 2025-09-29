import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Updated CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Added port 5174
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.listen(port, () => {
    connectDb();
    console.log(`server started at ${port}`);
});