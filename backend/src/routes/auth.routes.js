import { Router } from "express";
import { validatorRegisterUser, validateLoginUser } from "../validator/auth.validator.js";
import { googleCallback, login, register } from "../controllers/auth.controller.js";
import passport from "passport";
import {config} from "../config/config.js";

const router = Router();



router.post("/register", validatorRegisterUser, register)

router.post("/login", validatorRegisterUser, login)

router.get("/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
)

router.get("/google/callback",
    passport.authenticate("google",
        {
            session: false,
            failureRedirect: config.Node_ENV === "development" ? "http://localhost:5173/login" : "/login"
        }),

    googleCallback,
)

export default router;  