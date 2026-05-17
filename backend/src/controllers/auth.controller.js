import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "lax",
    });

    res.status(200).json({
        message,
        token,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role,
        },
    });
}

// REGISTER
export const register = async (req, res) => {
    try {
        const { email, contact, password, fullname, isSeller } = req.body;

        const existingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User with this email or contact already exists",
            });
        }

        const user = await userModel.create({
            email,
            contact,
            password,
            fullname,
            role: isSeller ? "seller" : "buyer",
        });

        await sendTokenResponse(
            user,
            res,
            "User registered successfully"
        );
    } catch (error) {
        console.log("Register Error:", error);

        res.status(500).json({
            message: "Error occurred while registering user",
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        await sendTokenResponse(
            user,
            res,
            "User logged in successfully"
        );
    } catch (error) {
        console.log("Login Error:", error);

        res.status(500).json({
            message: "Login failed",
        });
    }
};

// GOOGLE CALLBACK
export const googleCallback = async (req, res) => {
    try {
        console.log(req.user);

        const { id, displayName, emails, photos } = req.user;

        const email = emails[0].value;
        const profilePic = photos[0].value;

        let user = await userModel.findOne({ email });

        // Create user if not exists
        if (!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullname: displayName,
                profilePic,
                role: "buyer",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            config.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
        });

        res.redirect("http://localhost:5173/");
    } catch (error) {
        console.log("Google Auth Error:", error);

        res.status(500).json({
            message: "Google authentication failed",
        });
    }
};