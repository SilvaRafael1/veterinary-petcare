import express from 'express';
import PetController from '../controllers/pet.controller';
import authenticateUser from '../middleware/authentication';
const router = express.Router();

router.post('/:tutorId', authenticateUser, PetController.createPet);
router.put('/:petId/tutor/:tutorId', authenticateUser, PetController.updatePet);
router.delete('/:petId/tutor/:tutorId', authenticateUser, PetController.deletePet);
export default router;
