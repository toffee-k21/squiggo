import express, { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/base";
import { authMiddleware } from "../middlewares/authMiddleware";


const router: Router = express.Router();

router.get('/',authMiddleware,)
router.get('signup/',signupHandler)
router.get('signin/',signinHandler)

export default router;