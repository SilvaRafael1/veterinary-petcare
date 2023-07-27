import express from 'express';
import PetController from '../controllers/pet.controller';
import authenticateUser from '../middleware/authentication';
import validator from '../middleware/validator';
import { createPetSchema } from '../schemas/Pet/createPet';
const router = express.Router();

router.post('/:tutorId', authenticateUser, validator(createPetSchema), PetController.createPet);
router.put('/:petId/tutor/:tutorId', authenticateUser, PetController.updatePet);
router.delete('/:petId/tutor/:tutorId', authenticateUser, PetController.deletePet);
export default router;
