import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';
import { TutorInterface } from '../models/Tutor';

class TutorService {
  async getAllTutors() {
    const tutors = await TutorRepository.findAll();
    return tutors;
  }

  async createTutor(tutorData: TutorInterface) {
    // await this.checkDuplicateEmail(tutorData.email);

    const newTutor = await TutorRepository.create(tutorData);
    const tutorShow = await TutorRepository.findById(newTutor._id);
    return tutorShow;
  }

  async updateTutor(tutorData: TutorInterface, tutorId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);
    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    // await this.checkDuplicateEmail(tutorData.email);

    const updateTutor = await TutorRepository.update(tutorData, tutorId);
    if (updateTutor) {
      const tutorShow = await TutorRepository.findById(tutorId);
      return tutorShow;
    }
    throw new CustomAPIError.BadRequestError('Tutor not updated');
  }
}

export default new TutorService();
