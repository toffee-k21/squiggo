import { Request, Response } from "express"

// import { CreateRoomSchema } from "@repo/common/valid"
import { prisma } from "@repo/db/prima"

interface RequestExtend extends Request {
userId : string
}


export const createRoomHandler = async (Req:Request, res:Response) =>{
  //  const data = CreateRoomSchema.safeParse(req.body);
  //  if(!data.success){
  //    res.json("input validation error")
  //  }
  const req = Req as RequestExtend;

  const u = await prisma.user.findUnique({
    where: { id: req.userId }
  });

  if (!u) {
    res.status(400).json({ error: "User does not exist" });
    return;
  }
   
try{
  
  console.log(req.userId)
  const resp = await prisma.room.create({
    data:{
      slug: req.body.slug,
      adminId: req.userId
    }
  })

  if(!resp){
    return;
  }

  res.json({room: resp.id});
}
  catch(e){
    res.json({error:"error : "+e})
  }
}

export const showRooms = async (req:Request,res:Response) =>{
  const roomId = Number(req.params.roomId);
  const resp = await prisma.chat.findMany({
    where :{
      roomId : roomId
    },
     orderBy: {
      id : "desc"
     }, 
     take : 50
  })
  if(!resp){
    res.json({message:"no message"})
  }

  res.json(resp);
}

export const slugToId = async (req:Request,res:Response) =>{
  const slug = req.params.slug;
const room = await prisma.room.findFirst({
  where:{
    slug:  slug
  }
})

if(!room){
  res.json({message:"error"})
  return;
}

res.json({roomId:room.id});
}