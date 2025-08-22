import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/common-backend/config';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '@repo/db/prima';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) {
    res.json({ error: 'no token' });
    return;
  }
  try {
    const decoded: string = jwt.verify(token, JWT_SECRET) as string;
    if (!decoded) {
      res.json({ error: 'invalid token' });
      return;
    }
    (req as Request & { userId: string }).userId = String(decoded);
    const user = await prisma.user.findUnique({ where: { id: decoded } });
    if (user) {
      next();
    } else {
      res.status(401).json({ message: 'User no longer exists' });
      return;
    }
  } catch (e) {
    res.status(403).json({
      error: 'token invalid ' + e,
    });
  }
};
