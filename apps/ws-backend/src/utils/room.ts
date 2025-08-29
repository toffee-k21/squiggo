import { prisma } from "@repo/db/prisma";

export async function isRoomExists(roomId:number): Promise<boolean>{
  try {
    const room = await prisma.room.findUnique({
      where:{id: roomId}
    })
    if(!room){
      return false;
    }else{
      return true;
    }
  } catch (e){
    console.log("prisma couldn't process roomId :",e);
    return false;
  }
}

