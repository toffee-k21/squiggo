import  express  from "express";
import router from "./routes/base";
import userRouter from "./routes/userRouter";
import roomRouter from "./routes/roomRouter";

const app = express();
app.use(express.json());
// app.use('/', router)
app.use('/', userRouter)
app.use('/room', roomRouter)

app.listen(3001,"127.0.0.1", ()=>{
    console.log("server started at port 3001")
});