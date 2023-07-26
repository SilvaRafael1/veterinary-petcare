import TutorService from '../services/tutor.service';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

class TutorController {
  async getAllTutors(req: Request, res: Response) {
    const tutors = await TutorService.getAllTutors();
    res.status(StatusCodes.OK).json(tutors);
  }
  async createTutor(req: Request, res: Response) {
    // validateTutorDataCreate(tutorData);

    const tutorData = req.body;
    const newTutor = await TutorService.createTutor(tutorData);
    res.status(StatusCodes.CREATED).json(newTutor);
  }
}

export default new TutorController();
