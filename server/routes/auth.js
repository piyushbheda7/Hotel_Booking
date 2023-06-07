import express from "express" 
import { login, register } from "../controllers/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router() ;

router.post("/register" ,[
    body('email').isEmail(),
    body('password').isStrongPassword(),
    body('number').isMobilePhone()
], register)
router.post("/login" , login)

export default router