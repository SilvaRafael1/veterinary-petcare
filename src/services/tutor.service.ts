import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';
import { TutorInterface } from '../models/Tutor';
import AuthRepository from '../repositories/auth.repository';
import PetRepository from '../repositories/pet.repository';
import { formatTutorToShow } from '../utils/showTutor';

class TutorService {
  private async checkDuplicateEmail(email: string): Promise<void> {
    const existingTutor = await AuthRepository.findByEmail(email);
    if (existingTutor) {
      throw new CustomAPIError.BadRequestError('tutor already registered');
    }
  }

  async getAllTutors() {
    const tutors = await TutorRepository.findAll();
    return tutors;
  }

  async createTutor(tutorData: TutorInterface) {
    await this.checkDuplicateEmail(tutorData.email);

    const newTutor = await TutorRepository.create(tutorData);

    const tutorShow = formatTutorToShow(newTutor);

    return tutorShow;
  }

  async updateTutor(tutorData: TutorInterface, tutorId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);
    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    await this.checkDuplicateEmail(tutorData.email);

    const updateTutor = await TutorRepository.update(tutorData, tutorId);
    if (updateTutor) {
      const tutorShow = formatTutorToShow(updateTutor);
      return tutorShow;
    }
    throw new CustomAPIError.BadRequestError('Tutor not updated');
  }

  async deleteTutor(tutorId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }
    const associatedPets = await PetRepository.findByTutorId(tutorId);

    if (associatedPets.length > 0) {
      throw new CustomAPIError.BadRequestError('Tutor has associated pets and cannot be deleted');
    }

    await TutorRepository.deleteOne(tutorId);
  }
}

export default new TutorService();
