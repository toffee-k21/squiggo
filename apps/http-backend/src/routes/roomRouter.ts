import express, { Router } from "express";
import { createRoomHandler, showRooms, slugToId } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";


const roomRouter: Router = express.Router();

roomRouter.post('/create',authMiddleware,createRoomHandler)
roomRouter.get('/chat/:roomId',authMiddleware,showRooms)
roomRouter.get('/:slug', slugToId)

export default roomRouter;
