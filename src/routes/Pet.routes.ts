import express from 'express';
import PetController from '../controllers/pet.controller';

const router = express.Router();

router.post('/:tutorId', PetController.createPet);

export default router;
