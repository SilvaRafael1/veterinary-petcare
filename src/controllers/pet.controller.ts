import PetService from '../services/pet.service';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

class PetController {
  async createPet(req: Request, res: Response) {
    const { tutorId } = req.params;
    const petData = req.body;
    const pet = await PetService.createPet(tutorId, petData);
    res.status(StatusCodes.CREATED).json(pet);
  }

  async deletePet(req: Request, res: Response) {
    const tutorId = req.params.tutorId;
    const petId = req.params.petId;
    await PetService.deletePet(tutorId, petId);
    res.sendStatus(StatusCodes.OK);
  }
}

export default new PetController();
