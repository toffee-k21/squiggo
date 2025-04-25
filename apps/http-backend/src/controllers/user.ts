import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/common-backend/config";
import {CreateUserSchema, SigninSchema} from "@repo/common/valid"
import { prisma } from "@repo/db/prima"


export const signinHandler = async (req:Request, res:Response) =>{
  // const data = SigninSchema.safeParse(req.body);
  //  if(!data.success){
  //    res.json("input validation error")
  //  }
const email = req.body.email
const password = req.body.password
const user = await prisma.user.findUnique({
  where: {email:email, password:password}
})

if(!user){
  res.json("user not found")
  return;
}
const userId = user.id;

const token = jwt.sign(userId,JWT_SECRET)
res.json(token);
}

export const signupHandler = async (req:Request, res:Response) =>{
  //  const data = CreateUserSchema.safeParse(req.body);
  //  if(!data.success){
  //    res.json("input validation error")
  //  }
  let user;
  try{ 
     user = await prisma.user.create({
    data: req.body
   })}
   catch(e){
    res.json("user already exists")
    return;
   }
   
   if(!user){
  res.json("user not found")
  return;
}
const userId = user.id;

const token = jwt.sign(userId,JWT_SECRET)
res.json(token);
}