import express from 'express';
import TutorController from '../controllers/tutor.controller';

const router = express.Router();

router.get('/tutors', TutorController.getAllTutors);

export default router;
