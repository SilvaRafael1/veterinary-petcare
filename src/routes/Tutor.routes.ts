import express from 'express';
import TutorController from '../controllers/tutor.controller';

const router = express.Router();

router.get('/tutors', TutorController.getAllTutors);
router.post('/tutor', TutorController.createTutor);
router.put('/tutor/:tutorId', TutorController.updateTutor);

export default router;
