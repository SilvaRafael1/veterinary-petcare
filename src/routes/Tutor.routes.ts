import express from 'express';
import TutorController from '../controllers/tutor.controller';
import authenticateUser from '../middleware/authentication';
const router = express.Router();

router.get('/tutors', authenticateUser, TutorController.getAllTutors);
router.post('/tutor', TutorController.createTutor);
router.put('/tutor/:tutorId', authenticateUser, TutorController.updateTutor);
router.delete('/tutor/:tutorId', authenticateUser, TutorController.deleteTutor);

export default router;
