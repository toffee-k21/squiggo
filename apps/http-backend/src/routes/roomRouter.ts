import express, { Router } from 'express';
import {
  createRoomHandler,
  getOngoingGameChats,
  getOngoingGameSketch,
} from '../controllers/room';
import { authMiddleware } from '../middlewares/authMiddleware';

const roomRouter: Router = express.Router();

roomRouter.post('/create', authMiddleware, createRoomHandler);
// roomRouter.get('/chat/:roomId', authMiddleware, getOngoingGameChats);
// roomRouter.get('/sketch/:roomId', authMiddleware, getOngoingGameSketch);
roomRouter.get('/chat/:roomId', getOngoingGameChats);
roomRouter.get('/sketch/:roomId', getOngoingGameSketch);
roomRouter.get('/players/:roomId',);

export default roomRouter;
