import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRoutes from './route/user.routes'
import errorMiddleware from './middlewares/error.middleware';

config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
}));
app.use(morgan('dev'));
app.use(cookieParser());

// Test route
app.use('/ping', (req, res) => {
    res.send('Pong');
});

app.use('/api/v1/user', userRoutes)

// 404 handling
app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);

export default app;
