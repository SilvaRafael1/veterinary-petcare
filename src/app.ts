import express from 'express';
import cors from 'cors';
import TutorRoute from './routes/Tutor.routes';
import PetRouter from './routes/Pet.routes';
import errorHandlerMiddleware from './middleware/error-handler';
import notFound from './middleware/not-found';

const app = express();

//security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', TutorRoute);
app.use('/pet', PetRouter);

//Midleware
app.use(errorHandlerMiddleware);
app.use(notFound);

export default app;
