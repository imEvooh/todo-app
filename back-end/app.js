import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/usersRoutes.js';
import taskRouter from './src/routes/tasksRoutes.js';

dotenv.config();

// Environment variables
const serverPort = process.env.PORT || 3000;
const host = process.env.DB_HOST || 'localhost';

const app = express();
const corsOptions = {
    origin: 'http://localhost:8000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", userRouter);
app.use("/tasks", taskRouter);

app.listen(serverPort, () => {
    console.log(`Server is running on http://${host}:${serverPort}`);
});