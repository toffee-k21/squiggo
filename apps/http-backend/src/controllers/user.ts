import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config";
import {CreateUserSchema, SigninSchema} from "@repo/common/valid"


export const signinHandler = (req:Request, res:Response) =>{
    const data = SigninSchema.safeParse(req.body);
   if(!data.success){
     res.json("input validation error")
   }
const username = req.body.username
const password = req.body.password
//db check
const userId= '';// return from db
const token = jwt.sign(userId,JWT_SECRET)
res.json(token);
}

export const signupHandler = (req:Request, res:Response) =>{
   const data = CreateUserSchema.safeParse(req.body);
   if(!data.success){
     res.json("input validation error")
   }
}