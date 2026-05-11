import { Router } from "express";
import { validatorRegisterUser } from "../validator/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const router = Router();



router.post("/regiter", validatorRegisterUser,register)
export default router;  