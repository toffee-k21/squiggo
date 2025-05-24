import express, { Router } from "express";
import { createRoomHandler, showChats, slugToId, showSketches } from "../controllers/room";
import { authMiddleware } from "../middlewares/authMiddleware";


const roomRouter: Router = express.Router();

roomRouter.post('/create',authMiddleware,createRoomHandler)
roomRouter.get('/chat/:roomId',authMiddleware,showChats)
roomRouter.get('/:slug', slugToId)
roomRouter.get('/sketch/:roomId',authMiddleware, showSketches )

export default roomRouter;
