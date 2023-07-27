import CustomAPIError from '../errors';
import TutorRepository from '../repositories/tutor.repository';
import { TutorInterface } from '../models/Tutor';
import AuthRepository from '../repositories/auth.repository';
import PetRepository from '../repositories/pet.repository';

class TutorService {
  private async checkDuplicateEmail(email: string): Promise<boolean> {
    const existingTutor = await AuthRepository.findByEmail(email);
    return existingTutor !== null;
  }

  async getAllTutors() {
    const tutors = await TutorRepository.findAll();
    return tutors;
  }

  async createTutor(tutorData: TutorInterface) {
    await this.checkDuplicateEmail(tutorData.email);

    const newTutor = await TutorRepository.create(tutorData);
    return newTutor;
  }

  async updateTutor(tutorData: TutorInterface, tutorId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);
    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    await this.checkDuplicateEmail(tutorData.email);

    const updateTutor = await TutorRepository.update(tutorData, tutorId);
    if (updateTutor) {
      const tutorShow = await TutorRepository.findById(tutorId);
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
