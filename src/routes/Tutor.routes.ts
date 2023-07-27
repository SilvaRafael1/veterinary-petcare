import express from 'express';
import tutorController from '../controllers/tutor.controller';
import authenticateUser from '../middleware/authentication';
import validator from '../middleware/validator';
import { tutorSchema } from '../schemas/tutorCreate';
const router = express.Router();

router.get('/tutors', authenticateUser, tutorController.getAllTutors);
router.post('/tutor', validator(tutorSchema.required()), tutorController.createTutor);
router.put('/tutor/:tutorId', authenticateUser, tutorController.updateTutor);
router.delete('/tutor/:tutorId', authenticateUser, tutorController.deleteTutor);

export default router;
