import { Request, Response } from "express"

import {CreateRoomSchema } from "@repo/common/valid"


export const roomHandler = (req:Request, res:Response) =>{
   const data = CreateRoomSchema.safeParse(req.body);
   if(!data.success){
     res.json("input validation error")
   }
}