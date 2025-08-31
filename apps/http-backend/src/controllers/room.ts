import { Request, Response } from 'express';
import { prisma } from '@repo/db/prisma';
import {pub} from "@repo/redis-client";

interface RequestExtend extends Request {
  userId: string;
}

export const createRoomHandler = async (Req: Request, res: Response) => {
  const req = Req as RequestExtend;

  const u = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  if (!u) {
    res.status(400).json({ error: 'User does not exist' });
  }

  try {
    console.log(req.userId);
    const resp = await prisma.room.create({
      data: {
        slug: req.body.slug,
        adminId: req.userId,
      },
    });

    if (!resp) {
      return;
    }

    res.json({ room: resp.id });
  } catch (e) {
    res.json({ error: 'error : ' + e });
  }
};

export const slugToId = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!room) {
    res.json({ message: 'error' });
    return;
  }

  res.json({ roomId: room.id });
};

export const getOngoingGameChats = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  
  const resp = await pub.LRANGE(`roomId:${roomId}`,0, -1);
  if (!resp) {
    res.json({ message: 'no message' });
  }

  res.json(resp);
};

export const getOngoingGameSketch = async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  
  const resp = await pub.get(`roomId:${roomId}`);
  if(!resp){
    res.json({error:"Error occured in Db connection"});
  }
  res.json(resp);
};
