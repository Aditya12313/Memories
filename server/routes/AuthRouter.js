import express from "express";
import { login, signup, googleLogin } from "../controllers/AuthController.js";
import { loginValidation, signupValidation } from "../Middleware/AuthValidation.js";
const router=express.Router();


router.post('/log-in',loginValidation,login)
router.post('/sign-up',signupValidation,signup)
router.post("/google-login", googleLogin);

export default router;