import express, { Router } from "express";
import { signinHandler, signupHandler } from "../controllers/base";


 const router: Router = express.Router();

router.get('/',)
router.get('signup/',signupHandler)
router.get('signin/',signinHandler)

export default router;