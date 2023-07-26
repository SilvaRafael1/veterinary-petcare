import express from 'express';
import cors from 'cors';

const app = express();

//security
app.use(cors());

// JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

//Midleware

export default app;
