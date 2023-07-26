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
  async updateTutor(req: Request, res: Response) {
    // validateTutorDataUpdate(tutorData)

    const { tutorId } = req.params;
    const tutorData = req.body;
    const updateTutor = await TutorService.updateTutor(tutorData, tutorId);
    res.status(StatusCodes.OK).json(updateTutor);
  }
  async deleteTutor(req: Request, res: Response) {
    const tutorId = req.params.tutorId;
    await TutorService.deleteTutor(tutorId);
    res.sendStatus(StatusCodes.NO_CONTENT);
  }
}

export default new TutorController();
