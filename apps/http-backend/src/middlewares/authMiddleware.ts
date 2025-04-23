import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req:Request,res:Response,next:NextFunction ) =>{
       const token = req.headers.authorization?.split(' ')[1];
       if(!token){
        res.json("no token");
        return;
       }
       const decoded = jwt.verify(token, JWT_SECRET);
       if(!decoded){
        res.json("invalid token");
        return;
       }
       next();
}