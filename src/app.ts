import express from 'express';
import cors from 'cors';
import TutorRoute from './routes/Tutor.routes';

const app = express();

//security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', TutorRoute);

//Midleware

export default app;
