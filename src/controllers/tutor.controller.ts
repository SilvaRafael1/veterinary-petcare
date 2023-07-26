import TutorService from '../services/tutor.service';
import { Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

class TutorController {
  async getAllTutors(req: Request, res: Response) {
    const tutors = await TutorService.getAllTutors();
    res.status(StatusCodes.OK).json(tutors);
  }
}

export default new TutorController();
