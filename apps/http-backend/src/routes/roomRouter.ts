import express, { Router } from "express";
import { createRoomHandler, showRooms } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";


const roomRouter: Router = express.Router();

roomRouter.post('/create',authMiddleware,createRoomHandler)
roomRouter.get('/:roomId',authMiddleware,showRooms)

export default roomRouter;
