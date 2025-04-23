import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config";

export const signinHandler = (req:Request, res:Response) =>{
   const token = req.headers.authorization?.split(' ')[1];
   if(!token){
    res.json("no token");
    return;
   }
   jwt.verify(token,JWT_SECRET);

}

export const signupHandler = (req:Request, res:Response) =>{
   
}
