import express from 'express';
import router from './routes/base';
import userRouter from './routes/userRouter';
import roomRouter from './routes/roomRouter';
import cors from 'cors';
import { initRedis } from '@repo/redis-client';

initRedis();

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/', userRouter);
app.use('/room', roomRouter);

app.listen(3001, '127.0.0.1', () => {
  console.log('server started at port 3001');
});
