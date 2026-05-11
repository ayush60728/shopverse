import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieparser from "cookie-parser";
dotenv.config();
import authRouter from "./routes/auth.routes.js";
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())

app.get("/", (req,res) => {
    res.status(200).json({message: "server is running"});
})

app.use("/api/auth", authRouter);

export default app ;