import express from 'express';
import cors from 'cors';
import tutorRouter from './routes/Tutor.routes';
import petRouter from './routes/Pet.routes';
import authRouter from './routes/Auth.routes';
import errorHandlerMiddleware from './middleware/error-handler';
import notFound from './middleware/not-found';

const app = express();

//security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', tutorRouter);
app.use('/auth', authRouter);
app.use('/pet', petRouter);

//Midleware
app.use(errorHandlerMiddleware);
app.use(notFound);

export default app;
