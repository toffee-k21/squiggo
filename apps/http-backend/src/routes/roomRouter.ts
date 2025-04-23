import express, { Router } from "express";
import { roomHandler } from "../controllers/room";


const roomRouter: Router = express.Router();

roomRouter.get('/',roomHandler)

export default roomRouter;
