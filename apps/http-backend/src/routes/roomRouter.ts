import express, { Router } from "express";
import { roomHandler } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";


const roomRouter: Router = express.Router();

roomRouter.get('/',authMiddleware,roomHandler)

export default roomRouter;
