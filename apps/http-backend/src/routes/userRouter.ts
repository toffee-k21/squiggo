import express, { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/user";


const userRouter: Router = express.Router();

userRouter.get('signup/',signupHandler)
userRouter.get('signin/',signinHandler)

export default userRouter