import express, { Router } from 'express';
import {
  createRoomHandler,
  getAllPlayersList,
  getOngoingGameChats,
  getOngoingGameSketch,
} from '../controllers/room';
import { authMiddleware } from '../middlewares/authMiddleware';

const roomRouter: Router = express.Router();

roomRouter.post('/create', authMiddleware, createRoomHandler);
// roomRouter.get('/chat/:roomId', authMiddleware, getOngoingGameChats);
// roomRouter.get('/sketch/:roomId', authMiddleware, getOngoingGameSketch);
roomRouter.get('/chat/:roomId', getOngoingGameChats); // not wroking...will soon
roomRouter.get('/sketch/:roomId', getOngoingGameSketch); // not working...will soon
roomRouter.get('/players/:roomId', getAllPlayersList);

export default roomRouter;
