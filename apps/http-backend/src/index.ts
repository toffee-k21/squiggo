import  express  from "express";
import router from "./routes/base";
import userRouter from "./routes/userRouter";
import roomRouter from "./routes/roomRouter";
import { prisma } from "@repo/db/prima"

const app = express();
app.use('/', router)
app.use('user/', userRouter)
app.use('room/', roomRouter)

app.listen(3000);