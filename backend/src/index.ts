import express from 'express';
import cors from 'cors';
import {userRouter} from "./routes/user";
import {todoListRouter} from "./routes/todoList";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

app.use('/auth', userRouter);
app.use('/api', todoListRouter);

app.listen(PORT, '0.0.0.0', () => {
    console.log("Server is running on port " + PORT);
})