import express from 'express';
import cors from 'cors';
import {userRouter} from "./routes/user";
import {todoListRouter} from "./routes/todoList";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
/*
app.use(cors({
  // origin: 'http://localhost:5173', // Uncomment this line if you want to run frontend locally
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));
*/
app.use(cors({
  origin: '*', // Allow all origins for development purposes
  credentials: true,
}));

app.use('/auth', userRouter);
app.use('/api', todoListRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is running on port " + PORT);
})