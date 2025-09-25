import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/common-backend/config';
import { CreateUserSchema, SigninSchema } from '@repo/common/valid';
import { prisma } from '@repo/db/prisma';

export const signinHandler = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await prisma.user.findUnique({
    where: { email: email, password: password },
  });

  if (!user) {
    res.json('user not found');
    return;
  }
  const id = user.id;

  const token = jwt.sign(id, JWT_SECRET);
  res.json(token);
};

export const signupHandler = async (req: Request, res: Response) => {
  let user;
  try {
    user = await prisma.user.create({
      data: req.body,
    });
  } catch (e) {
    res.json({ error: 'user already exists', e });
    return;
  }

  if (!user) {
    res.json({ error: 'user not found' });
    return;
  }
  const id = user.id;

  const token = jwt.sign(id, JWT_SECRET);
  res.json(token);
};
