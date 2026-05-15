import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieparser from "cookie-parser";
dotenv.config();
import authRouter from "./routes/auth.routes.js";
const app = express();
import cors from "cors";
import connectDB from "./config/db.js";
import { config } from './config/config.js';

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessTOken, refreshToken, profile, done) => {
    return done (null , profile);
}
))






connectDB();
app.get("/", (req, res) => {
    res.status(200).json({ message: "server is running" });
})

app.use("/api/auth", authRouter);

export default app;