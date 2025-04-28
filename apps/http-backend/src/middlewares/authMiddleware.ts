import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req:Request,res:Response,next:NextFunction ) =>{
       const token = req.headers.authorization?.split(' ')[1];
       if(!token){
        res.json({error:"no token"});
        return;
       }
       try{
              const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
              if(!decoded){
               res.json({error:"invalid token"});
               return;
              }
              (req as Request & { userId: string }).userId = String(decoded);
       }
       catch(e){
              res.send(403).json({
                     error:"token invalid"
              })
       }
       next();
}