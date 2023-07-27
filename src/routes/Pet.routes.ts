import express from 'express';
import PetController from '../controllers/pet.controller';

const router = express.Router();

router.post('/:tutorId', PetController.createPet);
router.put('/:petId/tutor/:tutorId', PetController.updatePet);
router.delete('/:petId/tutor/:tutorId', PetController.deletePet);
export default router;
