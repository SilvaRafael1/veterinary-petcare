import express from 'express';
import tutorController from '../controllers/tutor.controller';
import authenticateUser from '../middleware/authentication';
import validator from '../middleware/validator';
import { createTutorSchema } from '../schemas/Tutor/createTutor';
import { updateTutorSchema } from '../schemas/Tutor/updateTutor';
const router = express.Router();

router.get('/tutors', authenticateUser, tutorController.getAllTutors);
router.post('/tutor', validator(createTutorSchema), tutorController.createTutor);
router.put(
  '/tutor/:tutorId',
  validator(updateTutorSchema),
  authenticateUser,
  tutorController.updateTutor,
);
router.delete('/tutor/:tutorId', authenticateUser, tutorController.deleteTutor);

export default router;
