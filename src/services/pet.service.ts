import CustomAPIError from '../errors';
import PetRepository from '../repositories/pet.repository';
import TutorRepository from '../repositories/tutor.repository';
import Pet from '../models/Pet';
import { PetInterface } from '../models/Pet';
import { formatPetToShow } from '../utils/showPet';
class PetService {
  private async checkDuplicateName(tutorId: string, name: string) {
    const existingPet = await PetRepository.findByName(tutorId, name);

    if (existingPet) {
      throw new CustomAPIError.BadRequestError('Pet already registered');
    }
  }
  async createPet(tutorId: string, petData: PetInterface) {
    const tutor = await TutorRepository.findById(tutorId);

    if (!tutor) {
      throw new CustomAPIError.BadRequestError('Tutor not found');
    }

    await this.checkDuplicateName(tutorId, petData.name);

    const newPet = new Pet({ ...petData, tutor: tutorId });

    const createdPet = await PetRepository.create(newPet);
    tutor.pets.push(createdPet._id);
    await TutorRepository.save(tutor);
    const petShow = formatPetToShow(createdPet);
    return petShow;
  }

  async deletePet(tutorId: string, petId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    const existingPet = await PetRepository.findById(tutorId, petId);

    if (!existingPet) {
      throw new CustomAPIError.BadRequestError('Pet not found');
    }

    await PetRepository.deleteOne(tutorId, petId);
  }

  async updatePet(petData: PetInterface, petId: string, tutorId: string) {
    const existingTutor = await TutorRepository.findById(tutorId);

    if (!existingTutor) {
      throw new CustomAPIError.NotFoundError('Tutor not found');
    }

    const existingPet = await PetRepository.findById(tutorId, petId);

    if (!existingPet) {
      throw new CustomAPIError.BadRequestError('Pet not found');
    }

    const updatePet = await PetRepository.update(petData, petId);

    if (updatePet) {
      const petShow = formatPetToShow(updatePet);
      return petShow;
    }
  }
}

export default new PetService();
