import express, { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";


const router: Router = express.Router();

router.get('/',authMiddleware,)


export default router;